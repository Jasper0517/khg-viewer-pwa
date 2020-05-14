<template>
  <section class="language">
    <el-radio-group v-model="language" size="mini">
      <el-radio-button label="中文" />
      <el-radio-button label="En" />
    </el-radio-group>
  </section>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import cookies from 'js-cookie'

export default {
  name: 'SwitchLanguage',
  computed: {
    ...mapState({
      currentLang: state => state.app.language
    }),
    language: {
      get() {
        if (!this.currentLang) return '中文'
        return this.currentLang === 'zh-tw' ? '中文' : 'En'
      },
      set(val) {
        const lang = val === '中文' ? 'zh-tw' : 'en'
        this.SetLanguage(lang || 'zh-tw')
        this.$i18n.locale = lang
      }
    }
  },
  created() {
    this.SetLanguage(cookies.get('language') || 'zh-tw')
  },
  methods: {
    ...mapActions('app', {
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
