<template>
  <section class="login">
    <el-card class="login-card">
      <el-form ref="loginForm" :model="ruleForm" :rules="rules" label-position="top" label-width="150px">
        <el-form-item required label="E-mail" prop="email">
          <el-input v-model="email" type="email" />
        </el-form-item>
        <el-form-item required :label="$t('login.password')" prop="password">
          <el-input v-model="password" show-password type="password" />
        </el-form-item>
        <el-form-item class="login-button" size="large">
          <VueRecaptcha ref="recaptcha" :sitekey="recaptchaKey" size="invisible" @verify="onVerify" />
          <el-button type="primary" @click="login">
            {{ $t('login.login') }}
          </el-button>
        </el-form-item>
      </el-form>
      <div class="buttons">
        <router-link class="button" to="/signup">
          {{ $t('login.signup') }}
        </router-link>
        <router-link class="button" to="/help">
          {{ $t('login.help') }}
        </router-link>
        <router-link class="button" to="/forgetPassword">
          {{ $t('login.forgetPassword') }}
        </router-link>
      </div>
    </el-card>
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import emailRegex from 'email-regex'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'Login',
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
      password: '',
      rules: {
        email: [
          { required: true, message: this.$t('login.validatorMessage.email.required'), trigger: 'blur' },
          { validator: validEmailString, trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('login.validatorMessage.password.required'), trigger: 'blur' }
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
        email: this.email,
        password: this.password
      }
    }
  },
  created() {
  },
  methods: {
    ...mapActions('login', {
      Login: 'Login',
      VerifyRecaptcha: 'VerifyRecaptcha'
    }),
    async login() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) {
          console.error('error submit!!')
          return
        } else {
          if (this.isHuman) {
            await this.loginApi()
          } else {
            this.$refs.recaptcha.execute()
          }
        }
      })
    },
    async onVerify(response) {
      await this.VerifyRecaptcha(response)
      if (this.isHuman) await this.loginApi()
    },
    async loginApi() {
      await this.Login({
        email: this.email,
        password: this.password
      })
      this.$message.success({
        showClose: true,
        message: this.$t('login.success')
      })
      if (!this.user.isSetting) {
        this.$router.push('/setting')
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .login
    display: flex
    justify-content: center
    align-items: center
    position: relative
  .login-card
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
  .login-button
    text-align: center
  .buttons
    display: flex
    justify-content: space-around
  .button
    color: #4560d8
</style>
