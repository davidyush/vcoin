import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Coin from './views/Coin.vue'
import SignIn from './views/SignIn.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/coins/:coin',
      name: 'Coin',
      component: Coin
    },
    {
      path: '/signin',
      name: 'Signin',
      component: SignIn
    }
  ]
})
