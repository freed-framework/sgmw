import { customerStatisticsList } from '../../api'
import { formatData, initList } from '../helpers'

const ActionType = {
  FETCH_CUSTOM_STATIST_LIST: 'FETCH_CUSTOM_STATIST_LIST',
}

// initial state
const state = {
  list: initList()
}

const actions = {
  async getCustomerStatisticsList({ commit }, param) {
    const result = await customerStatisticsList(param)
    const payload: any = { ...result }

    commit(ActionType.FETCH_CUSTOM_STATIST_LIST, payload)
  },
}

const mutations = {
  [ActionType.FETCH_CUSTOM_STATIST_LIST](state: any, payload: any) {
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
