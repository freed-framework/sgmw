import { kpiList } from '../../api'
import { formatData } from '../helpers'

const ActionType = {
  FETCH_KPI_LIST: 'FETCH_KPI_LIST',
}

// initial state
const state = {
  list: []
}

const actions = {
  async getKpiList({ commit }, param) {
    const result = await kpiList(param)
    const payload: any = { ...result }

    commit(ActionType.FETCH_KPI_LIST, payload)
  },
}

const mutations = {
  [ActionType.FETCH_KPI_LIST](state: any, payload: any) {
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
