import {
  logout
} from '@/api/logout.js'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    async Logout({ commit }, user) {
      await logout(user)
    }
  }
}
