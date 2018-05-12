/* eslint-disable */
import authviewCreator from '@/router/authviewCreator'
import { sourceAsync } from '@/router/routes'
import { getRoleList, getRoleDetail } from '@/api'
import { formatData, initList, cutInvalidData } from '../helpers'

function createList(routes: Array<any>, parent: any = null) {
  const list = []

  routes.forEach((route) => {
    const meta = route.meta

    const id = route.key || (meta.key || (meta.role && meta.role[0]))
console.log(id)
    // 创建 menu 数据格式
    const item: any = {
      // 主菜单才有 key
      // 子菜单才使用 meta.key or role.key
      id,
      label: meta.text,
      parent,
    }

    const children = route.children

    if (children) {
      // 只有一个节点的时候不添加 children，同时把 children 的 text 赋值给 parent
      if (children.length === 1) {
        item.label = children[0].meta.text
      } else {
        item.children = createList(children, {
          id: item.id,
          path: item.path
        })
      }
    }

    // 二级菜单 添加页面级别的 权限的DOM
    const authviewList = authviewCreator(item.id)
    if (authviewList && parent) {
      const list = (item.children || []).concat(authviewList)
      item.children = list
    }

    list.push(item)
  })

  return list
}

function findByRoutes(id, routes) {
  let match = null

  routes.forEach(route => {
    if (route.id === id) {
      match = route
    }

    if (!match && route.children) {
      match = findByRoutes(id, route.children)
    }
  })

  return match
}

const checkRoles = []

function findChecked(roles, routes) {
  const map = {}

  roles.forEach(roleKey => {
    if (map[roleKey] === undefined) {
      const match = findByRoutes(roleKey, routes)

      if (match) {
        if (checkRoles.indexOf(roleKey) >= 0) {
          console.warn(`key: ${roleKey} 重复`)
        }

        checkRoles.push(roleKey)

        map[match.id] = {
          id: match.id,
          label: match.label
        }
      }
    }
  })

  const obj: any = Object
  return obj.values(map)
}

const state = {
  permissions: [],
  list: initList(),
  detail: {},
}

const mutations = {
  'ROLE_LIST'(state: any, payload: any) {
    const { data = [] } = payload
    state.list = formatData(data)
  },
  'ROLE_DETAIL'(state: any, payload: any) {
    const { data = {} } = payload
    console.log(data)
    state.detail = data
  },
}

const actions = {
  async getList({ commit }, params) {
    try {
      const result = await getRoleList(cutInvalidData(params))
      const payload: any = { ...result }
      commit('ROLE_LIST', payload)
      return result
    } catch(ex) {
      throw new Error(ex)
    }
  },
  async getDetail({ commit }, id) {
    try {
      const result = await getRoleDetail(id)
      commit('ROLE_DETAIL', result)
      return result
    } catch(ex) {
      throw new Error(ex)
    }
  },

  /**
   * 
   * @param param0 
   * @param currentPermissions ['key', '', ...]
   */
  getCheckedPermissions({ commit, getters }, currentPermissions) {
    console.log(currentPermissions, getters.permissions)
    return findChecked(currentPermissions, getters.permissions)
  }
}

const getters = {
  // 静态路由不进行选择操作
  // Permissions
  permissions: (state) => {
    const filterRoutes = sourceAsync.filter(item => item.hidden !== true)
    return createList(filterRoutes)
  },

  choosedPermissions: (state, getters, rootSate, rootGetters) => {
    const roles = rootGetters['auth/roles']
  console.log(roles)
    const allChecked = findChecked(roles, getters.permissions)
    return allChecked
  },

  list: (state) => {
    const data = { ...state.list }
    data.list = data.list.map(item => ({
      ...item,
      activeText: item.active === 1 ? '是' : '否'
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
