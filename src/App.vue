<template>
  <div
    id="app"
  >
    <Header />
    <router-view />
  </div>
</template>

<script>

import Header from '@/views/header'

export default {
  name: 'KHG',
  components: { Header }
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
