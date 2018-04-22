import ls from '@/util/localStorage'
import { ssoLogin, ssoLogout } from '@/util/auth'
import { constantRoutes, asyncRoutes } from '@/router/routes'
import { getRole, login } from '@/api'
import { getAuthRoutes, getMenus } from '@/util/permission'

const TOKEN_KEY = 'TOKEN'

const ActionType = {
  // 设置 Token
  SET_TOKEN: 'SET_TOKEN',
  // 登出
  LOGOUT: 'LOGOUT',
  // 重新登录
  LOGIN_ACCESS: 'LOGIN_ACCESS',
  // 设置路由
  SET_ROUTERS: 'SET_ROUTERS',
  // 是否完成权限接口
  ROLE_DONE: 'ROLE_DONE',
  // 设置用户信息
  SET_USER: 'SET_USER',
}

export interface StateType {
  token: string | null,
  user: {} | Object,
  [prop: string]: any
}

const state: StateType = {
  // 储存用户 token, 暂时默认为 true
  token: null,
  // 用户信息
  user: {},
  // 判断是否拉取了权限
  role: false,
  // 可用路由
  routes: constantRoutes || []
}

const mutations = {
  // 设置 token
  [ActionType.SET_TOKEN](state: StateType, token: string) {
    if (token) {
      ls.set(TOKEN_KEY, token)
    }

    state.token = ls.get(TOKEN_KEY)
  },
  // 登出
  [ActionType.LOGOUT](state: StateType) {
    state.token = null
    ls.remove(TOKEN_KEY)
  },
  // 重新登录，登陆失效
  [ActionType.LOGIN_ACCESS](state: StateType) {
    state.token = null
    ls.remove(TOKEN_KEY)
  },
  [ActionType.SET_ROUTERS](state: StateType, authRoutes: Array<any>) {
    state.routes = constantRoutes.concat(authRoutes)
  },
  [ActionType.ROLE_DONE](state: StateType, done: boolean) {
    state.role = done
  },
  [ActionType.SET_USER](state: StateType, payload: any) {
    state.user = {
      ...payload
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
  // 登录
  async login({ commit }, params) {
    const res = await login(params)

    commit(ActionType.SET_USER, res.data)
    commit(ActionType.SET_TOKEN, '1')
  },
  // 通过权限接口的返回创建最终路由
  async getRoles({ commit }, data) {
    const res: any = await getRole()
    const authRoutes = getAuthRoutes(res.data, asyncRoutes)

    commit(ActionType.SET_ROUTERS, authRoutes)
    commit(ActionType.ROLE_DONE, true)
  }
}

const getters = {
  token: (state) => state.token || ls.get(TOKEN_KEY),
  role: (state) => state.role,
  routes: (state) => state.routes,
  menus: (state) => getMenus(state.routes)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
