import ls from '@/util/localStorage'
import { ssoLogin, ssoLogout } from '@/util/auth'
import { constantRoutes, asyncRoutes } from '@/router/routes'
import { getRole } from '@/api'

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
}

export interface StateType {
  token: null | string,
  userInfo: {} | Object,
  [prop: string]: any
}

const state: StateType = {
  // 储存用户 token, 暂时默认为 true
  token: null,
  // 用户信息
  userInfo: {},
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
  login({ commit }, options) {
    commit(ActionType.SET_TOKEN, '123')
  },
  // 通过权限接口的返回创建最终路由
  async getRoles({ commit }, data) {
    const res = await getRole()

    commit(ActionType.SET_ROUTERS, getAuthRoutes(res))
    commit(ActionType.ROLE_DONE, true)
  }
}

/**
 * 判断是否有相应权限
 * @param roles 权限数组
 * @param route 单个路由
 */
function hasPermission(roles: string[], route: any) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 获取有权限的路由
 * @param roles 权限列表
 */
function getAuthRoutes(roles) {
  return asyncRoutes.filter(route => {
    if (hasPermission(roles, route)) {
      // 是否存在子路由
      if (route.children && route.children.length > 0) {
        const chidlren: any = route.children
        // 判断子路由权限
        route.children = chidlren.filter(child => {
          if (hasPermission(roles, child)) {
            return child
          }
          return false
        })

        return route
      } else {
        return route
      }
    }
  })
}

const getters = {
  token: (state) => state.token || ls.get(TOKEN_KEY),
  role: (state) => state.role,
  routes: (state) => state.routes
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
