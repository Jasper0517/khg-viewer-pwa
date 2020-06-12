import router from './router'
import store from './store'

router.beforeEach(async(to, from, next) => {
  if (!store.state.login.isLogin) {
    if (to.path === '/login' || to.path === '/signup' || to.path === '/forgetPassword') {
      next()
      return
    }
    try {
      await store.dispatch('login/Login')
      if (!store.state.login.user.isSetting) {
        next({ path: '/setting' })
        return
      }
      next({ path: '/' })
    } catch (error) {
      console.error(error)
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // Do something with router hook
})
