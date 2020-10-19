import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import login from './modules/login'
import KHG from './modules/KHG'
import signup from './modules/signup'
import logout from './modules/logout'
import setting from './modules/setting'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    login,
    KHG,
    signup,
    app,
    logout,
    setting
  },
  getters
})
