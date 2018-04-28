/**
 * @file api.ts
 * @author denglingbo
 *
 * 接口请求文件
 */
import Http from './util/http'
import store from './store'

const http = new Http()

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


export const getRole = () => {
  const roles = ['admin', 'order', 'book']

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: roles
      })
    }, 2000)
  })
}

export const login = (params) => http.post('/api/login', params)

/**
 * kpi相关
 */
export const kpiList = (params) => http.post('/api/store-customer-defeat-rate/query', params)
