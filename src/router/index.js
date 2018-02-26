import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/welcome/Welcome'

// import store from '../store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    }
  ]
})
