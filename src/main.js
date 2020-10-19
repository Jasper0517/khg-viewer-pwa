import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'
import './plugins/element.js'
import './permission'
import './registerServiceWorker'

Vue.config.productionTip = false

// GA
// if (process.env.VUE_APP_GA_ID) {
//   const isProd = process.env.NODE_ENV === 'production'
//   Vue.use(VueAnalytics, {
//     id: `'${process.env.VUE_APP_GA_ID}'`,
//     router,
//     debug: {
//       enabled: !isProd,
//       sendHitTask: isProd
//     },
//     autoTracking: {
//       pageviewOnLoad: false
//     }
//   })
// }

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
