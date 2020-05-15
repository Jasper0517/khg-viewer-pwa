import cookies from 'js-cookie'

import {
  KHGLogin,
  EDAC,
  getKHRecord,
  normalApiControl
} from '@/api/KHG'

export default {
  namespaced: true,
  state: {
    record: {
      KHLog: [],
      EDAC: ''
    },
    setting: {
      url: '',
      password: '',
      EDAP: ''
    },
    isLoading: false,
    language: 'zh-tw',
    tempData: ''
  },
  mutations: {
    SET_ORIGIN_DATA(state, data) {
      state.record.originLog = data
    },
    SET_KH_LOG(state, log) {
      state.record.KHLog = log
    },
    SET_LOADING(state, status) {
      state.isLoading = status
    },
    SET_SETTING(state, setting) {
      state.setting = setting
    },
    SET_EDAC(state, EDAC) {
      state.record.EDAC = EDAC
    },
    SET_PASSWORD(state, password) {
      state.setting.password = password
    },
    SET_URL(state, url) {
      state.setting.url = url
    },
    SET_EDAP(state, EDAP) {
      state.setting.EDAP = EDAP
    },
    SET_LANGUAGE(state, language) {
      state.language = language
    },
    SET_TEMP_DATA(state, tempData) {
      state.tempData = tempData
    }
  },
  actions: {
    async KHGLogin({ commit }, data) {
      await KHGLogin(data).catch(err => { throw err })
    },
    async EDAC({ commit, state }, data) {
      if (!data.EAPK) return false
      const apiData = await EDAC(data).catch(err => { throw err })
      commit('SET_EDAC', apiData.data)
    },
    async GetKHRecord({ commit, state }, data) {
      const apiData = await getKHRecord(data)
      commit('SET_KH_LOG', apiData.data)
    },
    async NormalApiControl({ commit, state }, data) {
      await normalApiControl(data).catch(err => { throw err })
    },
    SetKHLog({ commit }, log) {
      commit('SET_KH_LOG', log)
    },
    SetLoading({ commit }, status) {
      commit('SET_LOADING', status)
    },
    SetSetting({ commit }, setting) {
      commit('SET_SETTING', setting)
    },
    SetPassword({ commit }, password) {
      commit('SET_PASSWORD', password)
    },
    SetUrl({ commit }, url) {
      if (!url) return
      if (url.lastIndexOf('/') === url.length - 1) {
        url = url.substring(0, url.length - 1)
      }
      commit('SET_URL', url)
    },
    SetEDAP({ commit }, EDAP) {
      commit('SET_EDAP', EDAP)
    },
    SetLanguage({ commit }, language) {
      cookies.set('language', language, { expires: 365 })
      commit('SET_LANGUAGE', language)
    },
    SetTempData({ commit }, tempData) {
      commit('SET_TEMP_DATA', tempData)
    }
  }
}
