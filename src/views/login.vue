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
          <el-button type="primary" @click="login">
            {{ $t('login.login') }}
          </el-button>
        </el-form-item>
      </el-form>
      <router-link class="signup-button" to="/signup">
        註冊
      </router-link>
    </el-card>
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import emailRegex from 'email-regex'

export default {
  name: 'Login',
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
    ...mapGetters(['isLogin']),
    ...mapState({
      user: state => state.login.user
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
      Login: 'Login'
    }),
    async login() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) {
          console.error('error submit!!')
          return
        } else {
          try {
            await this.Login({
              email: this.email,
              password: this.password
            })
            this.$message.success({
              message: '登入成功'
            })
            if (!this.user.isSetting) {
              this.$router.push('/setting')
            } else {
              this.$router.push('/')
            }
          } catch (error) {
            console.error(error)
          }
        }
      })
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
  .signup-button
    color: #4560d8
</style>
