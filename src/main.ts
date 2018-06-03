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
import Donwload from './components/donwload.vue'
import './assets/common.scss'
import 'element-ui/lib/theme-chalk/index.css'
import PagTable from '@/components/pag-table/index.vue'
/* START 引入 awesome iconfonts */
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
/* END 引入 awesome iconfonts */

const unsync = sync(store, router) // eslint-disable-line

Vue.config.productionTip = false

// awesome icons
fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(ElementUI, { size: 'small' })
Vue.component('boxer', Boxer)
Vue.component('PagTable', PagTable)
Vue.component('download', Donwload)
// 加载骨架
Vue.use(Skeleton)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
