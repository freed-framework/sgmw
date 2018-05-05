import { subStatisticsList } from '../../api'
import { formatData, initList, cutInvalidData } from '../helpers'

const ActionType = {
  FETCH_KPI_LIST: 'FETCH_KPI_LIST',
}

// initial state
const state = {
  list: initList()
}

const actions = {
  async getSubStatisticsListList({ commit }, param) {
    const result = await subStatisticsList(cutInvalidData(param))
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
