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
        <el-form-item required :label="$t('setting.password')" prop="KHGPassword">
          <el-input v-model="KHGPassword" type="password" />
        </el-form-item>
        <div class="warning">{{ $t('setting.warning.EDAP') }}</div>
        <el-form-item label="E.D.A.P Key：">
          <el-input v-model="EDAPKey" required prop="EDAPKey" />
        </el-form-item>
        <el-form-item label="Telegram通知">
          <el-switch
            v-model="isNotification"
            active-color="#13ce66"
            inactive-color="#DCDFE6"
          />
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
      isNotification: false,
      rules: {
        url: [
          { required: true, message: this.$t('setting.validatorMessage.url.required'), trigger: 'blur' },
          { validator: validHttpString, trigger: 'blur' }
        ],
        KHGPassword: [
          { required: true, message: this.$t('setting.validatorMessage.password.required'), trigger: 'blur' }
        ],
        EDAPKey: [
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
        url: this.url,
        KHGPassword: this.KHGPassword,
        EDAPKey: this.EDAPKey
      }
    }
  },
  created() {
    this.KHGPassword = this.user.KHGPassword
    this.url = this.user.url
    this.EDAPKey = this.user.EDAPKey
    this.isNotification = this.user.notification
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
              EDAPKey: this.EDAPKey,
              email: this.user.email,
              notification: this.isNotification
            })
            this.$message.success({
              message: '設定成功'
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
