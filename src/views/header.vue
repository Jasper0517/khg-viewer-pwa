<template>
  <header>
    <h1>KHG</h1>
    <SwitchLanguage />
    <template v-if="isHome">
      <el-link
        class="logout"
        type="danger"
        @click="logout"
      >
        {{ $t('home.logout') }}
      </el-link>
      <router-link class="setting" to="/setting">
        設定
      </router-link>
    </template>
    <span class="version">{{ `${$t('header.version')}${version}` }}</span>
  </header>
</template>

<script>

import SwitchLanguage from '@/components/SwitchLanguage'
import { mapActions } from 'vuex'

export default {
  name: 'Header',
  components: { SwitchLanguage },
  computed: {
    isHome() {
      return this.$route.path === '/'
    },
    version() {
      return require('../../package.json').version
    }
  },
  methods: {
    ...mapActions('logout', {
      Logout: 'Logout'
    }),
    async logout() {
      try {
        await this.Logout()
        this.$router.push('/login')
      } catch (error) {
        console.error(error)
        this.$router.push('/login')
      }
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
</style>
