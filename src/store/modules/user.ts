/* eslint-disable */
import { getUserList, getUserDetail } from '@/api'
import { formatData, initList, cutInvalidData } from '../helpers'
import moment from 'moment'

const state = {
  list: initList(),
  detail: {},
}

const mutations = {
  'USER_LIST'(state: any, payload: any) {
    const { data = [] } = payload
    state.list = formatData(data)
  },
  'USER_DETAIL'(state: any, payload: any) {
    const { data = {} } = payload
    console.log(data)
    state.detail = data
  },
}

const actions = {
  async getList({ commit }, params) {
    try {
      const result = await getUserList(cutInvalidData(params))
      const payload: any = { ...result }
      commit('USER_LIST', payload)
      return result
    } catch(ex) {
      throw new Error(ex)
    }
  },
  async getDetail({ commit }, id) {
    try {
      const result = await getUserDetail(id)
      commit('USER_DETAIL', result)
      return result
    } catch(ex) {
      throw new Error(ex)
    }
  },
}

const getters = {
  list: (state) => {
    const data = { ...state.list }
    data.list = data.list.map(item => ({
      ...item,
      activeText: item.active === 1 ? '激活' : '禁用',
      registDate: moment(new Date()).format('YYYY-MM-DD HH:mm') 
    }))

    return data
  },
  detail: (state) => state.detail
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
