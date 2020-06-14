<template>
  <header>
    <h1>KHG</h1>
    <SwitchLanguage v-if="!isSetting" />
    <template v-if="isLoginPage">
      <el-link
        class="logout"
        type="danger"
        @click="logout"
      >
        {{ $t('header.logout') }}
      </el-link>
      <router-link class="setting" to="/setting">
        {{ $t('header.setting') }}
      </router-link>
      <el-link type="success" @click="refresh">
        {{ $t('header.Refresh') }}
        <i class="el-icon-refresh" />
      </el-link>
    </template>
    <i v-if="isBackIcon" class="el-icon-arrow-left logout" @click="back" />
  </header>
</template>

<script>

import SwitchLanguage from '@/components/SwitchLanguage'
import { mapActions } from 'vuex'

export default {
  name: 'Header',
  components: { SwitchLanguage },
  computed: {
    isLoginPage() {
      return this.$route.path === '/'
    },
    isBackIcon() {
      const list = [
        '/setting',
        '/signup',
        '/forgetPassword',
        '/help'
      ]
      return list.includes(this.$route.path)
    },
    isSetting() {
      return this.$route.path === '/setting'
    }
  },
  methods: {
    ...mapActions('logout', {
      Logout: 'Logout'
    }),
    async logout() {
      try {
        await this.Logout()
      } catch (error) {
        console.error(error)
      } finally {
        this.$router.push('/login')
      }
    },
    refresh() {
      this.$router.go(0)
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="sass" scoped>
  header
    position: relative
    margin-bottom: 15px
  h1
    color: #4560d8
    margin: 0
  .logout
    position: absolute
    top: 50%
    left: 0
    transform: translateY(-50%)
  .setting
    position: absolute
    top: 50%
    left: 70px
    transform: translateY(-50%)
    font-size: 14px
    color: #4560d8
  .el-icon-arrow-left
    font-size: 20px
</style>
