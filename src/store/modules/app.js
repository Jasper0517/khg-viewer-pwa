import cookies from 'js-cookie'

export default {
  namespaced: true,
  state: {
    language: 'zh-tw'
  },
  mutations: {
    SET_LANGUAGE(state, language) {
      state.language = language
    }
  },
  actions: {
    SetLanguage({ commit }, language) {
      cookies.set('language', language, { expires: 365 })
      commit('SET_LANGUAGE', language)
    }
  }
}
