import { salerWorkNumList } from '../../api'
import { formatData, initList, cutInvalidData } from '../helpers'

const ActionType = {
  FETCH_SALER_WORK_LIST: 'FETCH_SALER_WORK_LIST',
}

// initial state
const state = {
  list: initList()
}

const actions = {
  async getSalerWorkNumList({ commit }, param) {
    const result = await salerWorkNumList(cutInvalidData(param))
    const payload: any = { ...result }

    commit(ActionType.FETCH_SALER_WORK_LIST, payload)
  },
}

const mutations = {
  [ActionType.FETCH_SALER_WORK_LIST](state: any, payload: any) {
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
