import { finalInventStatistList } from '../../api'
import { formatData, initList, cutInvalidData } from '../helpers'

const ActionType = {
  FETCH_FINAL_STATIST_LIST: 'FETCH_FINAL_STATIST_LIST',
}

// initial state
const state = {
  list: initList()
}

const actions = {
  async getFinalInVentStaList({ commit }, param) {
    const result = await finalInventStatistList(cutInvalidData(param))
    const payload: any = { ...result }

    commit(ActionType.FETCH_FINAL_STATIST_LIST, payload)
  },
  async resetFinalInVentStaList({ commit }) {
    commit(ActionType.FETCH_FINAL_STATIST_LIST, initList())
  }
}

const mutations = {
  [ActionType.FETCH_FINAL_STATIST_LIST](state: any, payload: any) {
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
