/**
 * @file authview.ts
 * @author denglingbo
 *
 * 页面操作权限
 */

let userRoles = []

export default {
  bind(el, binding) {
    let value = binding.value

    if (typeof value === 'string') {
      value = [value]
    }

    const inRole = value.some(r => userRoles.indexOf(r) >= 0)

    if (!inRole) {
      el.style.display = 'none'
    }
  },

  install(Vue, roles: Array<string>) {
    Vue.directive('authview', {
      bind: this.bind,
    })

    userRoles = roles
  }
}
