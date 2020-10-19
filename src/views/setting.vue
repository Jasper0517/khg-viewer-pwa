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
        <el-form-item required :label="$t('setting.KHGPassword')" prop="KHGPassword">
          <el-input v-model="KHGPassword" type="password" />
        </el-form-item>
        <div class="warning">{{ $t('setting.warning.EDAP') }}</div>
        <el-form-item label="E.D.A.P Key：" required prop="EDAPKey">
          <el-input v-model="EDAPKey" />
        </el-form-item>
        <el-form-item :label="$t('setting.telegramNotification')">
          <el-switch
            v-model="isNotification"
            active-color="#13ce66"
            inactive-color="#DCDFE6"
          />
        </el-form-item>
        <el-form-item :label="$t('setting.language')">
          <SwitchLanguage />
        </el-form-item>
        <el-form-item :label="$t('setting.changePassword')">
          <el-button type="danger" @click="isDialogShow = true">
            {{ $t('setting.changePassword') }}
          </el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="setting">
        {{ $t('setting.send') }}
      </el-button>
    </el-card>
    <el-dialog :title="$t('setting.dialog.title')" :visible="isDialogShow" custom-class="change-password-dialog">
      <el-form ref="cahngePasswordForm" :model="changePasswordRuleForm" :rules="changePasswordRules">
        <el-form-item required :label="$t('setting.oldPassword')" prop="oldPassword">
          <el-input v-model="oldPassword" type="password" />
        </el-form-item>
        <el-form-item required :label="$t('setting.newPassword')" prop="newPassword">
          <el-input v-model="newPassword" type="password" />
        </el-form-item>
        <el-form-item required :label="$t('setting.confirmNewPassword')" prop="confirmNewPassword">
          <el-input v-model="confirmNewPassword" type="password" />
        </el-form-item>
      </el-form>
      <footer>
        <el-button type="primary" @click="changePassword">
          {{ $t('setting.confirm') }}
        </el-button>
        <el-button type="danger" @click="isDialogShow = false">
          {{ $t('setting.cancel') }}
        </el-button>
      </footer>
    </el-dialog>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import cookie from 'js-cookie'

import SwitchLanguage from '@/components/SwitchLanguage'

export default {
  name: 'Setting',
  components: { SwitchLanguage },
  data() {
    const validHttpString = (rule, value, callback) => {
      if (value.indexOf('http://') >= 0 || value.indexOf('HTTP://') >= 0) {
        callback()
      } else {
        callback(new Error(this.$t('setting.validatorMessage.url.format')))
      }
    }

    const validConfirmPassword = (rule, value, callback) => {
      if (value !== this.newPassword) {
        callback(new Error(this.$t('setting.validatorMessage.confirmNewPassword.confirm')))
      } else {
        callback()
      }
    }
    return {
      KHGPassword: '',
      url: '',
      EDAPKey: '',
      isNotification: false,
      isDialogShow: false,
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      rules: {
        url: [
          { required: true, message: this.$t('setting.validatorMessage.url.required'), trigger: 'blur' },
          { validator: validHttpString, trigger: 'blur' }
        ],
        KHGPassword: [
          { required: true, message: this.$t('setting.validatorMessage.KHGPassword.required'), trigger: 'blur' }
        ],
        EDAPKey: [
          { required: true, message: this.$t('setting.validatorMessage.EDAPKey.required'), trigger: 'blur' }
        ]
      },
      changePasswordRules: {
        oldPassword: [
          { required: true, message: this.$t('setting.validatorMessage.oldPassword.required'), trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: this.$t('setting.validatorMessage.newPassword.required'), trigger: 'blur' }
        ],
        confirmNewPassword: [
          { required: true, message: this.$t('setting.validatorMessage.confirmNewPassword.required'), trigger: 'blur' },
          { validator: validConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['recaptchaKey']),
    ...mapState({
      user: state => state.login.user
    }),
    ruleForm() {
      return {
        url: this.url,
        KHGPassword: this.KHGPassword,
        EDAPKey: this.EDAPKey
      }
    },
    changePasswordRuleForm() {
      return {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        confirmNewPassword: this.confirmNewPassword
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
      Setting: 'Setting',
      ChangePassword: 'ChangePassword'
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
              notification: this.isNotification,
              language: cookie.get('language') || 'zh-tw'
            })
            this.$message.success({
              showClose: true,
              message: this.$t('setting.success.set')
            })
            this.$router.push('/')
          } catch (error) {
            this.$router.push('/login')
          }
        }
      })
    },
    async changePassword() {
      this.$refs.cahngePasswordForm.validate(async valid => {
        if (!valid) {
          console.error('error submit!!')
          return
        } else {
          try {
            await this.ChangePassword({
              email: this.user.email,
              password: this.oldPassword,
              newPassword: this.newPassword,
              confirmNewPassword: this.confirmNewPassword
            })
            this.$message({
              showClose: true,
              type: 'success',
              message: this.$t('setting.success.change')
            })
            this.oldPassword = ''
            this.newPassword = ''
            this.confirmNewPassword = ''
            this.isDialogShow = false
          } catch (error) {
            console.log('error: ', error)
          }
        }
      })
    }
  }
}
</script>

<style lang="sass">
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
    .change-password-dialog
      max-width: 500px
      width: 90%
</style>
