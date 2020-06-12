<template>
  <section class="signup">
    <el-card class="signup-card">
      <el-form ref="signupForm" :model="ruleForm" :rules="rules" label-position="top" label-width="150px">
        <el-form-item required label="E-mail" prop="email">
          <el-input v-model="email" type="email" />
        </el-form-item>
        <el-form-item required :label="$t('signup.password')" prop="password">
          <el-input v-model="password" show-password type="password" />
        </el-form-item>
        <el-form-item required :label="$t('signup.confirmPassword')" prop="confirmPassword">
          <el-input v-model="confirmPassword" show-password type="password" />
        </el-form-item>
        <el-form-item class="signup-button" size="large">
          <VueRecaptcha ref="recaptcha" :sitekey="recaptchaKey" size="invisible" @verify="onVerify" />
          <el-button type="primary" @click="signup">
            {{ $t('signup.signup') }}
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
  name: 'Signup',
  components: { VueRecaptcha },
  data() {
    const validEmailString = (rule, value, callback) => {
      if (emailRegex({ exact: true }).test(value)) {
        callback()
      } else {
        callback(new Error(this.$t('login.validatorMessage.email.format')))
      }
    }
    const validConfirmPassword = (rule, value, callback) => {
      if (value !== this.confirmPassword) {
        callback(new Error(this.$t('signup.validatorMessage.confirmPassword.notEqual')))
      } else {
        callback()
      }
    }
    return {
      email: '',
      password: '',
      confirmPassword: '',
      rules: {
        url: [
          { required: true, message: this.$t('signup.validatorMessage.email.required'), trigger: 'blur' },
          { validator: validEmailString, trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('signup.validatorMessage.password.required'), trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: this.$t('signup.validatorMessage.confirmPassword.required'), trigger: 'blur' },
          { validator: validConfirmPassword, trigger: 'blur' }
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
        password: this.password,
        confirmPassword: this.confirmPassword
      }
    }
  },
  created() {
  },
  methods: {
    ...mapActions('signup', {
      Signup: 'Signup'
    }),
    async signup() {
      this.$refs.signupForm.validate(async valid => {
        if (!valid) {
          console.error('error submit!!')
          return
        } else {
          if (this.isHuman) {
            await this.signupApi()
          } else {
            this.$refs.recaptcha.execute()
          }
        }
      })
    },
    async onVerify(response) {
      await this.VerifyRecaptcha(response)
      if (this.isHuman) await this.signupApi()
    },
    async signupApi() {
      await this.Signup({
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      })
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="sass" scoped>
  .signup
    display: flex
    justify-content: center
    align-items: center
    position: relative
  .signup-card
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
  .signup-button
    text-align: center
</style>
