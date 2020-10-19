import {
  login,
  verifyRecaptcha,
  forgetPassword
} from '@/api/login.js'

import crypto from 'crypto-js'

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
    isLogin: false,
    isHuman: false
  },
  mutations: {
    SET_USER(state, user) {
      const ecryptPassword = (password) => {
        const secret = process.env.VUE_APP_PASSWORD_KEY
        const decData = crypto.enc.Base64.parse(password).toString(crypto.enc.Utf8)
        const bytes = crypto.AES.decrypt(decData, secret)
        return bytes.toString(crypto.enc.Utf8)
      }
      state.user = {
        ...user,
        KHGPassword: ecryptPassword(user.KHGPassword)
      }
      state.isLogin = true
    },
    SET_ISHUMAN(state, isHuman) {
      state.isHuman = isHuman
    }
  },
  actions: {
    async Login({ commit }, user) {
      const { data } = await login(user)
      commit('SET_USER', data)
    },
    async VerifyRecaptcha({ commit }, response) {
      const { data } = await verifyRecaptcha(response)
      commit('SET_ISHUMAN', data)
    },
    async ForgetPassword({ commit }, email) {
      await forgetPassword(email)
    }
  }
}
