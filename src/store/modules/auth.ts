import ls from '@/util/localStorage'
import { ssoLogin, ssoLogout } from '@/util/auth'
import { constantRoutes, asyncRoutes } from '@/router/routes'
import { getRole, login } from '@/api'

const TOKEN_KEY = 'TOKEN'
// 获取静态路由
const constantMenus = getMenus(constantRoutes)
const ActionType = {
  // 设置 Token
  SET_TOKEN: 'SET_TOKEN',
  // 登出
  LOGOUT: 'LOGOUT',
  // 重新登录
  LOGIN_ACCESS: 'LOGIN_ACCESS',
  // 设置路由
  SET_ROUTERS: 'SET_ROUTERS',
  SET_MENUS: 'SET_MENUS',
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
  routes: constantRoutes || [],
  // 左侧导航
  menus: constantMenus
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
  [ActionType.SET_MENUS](state: StateType, authRoutes: Array<any>) {
    const menus = getMenus(authRoutes)
    state.menus = constantMenus.concat(menus)
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
    const res = await getRole()
    const authRoutes = getAuthRoutes(res)

    commit(ActionType.SET_MENUS, authRoutes)
    commit(ActionType.SET_ROUTERS, authRoutes)
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

/**
 * 创建 Menus
 * @param routes routes
 */
function getMenus(routes: Array<any> = []): Array<any> {
  const menus = []

  routes.forEach((route) => {
    // 创建 menu 数据格式
    const menu: any = {
      path: route.path,
      ...(route.name && { name: route.name }),
      ...(route.meta && { text: route.meta.text }),
      ...(route.hidden && { hidden: route.hidden }),
    }

    // 如果子路由仅一项
    // 1. 把子路由的 text 覆盖到 $parent.text
    // 2. 合并路由 path
    if (route.children) {
      if (route.children.length === 1) {
        const child = route.children[0]
        const childMeta = child.meta
        if (childMeta && childMeta.text) {
          menu.text = childMeta.text
        }
        
        if (child.path !== '') {
          menu.path = `${menu.path}/${child.path}`
        }
      } else {
        menu.children = getMenus(route.children)
      }
    }

    menus.push(menu)
  })

  return menus
}

const getters = {
  token: (state) => state.token || ls.get(TOKEN_KEY),
  role: (state) => state.role,
  routes: (state) => state.routes,
  menus: (state) => {
    console.log(state.menus)
    return state.menus
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
