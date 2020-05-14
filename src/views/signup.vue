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

export default {
  name: 'Signup',
  data() {
    const validHttpString = (rule, value, callback) => {
      if (emailRegex({ exact: true }).test(value)) {
        callback()
      } else {
        callback(new Error(this.$t('login.validatorMessage.email.format')))
      }
    }
    return {
      email: '',
      password: '',
      confirmPassword: '',
      rules: {
        url: [
          { required: true, message: this.$t('signup.validatorMessage.email.required'), trigger: 'blur' },
          { validator: validHttpString, trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('signup.validatorMessage.password.required'), trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: this.$t('signup.validatorMessage.confirmPassword.required'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin']),
    ...mapState({
      user: state => state.login.user
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
          await this.Signup({
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword
          })
          console.log('signup')
        }
      })
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
