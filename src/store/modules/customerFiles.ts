import { customerFiles } from '../../api'
import { formatData, initList } from '../helpers'

const fields = ['经销商号', '经销商名称', '车架号', '客户姓名', '联系电话', '建档日期', '交车日期', '开票日期', '销量统计日期', '状态', '经销商审核日期', 'SGMW审核结果', '申请修改状态', '集团车', '合格证号', '制造日期', '基地', '车型']

const ActionType = {
  FETCH_CUSTOM_STATIST_LIST: 'FETCH_CUSTOM_STATIST_LIST',
}

// initial state
const state = {
  list: initList()
}

const actions = {
  async getCustomerFilesList({ commit }, param) {
    const result = await customerFiles(param)
    const payload: any = { ...result }

    commit(ActionType.FETCH_CUSTOM_STATIST_LIST, payload)
  },
  async resetCustomerFilesList({ commit }) {
    commit(ActionType.FETCH_CUSTOM_STATIST_LIST, initList())
  }
}

const mutations = {
  [ActionType.FETCH_CUSTOM_STATIST_LIST](state: any, payload: any) {
    const { data = [] } = payload
    data.fields = fields
    const list = formatData(data)
    state.list = list
  },
}

const getters = {
  getList(state) {
    const { list = {} } = state
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
