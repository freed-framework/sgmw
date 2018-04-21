import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// import store from '../store'
// import { ssoLogin, hasTokenRedirect, replaceTokenByUrl } from '../util/auth'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  next()
  // const hasToken = hasTokenRedirect()

  // if (hasToken) {
  //   store.dispatch('auth/SET_TOKEN', hasToken)

  //   // 重定向页面，去除 token
  //   replaceTokenByUrl()
  // }

  // const auth = store.getters['auth/token']

  // if (auth) {
  //   next()
  // } else {
  //   ssoLogin()
  // }
})

export default router
