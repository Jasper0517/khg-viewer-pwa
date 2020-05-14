import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import login from './modules/login'
import old from './modules/old'
import signup from './modules/signup'
import logout from './modules/logout'

import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    login,
    old,
    signup,
    app,
    logout
  },
  getters
})
