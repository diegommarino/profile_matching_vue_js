import axios from 'axios'
import router from '@/router'

const state = {
  token: null,
  userId: null,
  user: null,
  profileId: null,
  isStaff: null,
  appAlert: null
}

const mutations = {
  // User auth info
  authUser (state, userData) {
    state.token = userData.token
    state.userId = userData.userId
    state.isStaff = userData.isStaff
  },
  // User profile info
  storeUser (state, user) {
    state.profileId = user.id
    state.user = user
  },
  // Clear auth data
  clearData (state) {
    state.token = null
    state.userId = null
    state.isStaff = null
    state.profileId = null
    state.user = null
    state.appAlert = null
    localStorage.clear()
  },
  storeAppAlert (state, alertInfo) {
    state.appAlert = alertInfo
  },
  clearAppAlert (state) {
    state.appAlert = null
  }
}

const actions = {
  /**
   * Consume signup API method creating a new user and store auth info
   *
   * @param  {commit} options.commit - used to access mutations
   * @param  {json} authData - auth data return from the API
   */
  signup ({commit, dispatch}, formData) {
    axios.post('/sign-up/', formData)
      .then(res => {
        if (res.status === 200 && 'auth_token' in res.data) {
          commit('authUser', {
            token: res.data.auth_token,
            userId: res.data.id,
            isStaff: res.data.is_staff
          })
          axios.defaults.headers.common['Authorization'] = 'Token ' + res.data.auth_token
          dispatch('redirectIfNoProfile')
        }
      })
      .catch(function (error) {
        dispatch('setAppAlert', {message: error.response.data})
      })
  },
  /**
   * Consume signin API method and store user credentials
   *
   * @param  {commit} options.commit used - to access mutations
   * @param  {dispatch} options.dispatch - used to access actions
   * @param  {json} formData - login data (email and password)
   */
  signin ({commit, dispatch}, formData) {
    axios.post('/sign-in/', formData)
      .then(async res => {
        if (res.status === 200 && 'auth_token' in res.data) {
          commit('authUser', {
            token: res.data.auth_token,
            userId: res.data.id,
            isStaff: res.data.is_staff
          })

          axios.defaults.headers.common['Authorization'] = 'Token ' + res.data.auth_token

          if (res.data.profile) {
            await dispatch('fetchProfile', res.data.profile)
          }
          dispatch('redirectIfNoProfile')
        }
      })
      .catch(function (error) {
        dispatch('setAppAlert', {message: error.response.data})
      })
  },
  signout ({state, commit, dispatch}) {
    axios.post('/logout/', {'auth_token': state.token})
      .then(res => {
        if (res.status === 200) {
          commit('clearData')
          delete axios.defaults.headers.common['Authorization']
          router.replace('/sign-in')
        }
      })
      .catch(function (error) {
        dispatch('setAppAlert', {message: error.response.data})
      })
  },
  /**
   * Restore the current user profile from the server and add it into
   * state.user
   *
   * @param  {commit} options.commit - used to access mutations
   * @param  {state}  options.state - used to access state
   * @return {nil} - if no token
   */
  fetchProfile ({state, commit, dispatch}, profileId) {
    return new Promise(resolve => {
      if (!state.token) {
        return
      }
      axios.get('/profiles/' + profileId + '/')
        .then(res => {
          commit('storeUser', res.data)
          resolve()
        })
        .catch(error => dispatch('setAppAlert', {message: error.response.data}))
    })
  },

  redirectIfNoProfile ({state}) {
    if (state.profileId) {
      router.replace('/profile')
    } else {
      router.replace('/profile-form')
    }
  },
  setAppAlert ({commit}, params) {
    commit('storeAppAlert', params)
  },
  unsetAppAlert ({commit}) {
    commit('clearAppAlert')
  }
}

const getters = {
  user (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.token !== null
  },
  token (state) {
    return state.token
  },
  appAlert (state) {
    return state.appAlert
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
