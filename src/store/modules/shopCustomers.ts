import { shopCustomersList } from '../../api'
import { formatData, initList } from '../helpers'

const ActionType = {
  FETCH_SHOP_CUSTOME_LIST: 'FETCH_SHOP_CUSTOME_LIST',
}

// initial state
const state = {
  list: initList()
}

const actions = {
  async getShopCustomersList({ commit }, param) {
    const result = await shopCustomersList(param)
    const payload: any = { ...result }

    commit(ActionType.FETCH_SHOP_CUSTOME_LIST, payload)
  },
}

const mutations = {
  [ActionType.FETCH_SHOP_CUSTOME_LIST](state: any, payload: any) {
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
