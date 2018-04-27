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
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
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

export {
  hasPermission,
  getAuthRoutes,
  getMenus
}
