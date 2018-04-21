import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import modules from './modules'

// index.html 引入，此处的 use 需要去掉
Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules,
})

export interface State {}
