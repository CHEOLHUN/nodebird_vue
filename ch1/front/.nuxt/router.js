import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _57c32cdc = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _1f7ea082 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _12578c7b = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/profile",
    component: _57c32cdc,
    name: "profile"
  }, {
    path: "/signup",
    component: _1f7ea082,
    name: "signup"
  }, {
    path: "/",
    component: _12578c7b,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
