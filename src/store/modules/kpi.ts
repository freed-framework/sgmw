import { kpiList } from '../../api'
import { formatData, initList, cutInvalidData } from '../helpers'

const ActionType = {
  FETCH_KPI_LIST: 'FETCH_KPI_LIST',
  RESET_KPI_LIST: 'RESET_KPI_LIST'
}

// initial state
const state = {
  list: initList()
}

const actions = {
  async getKpiList({ commit }, param) {
    const result = await kpiList(cutInvalidData(param))
    const payload: any = { ...result }
    commit(ActionType.FETCH_KPI_LIST, payload)
  },
  async resetList({ commit }) {
    const payload: any = { }
    commit(ActionType.RESET_KPI_LIST, payload)
  }
}

const mutations = {
  [ActionType.FETCH_KPI_LIST](state: any, payload: any) {
    const { data = [] } = payload
    state.list = formatData(data)
  },
  [ActionType.RESET_KPI_LIST](state: any, payload: any) {
    state.list = initList()
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
