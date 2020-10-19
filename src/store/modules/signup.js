import {
  signup
} from '@/api/signup.js'

export default {
  namespaced: true,
  state: {

  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isLogin = true
    }
  },
  actions: {
    async Signup({ commit }, user) {
      await signup(user)
    }
  }
}
