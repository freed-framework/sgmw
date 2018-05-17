import { defeatCustomerList } from '../../api'
import { formatData, initList, cutInvalidData } from '../helpers'

const ActionType = {
  FETCH_DEFEAT_CUSTOME_LIST: 'FETCH_DEFEAT_CUSTOME_LIST',
}

// initial state
const state = {
  list: initList()
}

const actions = {
  async getDefeatCustomerList({ commit }, param) {
    const result = await defeatCustomerList(cutInvalidData(param))
    const payload: any = { ...result }

    commit(ActionType.FETCH_DEFEAT_CUSTOME_LIST, payload)
  },
  async resetDefeatCustomerList({ commit }) {
    commit(ActionType.FETCH_DEFEAT_CUSTOME_LIST, initList())
  }
}

const mutations = {
  [ActionType.FETCH_DEFEAT_CUSTOME_LIST](state: any, payload: any) {
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
