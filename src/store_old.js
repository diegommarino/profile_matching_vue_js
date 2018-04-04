import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    // User auth info
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    // User profile info
    storeUser (state, user) {
      state.user = user
    },
    // Clear auth data
    clearAuthData (state) {
      state.idToken = null
      state.userId = null
    }
  },
  actions: {
    /**
     * Set a token expiration time
     * @param {commit} options.commit used to access clearAuthData
     * @param {Integer} expirationTime number of seconds until token expire
     */
    setLogoutTimer ({commit}, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    /**
     * Consume signup API method creating a new user and store auth info
     * @param  {commit} options.commit      used to access mutations
     * @param  {dispatch} options.dispatch  used to access other actions
     * @param  {json} authData              auth data return from the API
     */
    signup ({commit, dispatch}, authData) {
      axios.post('/signupNewUser?key=AIzaSyCXlVPPWknVGhfc60mt7Jkv0Xzrho7_mwc', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          dispatch('storeUser', authData)
          dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(error => console.log(error))
    },
    /**
     * Consume login method from the API and store auth info.
     * @param  {commit} options.commit   used to access mutations
     * @param  {dispatch} options.dispatch used to access other actions
     * @param  {json} authData         auth data returned from the server
     */
    login ({commit, dispatch}, authData) {
      axios.post('/verifyPassword?key=AIzaSyCXlVPPWknVGhfc60mt7Jkv0Xzrho7_mwc', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(error => console.log(error))
    },
    /**
     * Try to auto login when a session starts, recovering the data from
     * the local storage.
     * @param  {commit} options.commit used to access mutations
     */
    tryAutoLogin ({commit}) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    /**
     * Logout the user and destroy all vuex and localStorage data.
     * @param  {commit} options.commit used to access mutations
     */
    logout ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/signin')
    },
    /**
     * Save a new user in the database
     * @param  {commit} options.commit used to access mutations
     * @param  {state} options.state  used to access the state props
     * @param  {json} userData       data that should be stored in the database
     * @return {nil}                if there is no token stored in states
     */
    storeUser ({commit, state}, userData) {
      if (!state.idToken) {
        return
      }
      axios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    /**
     * Restore all users from the database
     * @param  {[type]} options.commit [description]
     * @param  {[type]} options.state  [description]
     * @return {[type]}                [description]
     */
    fetchUser ({commit, state}) {
      if (!state.idToken) {
        return
      }
      axios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res)
          const data = res.data
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          console.log(users)
          commit('storeUser', users[0])
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
})
