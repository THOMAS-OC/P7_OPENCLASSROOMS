import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    redirect: '/connect'
  },

  {
    path: '/home',
    name: 'home',
    component: HomeView
  },

  {
    path: '/connect',
    name: 'connect',
    component: () => import('../views/connectView.vue')
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('../views/registrationView.vue')
  },

  {
    path: '/profil',
    name: 'profil',
    component: () => import('../views/profilView.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
