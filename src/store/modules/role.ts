/* eslint-disable */
import authviewCreator from '@/router/authviewCreator'
import { sourceAsync } from '@/router/routes'

function createList(routes: Array<any>, parent: any = null) {
  const list = []

  routes.forEach((route) => {
    const meta = route.meta

    // 创建 menu 数据格式
    const item: any = {
      id: meta.key || meta.role[0],
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
  return routes.find(route => {
    if (route.children) {
      return findByRoutes(id, route.children)
    }
    return route.id === id
  })
}

function findChecked(roles, routes) {
  console.log(roles, routes)

  const map = {}

  roles.forEach(roleKey => {
    console.log(roleKey)
    if (map[roleKey] === undefined) {
      const match = findByRoutes(roleKey, routes)

      if (match) {
        map[roleKey] = match
      }
    }
  })

  console.log(map)
  const obj: any = Object
  return obj.values(map)
}

const state = {}

const mutations = {}

const actions = {}

const getters = {
  // 静态路由不进行选择操作
  list: (state) => {
    const filterRoutes = sourceAsync.filter(item => item.hidden !== true)
    return createList(filterRoutes)
  },

  choosed: (state, getters, rootSate, rootGetters) => {
    const roles = rootGetters['auth/roles']
    const arr = findChecked(roles, getters.list)
    return arr
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
