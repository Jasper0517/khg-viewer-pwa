<template>
  <section class="login">
    <el-card class="login-card">
      <el-form ref="loginForm" :model="ruleForm" :rules="rules" label-position="left" label-width="115px">
        <div class="warning">{{ $t('setting.warning.url') }}</div>
        <div class="example">{{ $t('setting.example') }} http://123.123.123.123:8090/</div>
        <el-form-item required :label="$t('setting.url')" prop="url">
          <el-input v-model="url" />
        </el-form-item>
        <div class="warning">{{ $t('setting.warning.password') }}</div>
        <el-form-item required :label="$t('setting.password')" prop="password">
          <el-input v-model="password" show-password type="password" />
        </el-form-item>
        <div class="warning">{{ $t('setting.warning.EDAP') }}</div>
        <el-form-item label="E.D.A.P Key：">
          <el-input v-model="EDAP" />
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="login">
            {{ $t('setting.login') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script>
import Cookies from 'js-cookie'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Setting',
  data() {
    const validHttpString = (rule, value, callback) => {
      if (value.indexOf('http://') >= 0 || value.indexOf('HTTP://') >= 0) {
        callback()
      } else {
        callback(new Error(this.$t('setting.validatorMessage.url.format')))
      }
    }
    return {
      showUrl: '',
      rules: {
        url: [
          { required: true, message: this.$t('setting.validatorMessage.url.required'), trigger: 'blur' },
          { validator: validHttpString, trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('setting.validatorMessage.password.required'), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      setting: state => state.setting
    }),
    password: {
      get() {
        return this.setting.password
      },
      set(val) {
        this.SetPassword(val)
      }
    },
    url: {
      get() {
        return this.showUrl
      },
      set(val) {
        this.showUrl = val
        this.SetUrl(val)
      }
    },
    EDAP: {
      get() {
        return this.setting.EDAP
      },
      set(val) {
        this.SetEDAP(val)
      }
    },
    ruleForm() {
      return {
        url: this.showUrl,
        password: this.password
      }
    }
  },
  created() {
    const password = Cookies.get('password')
    const EDAP = Cookies.get('EDAP')
    const url = Cookies.get('url')

    this.SetPassword(password)
    this.SetUrl(url)
    this.SetEDAP(EDAP)
  },
  methods: {
    ...mapActions({
      SetPassword: 'SetPassword',
      SetUrl: 'SetUrl',
      SetEDAP: 'SetEDAP',
      SetLanguage: 'SetLanguage'
    }),
    login() {
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          console.error('error submit!!')
          return
        } else {
          Cookies.set('password', this.setting.password, { expires: 365 })
          Cookies.set('url', this.setting.url, { expires: 365 })
          Cookies.set('EDAP', this.setting.EDAP, { expires: 365 })
          this.$router.push('/')
          // this.showUrl = ''
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
    max-width: 500px
  .el-input
    width: 100%
    max-width: 300px
  .warning
    text-align: left
    color: red
  .example
    text-align: left
    color: orange
</style>
