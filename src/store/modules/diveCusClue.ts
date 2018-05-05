import { diveCusClueList } from '../../api'
import { formatData, initList } from '../helpers'

const ActionType = {
  FETCH_DIVE_CUS_CLUE_LIST: 'FETCH_DIVE_CUS_CLUE_LIST',
}

// initial state
const state = {
  list: initList()
}

const actions = {
  async getDiveCusClueList({ commit }, param) {
    const result = await diveCusClueList(param)
    const payload: any = { ...result }

    commit(ActionType.FETCH_DIVE_CUS_CLUE_LIST, payload)
  },
}

const mutations = {
  [ActionType.FETCH_DIVE_CUS_CLUE_LIST](state: any, payload: any) {
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
