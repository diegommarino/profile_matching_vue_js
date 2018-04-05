import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/welcome/Welcome'
import ProfileForm from '@/components/profile/profileForm'
import Profile from '@/components/profile/profile'
import SignIn from '@/components/auth/signin'
import SignUp from '@/components/auth/signup'
import store from '@/store/store'

// import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Welcome', component: Welcome },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/profile-form', name: 'ProfileForm', component: ProfileForm },
    { path: '/signin', name: 'SignIn', component: SignIn },
    { path: '/signup', name: 'SignUp', component: SignUp }
  ]
})

router.beforeEach((to, from, next) => {
  const publicUrls = ['Welcome', 'SignIn', 'SignUp']
  if (store.getters.isAuthenticated || publicUrls.includes(to.name)) {
    next()
  } else {
    next('/signin')
  }
})

export default router
