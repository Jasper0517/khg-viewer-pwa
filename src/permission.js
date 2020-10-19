import router from './router'
import store from './store'

const whiteList = [
  '/login',
  '/signup',
  '/forgetPassword',
  '/help'
]

router.beforeEach(async(to, from, next) => {
  if (!store.state.login.isLogin) {
    // white list
    if (whiteList.includes(to.path)) {
      next()
      return
    }

    // try to login
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
