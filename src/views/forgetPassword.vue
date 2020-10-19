<template>
  <section class="forget-password">
    <el-card class="forget-password-card">
      <el-form ref="forgetPasswordForm" :model="ruleForm" :rules="rules" label-position="top" label-width="150px">
        <el-form-item required label="E-mail" prop="email">
          <el-input v-model="email" type="email" />
        </el-form-item>
        <el-form-item class="forget-password-button" size="large">
          <VueRecaptcha ref="recaptcha" :sitekey="recaptchaKey" size="invisible" @verify="onVerify" />
          <el-button type="primary" @click="forgetPassword">
            {{ $t('forgetPassword.send') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import emailRegex from 'email-regex'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'ForgetPassword',
  components: { VueRecaptcha },
  data() {
    const validEmailString = (rule, value, callback) => {
      if (emailRegex({ exact: true }).test(value)) {
        callback()
      } else {
        callback(new Error(this.$t('login.validatorMessage.email.format')))
      }
    }
    return {
      email: '',
      rules: {
        email: [
          { required: true, message: this.$t('login.validatorMessage.email.required'), trigger: 'blur' },
          { validator: validEmailString, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'recaptchaKey']),
    ...mapState({
      user: state => state.login.user,
      isHuman: state => state.login.isHuman
    }),
    ruleForm() {
      return {
        email: this.email
      }
    }
  },
  methods: {
    ...mapActions('login', {
      ForgetPassword: 'ForgetPassword',
      VerifyRecaptcha: 'VerifyRecaptcha'
    }),
    ...mapActions('app', {
      SetLoading: 'SetLoading'
    }),
    async forgetPassword() {
      this.$refs.forgetPasswordForm.validate(async valid => {
        if (!valid) {
          console.error('error submit!!')
          return
        } else {
          if (this.isHuman) {
            await this.forgetPasswordApi()
          } else {
            this.$refs.recaptcha.execute()
          }
        }
      })
    },
    async onVerify(response) {
      await this.VerifyRecaptcha(response)
      if (this.isHuman) await this.forgetPasswordApi()
    },
    async forgetPasswordApi() {
      try {
        this.SetLoading(true)
        await this.ForgetPassword({
          email: this.email
        })
        this.$message.success({
          showClose: true,
          message: this.$t('forgetPassword.success')
        })
        this.$router.push('/login')
      } catch (error) {
        console.log(error)
      } finally {
        this.SetLoading(false)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .forget-password
    display: flex
    justify-content: center
    align-items: center
    position: relative
  .forget-password-card
    padding: 15px
    width: 100%
    max-width: 400px
    text-align: left
  .el-input
    width: 100%
    max-width: 400px
  .warning
    text-align: left
    color: red
  .example
    text-align: left
    color: orange
  .forget-password-button
    text-align: center
</style>
