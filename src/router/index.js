import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/users',
    name: 'User',
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
  },
  {
    path: '/sendmail',
    name: 'Sendmail',
    component: () => import(/* webpackChunkName: "about" */ '../views/Sendmail.vue')
  },
  {
    path: '/changepw',
    name: 'Changepw',
    component: () => import(/* webpackChunkName: "about" */ '../views/Changepw.vue')
  },
  {
    path: '/sendevent',
    name: 'Sendevent',
    component: () => import(/* webpackChunkName: "about" */ '../components/Sendevent.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
