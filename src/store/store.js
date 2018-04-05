import Vue from 'vue'
import Vuex from 'vuex'
import authStore from './modules/auth_store'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    authStore
  },
  plugins: [createPersistedState()]
})
