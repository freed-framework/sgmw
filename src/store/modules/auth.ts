import ls from '@/util/localStorage'
import { ssoLogin, ssoLogout } from '@/util/auth'

const TOKEN_KEY = 'TOKEN'

const ActionType = {
  SET_TOKEN: 'SET_TOKEN',
  LOGOUT: 'LOGOUT',
  LOGIN_ACCESS: 'LOGIN_ACCESS',
  GET_USER_DONE: 'GET_USER_DONE'
}

export interface StateTypes {
  token: null | string,
  userInfo: {} | Object,
}

const state: StateTypes = {
  token: null,
  userInfo: {},
}

const mutations = {
  [ActionType.SET_TOKEN](state: StateTypes, token: string) {
    if (token) {
      ls.set(TOKEN_KEY, token)
    }

    state.token = ls.get(TOKEN_KEY)
  },
  [ActionType.LOGOUT](state: StateTypes) {
    state.token = null
    ls.remove(TOKEN_KEY)
  },
  [ActionType.LOGIN_ACCESS](state: StateTypes) {
    state.token = null
    ls.remove(TOKEN_KEY)
  },
  [ActionType.GET_USER_DONE](state: StateTypes, payload: any) {
    state.userInfo = {
      ...state.userInfo,
      ...payload.data
    }
  }
}

const actions = {
  [ActionType.SET_TOKEN]({ commit }, token) {
    commit(ActionType.SET_TOKEN, token)
  },
  [ActionType.LOGOUT]({ commit }) {
    commit(ActionType.LOGOUT)
    ssoLogout()
  },
  // token 过期
  [ActionType.LOGIN_ACCESS]({ commit }) {
    commit(ActionType.LOGIN_ACCESS)
    ssoLogin()
  },
  async getLoginUserInfo({ commit }, options) {
    // const result = await getLoginUserInfo(options)
    // commit(ActionType.GET_USER_DONE, { ...result })
  }
}

const getters = {
  token: (state) => state.token || ls.get(TOKEN_KEY),
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
