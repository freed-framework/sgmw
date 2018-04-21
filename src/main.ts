// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Skeleton from './components/skeleton'
import Boxer from './components/boxer/index.vue'
import './assets/common.scss'
// import './assets/element-chalk.scss'
import 'element-ui/lib/theme-chalk/index.css'

const unsync = sync(store, router) // eslint-disable-line

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.component('boxer', Boxer)
// 加载骨架
Vue.use(Skeleton)

// Vue.prototype.$message = Message
// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
