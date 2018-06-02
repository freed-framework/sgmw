/* eslint-disable */
import { allBrandList, allRegionList, allChannelList } from '../../api'
import { formatBrandData, formatRegionData, formatChannelData } from '../helpers'

const ActionType = {
  LOADING: 'LOADING',
  FETCH_COMMON_BRAND_LIST: 'FETCH_COMMON_BRAND_LIST',
  FETCH_COMMON_REGION_LIST: 'FETCH_COMMON_REGION_LIST',
  FETCH_COMMON_CHANNEL_LIST: 'FETCH_COMMON_CHANNEL_LIST',
}

// initial state
const state = {
  isLoading: false,
  brandList: { list: [], fetched: false },
  regionList: { list: [], fetched: false },
  channelList: { list: [], fetched: false }
}

const actions = {
  async getBrandList({ commit }) {
    const result = await allBrandList()
    const payload: any = { ...result }

    commit(ActionType.FETCH_COMMON_BRAND_LIST, payload)
  },
  async getRegionList({ commit }) {
    const result = await allRegionList()
    const payload: any = { ...result }

    commit(ActionType.FETCH_COMMON_REGION_LIST, payload)
  },
  async getChannelList({ commit }) {
    const result = await allChannelList()
    const payload: any = { ...result }

    commit(ActionType.FETCH_COMMON_CHANNEL_LIST, payload)
  },
  async loading({ commit }, isLoading = false) {
    const payload: any = { isLoading }
    commit(ActionType.LOADING, payload)
  }
}

const mutations = {
  [ActionType.LOADING](state: any, payload: any) {
    const { isLoading = false } = payload
    state.isLoading = isLoading
  },
  [ActionType.FETCH_COMMON_BRAND_LIST](state: any, payload: any) {
    const { data = [] } = payload
    state.brandList = { list: formatBrandData(data), fetched: true }
  },
  [ActionType.FETCH_COMMON_REGION_LIST](state: any, payload: any) {
    const { data = [] } = payload
    state.regionList = { list: formatRegionData(data), fetched: true }
  },
  [ActionType.FETCH_COMMON_CHANNEL_LIST](state: any, payload: any) {
    const { data = [] } = payload
    state.channelList = { list: formatChannelData(data), fetched: true }
  },
}

const getters = {
  loading(state) {
      return state.isLoading
  },
  brandList(state) {
    const { brandList = [] } = state
    return brandList
  },
  regionList(state) {
    const { regionList = [] } = state
    return regionList
  },
  channelList(state) {
    const { channelList = [] } = state
    return channelList
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
