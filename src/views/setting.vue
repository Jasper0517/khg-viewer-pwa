<template>
  <section class="setting">
    <el-card class="setting-card">
      <el-form ref="settingForm" :model="ruleForm" :rules="rules" label-position="left" label-width="115px">
        <div class="warning">{{ $t('setting.warning.url') }}</div>
        <div class="example">{{ $t('setting.example') }} http://123.123.123.123:8090/</div>
        <el-form-item required :label="$t('setting.url')" prop="url">
          <el-input v-model="url" />
        </el-form-item>
        <div class="warning">{{ $t('setting.warning.password') }}</div>
        <el-form-item required :label="$t('setting.password')" prop="password">
          <el-input v-model="KHGPassword" show-password type="password" />
        </el-form-item>
        <div class="warning">{{ $t('setting.warning.EDAP') }}</div>
        <el-form-item label="E.D.A.P Key：">
          <el-input v-model="EDAPKey" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="setting">
        {{ $t('setting.send') }}
      </el-button>
    </el-card>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
      KHGPassword: '',
      url: '',
      EDAPKey: '',
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
      user: state => state.login.user
    }),
    ruleForm() {
      return {
        url: this.showUrl,
        password: this.password
      }
    }
  },
  created() {
    this.KHGPassword = this.user.KHGPassword
    this.url = this.user.url
    this.EDAPKey = this.user.EDAPKey
  },
  methods: {
    ...mapActions('setting', {
      Setting: 'Setting'
    }),
    setting() {
      this.$refs.settingForm.validate(async valid => {
        if (!valid) {
          console.error('error submit!!')
          return
        } else {
          try {
            await this.Setting({
              KHGPassword: this.KHGPassword,
              url: this.url,
              EDAPKey: this.EDAPKey
            })
            this.$router.push('/')
          } catch (error) {
            this.$router.push('/login')
          }
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .setting
    display: flex
    justify-content: center
    align-items: center
    position: relative
  .setting-card
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
