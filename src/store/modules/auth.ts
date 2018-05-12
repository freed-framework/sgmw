import ls from '@/util/localStorage'
import { ssoLogin, ssoLogout } from '@/util/auth'
import { constantRoutes, asyncRoutes } from '@/router/routes'
import { login, init, logout, getRoleAll } from '@/api'
import { getAuthRoutes, getMenus } from '@/util/permission'

const TOKEN_KEY = 'SGMW_TOKEN'

const ActionType = {
  // 设置 Token
  // SET_TOKEN: 'SET_TOKEN',
  IS_AUTH: 'IS_AUTH',
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
  // 设置权限列表
  SET_ROLES: 'SET_ROLES'
}

export interface StateType {
  // token: string | null,
  // user: {} | Object,
  [prop: string]: any
}

const state: StateType = {
  // 储存用户 token, 暂时默认为 true
  // token: null,
  // 判断是否登录
  isAuth: false,
  // 用户信息
  user: {},
  // 判断是否拉取了权限
  role: false,
  // 权限列表
  // roles 其实是 permission ....
  roles: [],
  // 可用路由
  routes: constantRoutes || [],

  // 所有的角色信息
  roleAll: []
}

const mutations = {
  // 设置 token
  // [ActionType.SET_TOKEN](state: StateType, token: string) {
  //   if (token) {
  //     ls.set(TOKEN_KEY, token)
  //   }

  //   state.token = ls.get(TOKEN_KEY)
  // },
  [ActionType.IS_AUTH](state: StateType) {
    // state.token = null
    ls.set(TOKEN_KEY, '1')
    state.isAuth = true
  },
  // 登出
  [ActionType.LOGOUT](state: StateType) {
    // state.token = null
    ls.remove(TOKEN_KEY)
    state.isAuth = false
  },
  // 重新登录，登陆失效
  [ActionType.LOGIN_ACCESS](state: StateType) {
    // state.token = null
    ls.remove(TOKEN_KEY)
    state.isAuth = false
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
  },
  [ActionType.SET_ROLES](state: StateType, payload: Array<string>) {
    state.roles = payload
  },

  'ROLE_ALL'(state: StateType, payload: Array<string>) {
    state.roleAll = payload
  }
}

const actions = {
  // token 过期
  [ActionType.LOGIN_ACCESS]({ commit }) {
    commit(ActionType.LOGIN_ACCESS)
    ssoLogin()
  },

  // [ActionType.SET_TOKEN]({ commit }, token) {
  //   commit(ActionType.SET_TOKEN, token)
  // },
  async logout({ commit }) {
    try {
      const res = await logout()
      commit(ActionType.LOGOUT)
      ssoLogout()
      return res
    } catch (ex) {
      throw new Error(ex)
    }
  },

  // 登录
  // 此处登录仅仅返回登录状态
  async login({ commit }, params) {
    try {
      const res = await login({
        loginName: params.name,
        password: params.password
      })

      commit(ActionType.IS_AUTH, true)
      return res
    } catch (ex) {
      throw new Error(ex)
    }

    // commit(ActionType.SET_USER, res.data)
    // commit(ActionType.SET_TOKEN, '1')
  },
  // 通过权限接口的返回创建最终路由
  // async getRoles({ commit }, data) {
  //   const res: any = await getRole()
  //   const authRoutes = getAuthRoutes(res.data, asyncRoutes)

  //   commit(ActionType.SET_ROUTERS, authRoutes)
  //   commit(ActionType.ROLE_DONE, true)
  // },

  async roleAll({ commit }) {
    try {
      const result = await getRoleAll()
      commit('ROLE_ALL', result.data)
      return result
    } catch (ex) {
      throw new Error(ex)
    }
  },

  /**
   * 初始化所有数据
   * 1. user
   * 2. roles
   */
  async init({ commit, dispatch }) {
    try {
      const res: any = await init()

      // 处理异常
      // if (!res || !res.data) {
      //   dispatch('logout')
      //   return
      // }

      // 创建用户信息
      commit(ActionType.SET_USER, res.data)

      let roles = res.data && res.data.privileges ? res.data.privileges : []

      // if (res.data && res.data.privileges) { // Mock
      roles = [
        'users',
        // 'permissions',
        'roles',
        // 'kpi',
        'inspectionSystem',
        'distributor',
        'salesStatistics',
        'subStatistics',
        'defeatCustomer',
        // 'customerStatistics',
        'finalInventStatist'
      ]
      // }
      commit(ActionType.SET_ROLES, roles)
      // 创建权限信息
      const authRoutes = getAuthRoutes(roles, asyncRoutes)
      commit(ActionType.SET_ROUTERS, authRoutes)
      commit(ActionType.ROLE_DONE, true)

      // 获取所有角色数据
      dispatch('roleAll')

      return res
    } catch (ex) {
      throw new Error(ex)
    }
  }
}

const getters = {
  // token: (state) => state.token || ls.get(TOKEN_KEY),
  isAuth: state => state.isAuth || !!ls.get(TOKEN_KEY),
  // is role
  user: state => state.user,
  role: state => state.role,
  routes: state => state.routes,
  menus: state => getMenus(state.routes),
  roles: state => state.roles,

  // 用于角色下拉框
  roleSelect: (state) => {
    return state.roleAll.map(item => ({
      id: item.id,
      value: item.name
    }))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
