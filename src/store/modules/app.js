import cookies from 'js-cookie'

export default {
  namespaced: true,
  state: {
    language: 'zh-tw',
    isLoading: false
  },
  mutations: {
    SET_LANGUAGE(state, language) {
      state.language = language
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    }
  },
  actions: {
    SetLanguage({ commit }, language) {
      cookies.set('language', language, { expires: 365 })
      commit('SET_LANGUAGE', language)
    },
    SetLoading({ commit }, state) {
      commit('SET_LOADING', state)
    }
  }
}
