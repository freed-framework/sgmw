/**
 * @file auth.js
 * @author denglingbo
 *
 * 权限相关的工具类
 */
const passport = process.env.PASSPORT

function removeTokenFromUrl() {
  let token = null
  const locSearch = window.location.search.replace('?', '')
  const withoutTokenParams = []
  if (locSearch) {
    let params = locSearch.split('&')
    params.forEach(param => {
      const cmps = param.split('=')
      if (cmps.length === 2 && cmps[0] === 'token') {
        token = decodeURIComponent(cmps[1])
      } else {
        withoutTokenParams.push(param)
      }
    })
  }
  if (token) {
    let newUrl = window.location.href.replace(window.location.search, '')
    if (withoutTokenParams.length > 0) {
      newUrl += '?' + withoutTokenParams.join('&')
    }
    return newUrl
  }

  return window.location.href
}

function replaceTokenByUrl() {
  window.location.replace(removeTokenFromUrl())
}

function hasTokenRedirect() {
  const arr = window.location.href.split('token=')
  return arr[1]
}

function ssoLogin() {
  window.location.href = `${passport}login?redirect=${removeTokenFromUrl()}`
}

function ssoLogout() {
  window.location.href = `${passport}logout?redirect=${removeTokenFromUrl()}`
}

export {
  ssoLogout,
  ssoLogin,
  hasTokenRedirect,
  replaceTokenByUrl,
  removeTokenFromUrl
}
