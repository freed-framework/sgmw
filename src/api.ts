/**
 * @file api.ts
 * @author denglingbo
 *
 * 接口请求文件
 */
import Http from './util/http'
import store from './store'

const http = new Http()

console.log(Promise)

http.axios.defaults.baseURL = process.env.API_HOST

http.request(
  config => {
    const token = store.getters['auth/token']
    if (token) {
      config.headers['AUTH-PASSPORT-TOKEN'] = token
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * http response 拦截器
 */
http.response(
  res => {
    const code = parseInt(res.data.code, 10)

    if (code === 401 || code === 403) {
      store.dispatch('auth/LOGIN_ACCESS')
      return Promise.reject(code)
    }

    return Promise.resolve(res)
  },
  err => {
    if (err.response) {
      const status = err.response.status
      if (status === 401) {
      }
    }
    return Promise.reject(err)
  }
)

/**
 * 获取 book 数据
 */
export const getBookPage = () =>
  new Promise(resolve => {
    setTimeout(() => {
      http.get('/api/get/book').then(res => {
        resolve(res)
      })
    }, 2000)
  })

/**
 * 获取 hello 数据
 */
export const getHelloPage = () =>
  new Promise(resolve => {
    setTimeout(() => {
      http.get('/api/get/hello').then(res => {
        resolve(res)
      })
    }, 2000)
  })
