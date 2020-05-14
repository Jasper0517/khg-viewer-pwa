import Vue from 'vue'
import Element from 'element-ui'
import '../element-variables.scss'
import i18n from '@/lang'

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
