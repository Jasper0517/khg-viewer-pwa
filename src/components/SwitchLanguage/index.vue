<template>
  <section class="language">
    <el-radio-group v-model="language" size="mini">
      <el-radio-button label="中文" />
      <el-radio-button label="En" />
    </el-radio-group>
  </section>
</template>

<script>

import { mapActions } from 'vuex'
import cookies from 'js-cookie'

export default {
  name: 'SwitchLanguage',
  data() {
    return {

    }
  },
  computed: {
    language: {
      get() {
        if (!this.$store.state.language) return '中文'
        return this.$store.state.language === 'zh-tw' ? '中文' : 'En'
      },
      set(val) {
        const lang = val === '中文' ? 'zh-tw' : 'en'
        this.SetLanguage(lang || 'zh-tw')
        this.$i18n.locale = lang
      }
    }
  },
  created() {
    this.SetLanguage(cookies.get('language'))
  },
  methods: {
    ...mapActions({
      SetLanguage: 'SetLanguage'
    })
  }
}
</script>

<style lang="sass" scoped>
  .language
    position: absolute
    top: 50%
    right: 0
    transform: translateY(-50%)
</style>
