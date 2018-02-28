import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/welcome/Welcome'
import ProfileForm from '@/components/profile/profileForm'
import SignIn from '@/components/auth/signin'
import SignUp from '@/components/auth/signup'

// import store from '../store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Welcome', component: Welcome },
    { path: '/profile-form', name: 'ProfileForm', component: ProfileForm },
    { path: '/signin', name: 'SignIn', component: SignIn },
    { path: '/signup', name: 'SignUp', component: SignUp }
  ]
})
