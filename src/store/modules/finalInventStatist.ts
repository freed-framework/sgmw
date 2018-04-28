import { finalInventStatistList } from '../../api'
import { formatData } from '../helpers'

/* eslint-disable */
const ActionType = {
  FETCH_FINAL_VENT_LIST: 'FETCH_FINAL_VENT_LIST',
}

// initial state
const state = {
  list: []
}

const actions = {
  async getFinalInVentStaList({ commit }, param) {
    const result = await finalInventStatistList(param)
    const payload: any = { ...result }

    commit(ActionType.FETCH_FINAL_VENT_LIST, payload)
  },
}

const mutations = {
  [ActionType.FETCH_FINAL_VENT_LIST](state: any, payload: any) {
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
