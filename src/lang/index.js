import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from './en'
import zhTWLocale from './zh-tw'
import cookies from 'js-cookie'

Vue.use(VueI18n)

const messages = {
  'en': {
    ...enLocale
  },
  'zh-tw': {
    ...zhTWLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: cookies.get('language') || 'zh-tw',
  // set locale messages
  messages
})

export default i18n
