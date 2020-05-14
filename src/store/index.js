import Vue from 'vue'
import Vuex from 'vuex'
import cheerio from 'cheerio'
import cookies from 'js-cookie'

import {
  login,
  EDACApi,
  getKHRecord,
  normalApiControl
} from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    record: {
      KHLog: [],
      originLog: [],
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
    async Login({ state }, data) {
      const payload = {
        data,
        baseUrl: state.setting.url
      }
      await login(payload).catch(err => { throw err })
    },
    async EDAC({ commit, state }, data) {
      if (!state.setting.EDAP) return false
      const payload = {
        data,
        baseUrl: state.setting.url
      }
      const apiData = await EDACApi(payload).catch(err => { throw err })
      const $ = cheerio.load(apiData)
      const tbody = $('body')
      commit('SET_EDAC', tbody.text())
    },
    async GetKHRecord({ commit, state }) {
      const payload = {
        baseUrl: state.setting.url
      }
      const unformatData = []
      const data = await getKHRecord(payload)
      const $ = cheerio.load(data)
      const tbody = $('tbody')
      const table_td = tbody.eq(0).find('td')
      for (let i = 0; i < table_td.length - 1; i++) {
        unformatData.push(table_td.eq(i).text())
      }
      commit('SET_ORIGIN_DATA', unformatData.map(item => { return { item } }).reverse())
    },
    async NormalApiControl({ commit, state }, data) {
      const payload = {
        data,
        baseUrl: state.setting.url
      }
      const apiData = await normalApiControl(payload).catch(err => { throw err })
      commit('SET_TEMP_DATA', apiData)
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
  },
  modules: {
  }
})
