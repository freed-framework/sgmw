import { InspectionSystemList } from '../../api'
import { formatData, initList, cutInvalidData } from '../helpers'

const ActionType = {
  FETCH_INSPEC_SYSTEM: 'FETCH_INSPEC_SYSTEM',
}

// initial state
const state = {
  list: initList()
}

const actions = {
  async getInspectionSystemList({ commit }, param) {
    const result = await InspectionSystemList(cutInvalidData(param))
    const payload: any = { ...result }

    commit(ActionType.FETCH_INSPEC_SYSTEM, payload)
  },
  async resetInspectionSystemList({ commit }) {
    commit(ActionType.FETCH_INSPEC_SYSTEM, initList())
  }
}

const mutations = {
  [ActionType.FETCH_INSPEC_SYSTEM](state: any, payload: any) {
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
