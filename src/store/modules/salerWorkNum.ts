import { salerWorkNumList } from '../../api'
import { formatData, initList, cutInvalidData } from '../helpers'

const ActionType = {
  FETCH_SALER_WORK_LIST: 'FETCH_SALER_WORK_LIST',
  FETCH_SALER_WORK_PAGE_LIST: 'FETCH_SALER_WORK_PAGE_LIST'
}

// initial state
const state = {
  list: initList(),
}
let cache: any = {}

const actions = {
  async getSalerWorkNumList({ commit }, param) {
    const result = await salerWorkNumList(cutInvalidData(param))
    const payload: any = { ...result }

    commit(ActionType.FETCH_SALER_WORK_LIST, payload)
  },
  async getPageList({ commit }, num) {
    const list = cache.list.slice((num - 1) * 20, num * 20)
    commit(ActionType.FETCH_SALER_WORK_PAGE_LIST, {
      list,
      pagination: {
        pageNum: num || 0,
        pageSize: 20,
        total: cache.total || 0
      }
    })
  },
  async resetSalerWorkNumList({ commit }) {
    commit(ActionType.FETCH_SALER_WORK_LIST, initList())
  }
}

// const fields = ['经销商号', '销售顾问', '接待直接来店客户数', '直接来店客户信息留存数', '直接来店客户及时跟进数', '直接来店客户试乘试驾数', '直接来店客户成交数', '直接来店客户战败数', '直接来店客户信息留存率', '直接来店客户及时跟进率', '直接来店客户试乘试驾率', '直接来店客户成交率', '直接来店客户战败率']

const mutations = {
  [ActionType.FETCH_SALER_WORK_LIST](state: any, payload: any) {
    const { data = [] } = payload
    const cacheData: any = formatData(data)
    const { list } = cacheData
    cacheData.list = list.slice(0, 20)
    cache.list = payload.data ? payload.data.data : []
    cache.total = payload.data ? payload.data.total : 0
    state.list = cacheData
  },
  [ActionType.FETCH_SALER_WORK_PAGE_LIST](state: any, payload: any) {
    const { title } = state.list

    state.list = {
      list: payload.list,
      pagination: payload.pagination,
      title
    }
  },
}

const getters = {
  getList(state) {
    const { list = [] } = state
    return list
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
