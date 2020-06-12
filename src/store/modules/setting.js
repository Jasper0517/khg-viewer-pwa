import {
  setting,
  changePassword
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
    },
    async ChangePassword({ commit }, data) {
      await changePassword(data)
    }
  }
}
