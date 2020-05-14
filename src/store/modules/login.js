import {
  login
} from '@/api/login.js'

export default {
  namespaced: true,
  state: {
    user: {
      email: '',
      EDAPKey: '',
      KHGPassword: '',
      url: '',
      role: 'user',
      notification: false,
      isSetting: false
    },
    isLogin: false
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isLogin = true
    }
  },
  actions: {
    async Login({ commit }, user) {
      const { data } = await login(user)
      commit('SET_USER', data)
    }
  }
}
