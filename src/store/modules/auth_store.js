import axios from 'axios'
import router from '@/router'
const namespaced = true

const state = {
  token: null,
  userId: null,
  user: null,
  profileId: null,
  isStaff: null
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
  clearAuthData (state) {
    state.token = null
    state.userId = null
    state.isStaff = null
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('isStaff')
  },
  clearUserData (state) {
    state.profileId = null
    state.user = null
    localStorage.removeItem('profileId')
  }
}

const actions = {
  /**
   * Consume signup API method creating a new user and store auth info
   *
   * @param  {commit} options.commit - used to access mutations
   * @param  {json} authData - auth data return from the API
   */
  signup ({commit}, formData) {
    axios.post('/sign-up/', formData)
      .then(res => {
        if (res.status === 200 && 'auth_token' in res.data) {
          commit('authUser', {
            token: res.data.auth_token,
            userId: res.data.id,
            isStaff: res.data.is_staff
          })
          axios.defaults.headers.common['Authorization'] = 'Token ' + res.data.auth_token
          localStorage.setItem('token', res.data.auth_token)
          localStorage.setItem('userId', res.data.id)
          localStorage.setItem('isStaff', res.data.is_staff)
        }
      })
      .catch(function (error) {
        console.log(error)
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
      .then(res => {
        if (res.status === 200 && 'auth_token' in res.data) {
          commit('authUser', {
            token: res.data.auth_token,
            userId: res.data.id,
            isStaff: res.data.is_staff
          })

          axios.defaults.headers.common['Authorization'] = 'Token ' + res.data.auth_token
          localStorage.setItem('token', res.data.auth_token)
          localStorage.setItem('userId', res.data.id)
          localStorage.setItem('isStaff', res.data.is_staff)

          if (res.data.profile) {
            dispatch('fetchProfile', res.data.profile)
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  signout ({state, commit}) {
    console.log(state.token)
    axios.post('/logout/', {'auth_token': state.token})
      .then(res => {
        if (res.status === 200) {
          commit('clearAuthData')
          commit('clearUserData')
          delete axios.defaults.headers.common['Authorization']
        }
      })
      .catch(function (error) {
        console.log(error)
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
  fetchProfile ({commit, state}, profileId) {
    return new Promise(resolve => {
      if (!state.token) {
        return
      }
      axios.get('/profiles/' + profileId + '/')
        .then(res => {
          localStorage.setItem('profileId', profileId)
          commit('storeUser', res.data)
          resolve()
        })
        .catch(error => console.log(error))
    })
  },
  /**
   * When the page is reloaded check in local storage for a token to
   * auto login.
   *
   * @param  {commit} options.commit - used to access the mutations
   * @return {nil} - if no token
   */
  async tryAutoLogin ({commit, dispatch}) {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/signin')
    }
    const userId = localStorage.getItem('userId')
    const isStaff = localStorage.getItem('isStaff')
    commit('authUser', {
      token: token,
      userId: userId,
      isStaff: isStaff
    })
    axios.defaults.headers.common['Authorization'] = 'Token ' + token

    const profileId = localStorage.getItem('profileId')
    await dispatch('fetchProfile', profileId)
    router.replace('/profile')
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
    return state.token !== null
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
