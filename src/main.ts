// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button,
  Container,
  Header,
  Aside,
  Main,
  Row,
  Col,
  Table,
  Radio,
  TableColumn,
  Loading,
  Pagination,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  OptionGroup,
  Message,
  MessageBox
} from 'element-ui'
import Skeleton from './components/skeleton'
import Boxer from './components/boxer/index.vue'
import './assets/common.scss'
import './assets/element-chalk.scss'

const unsync = sync(store, router) // eslint-disable-line

Vue.config.productionTip = false

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Radio)
Vue.component('boxer', Boxer)

// 加载骨架
Vue.use(Skeleton)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
