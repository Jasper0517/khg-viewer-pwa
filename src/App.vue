<template>
  <div
    id="app"
    v-loading.fullscreen.lock="isLoading"
    :element-loading-text="$t('loading')"
  >
    <Header />
    <keep-alive :include="['Home']">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>

import Header from '@/views/header'

export default {
  name: 'KHG',
  components: { Header },
  computed: {
    isLoading() {
      return this.$store.state.app.isLoading
    }
  }
}
</script>

<style lang="sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 10px
  .el-card__header, .el-card__body
    padding: 5px
  a
    text-decoration: none
</style>
