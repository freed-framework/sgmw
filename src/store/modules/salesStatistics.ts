import { salesStatisticsList } from '../../api'
import { formatData, initList } from '../helpers'

const ActionType = {
  FETCH_SALES_STATIS_LIST: 'FETCH_SALES_STATIS_LIST',
}

// initial state
const state = {
  list: initList()
}

const actions = {
  async getSalesStatisticsList({ commit }, param) {
    const result = await salesStatisticsList(param)
    const payload: any = { ...result }

    commit(ActionType.FETCH_SALES_STATIS_LIST, payload)
  },
}

const mutations = {
  [ActionType.FETCH_SALES_STATIS_LIST](state: any, payload: any) {
    const { data = [] } = payload
    state.list = formatData(data)
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
