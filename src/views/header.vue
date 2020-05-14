<template>
  <header>
    <h1>KHG</h1>
    <SwitchLanguage />
    <el-link
      v-if="isHome"
      class="logout"
      type="danger"
      @click="logout"
    >
      {{ $t('home.logout') }}
    </el-link>
    <span class="version">{{ `${$t('header.version')}${version}` }}</span>
  </header>
</template>

<script>

import SwitchLanguage from '@/components/SwitchLanguage'
import { mapActions } from 'vuex'

import Cookies from 'js-cookie'

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
    ...mapActions({
      SetSetting: 'SetSetting'
    }),
    logout() {
      Cookies.set('password', '')
      Cookies.set('url', '')
      Cookies.set('EDAP', '')
      this.SetSetting({
        url: '',
        password: '',
        EDAP: ''
      })
      this.$router.push('/setting')
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
</style>
