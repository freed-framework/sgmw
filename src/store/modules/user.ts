/* eslint-disable */
import { getUserList, getUserDetail, userUpdate } from '@/api'
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

  async update({ commit }, params) {
    try {
      return await userUpdate(params)
    } catch (ex) {
      throw new Error(ex)
    }
  }
}

const getters = {
  list: (state) => {
    const data = { ...state.list }
    data.list = data.list.map(item => {
      let userTypeName = ''

      if (item.userType === 1) {
        userTypeName = '菜单权限'
      }
      if (item.userType === 2) {
        userTypeName = '数据权限'
      }

      return {
        ...item,
        activeText: item.active === 1 ? '已启用' : '已禁用',
        userTypeName,
        registDate: moment(new Date()).format('YYYY-MM-DD HH:mm') 
      }
    })

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
