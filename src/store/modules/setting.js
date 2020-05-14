import {
  setting
} from '@/api/setting.js'

export default {
  namespaced: true,
  state: {

  },
  mutations: {
  },
  actions: {
    async Setting({ commit }, user) {
      await setting(user)
    }
  }
}
