import { feature } from '../../api'
import { formatData, initList } from '../helpers'

const ActionType = {
  FETCH_DIVE_FEATURE: 'FETCH_DIVE_FEATURE',
}

// initial state
const state = {
  list: initList()
}

const actions = {
  async getDiveFeature({ commit }, param) {
    const result = await feature(param)
    const payload: any = { ...result }

    commit(ActionType.FETCH_DIVE_FEATURE, payload)
  },
}

const mutations = {
  [ActionType.FETCH_DIVE_FEATURE](state: any, payload: any) {
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
