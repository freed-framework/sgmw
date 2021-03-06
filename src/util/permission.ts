/**
 * @file permission.ts
 * @author denglingbo
 * 权限相关
 */

/**
 * 判断是否有相应权限
 * @param roles 权限数组
 * @param route 单个路由
 */
function hasPermission(roles: string[], route: any) {
  if (route.meta && route.meta.role) {
    return roles.some(role => {
      return route.meta.role.indexOf(role) >= 0
    })
  } else {
    return true
  }
}

/**
 * 获取有权限的路由
 * @param roles 权限列表
 * @param routes 路由
 */
function getAuthRoutes(roles: string[], routes: Array<any>): Array<any> {
  return routes.filter(route => {
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
 * @param parent 父级
 */
function getMenus(routes: Array<any> = [], parent?: string): Array<any> {
  const menus = []

  routes.forEach((route) => {
    const meta = route.meta

    // 创建 menu 数据格式
    const menu: any = {
      path: route.path,
      ...(route.name && { name: route.name }),
      ...((meta && meta.text) && { text: route.meta.text }),
      ...(route.hidden && { hidden: route.hidden }),
      ...(route.meta && { meta: route.meta }),
    }

    // 如果子路由仅一项
    // 1. 把子路由的 text 覆盖到 $parent.text
    // 2. 合并路由 path
    if (route.children) {
      // 如果只有一个子路由，则认为子路由为唯一展示
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
        menu.children = getMenus(route.children, menu.path)
      }
    }

    menus.push(menu)
  })

  return menus
}

export {
  hasPermission,
  getAuthRoutes,
  getMenus,
}
