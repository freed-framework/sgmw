import { buyerIntention } from '../../api'
import { formatData, initList } from '../helpers'

const ActionType = {
  FETCH_BUYER_INTENTION: 'FETCH_BUYER_INTENTION',
}

// initial state
const state = {
  list: initList()
}

const actions = {
  async getBuyerIntention({ commit }, param) {
    const result = await buyerIntention(param)
    const payload: any = { ...result }

    commit(ActionType.FETCH_BUYER_INTENTION, payload)
  },
}

const mutations = {
  [ActionType.FETCH_BUYER_INTENTION](state: any, payload: any) {
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
