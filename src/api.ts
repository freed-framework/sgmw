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

// 当构建环境为 test 的时候进行该配置
if (process.env.CONTEXT === 'test') {
  http.axios.defaults.withCredentials = true
}

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
      http.get('/get/book').then(res => {
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
      http.get('/get/hello').then(res => {
        resolve(res)
      })
    }, 2000)
  })


// 获取权限接口
// export const getRole = () => {
//   const roles = ['admin', 'order', 'book']

//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         code: 200,
//         data: roles
//       })
//     }, 2000)
//   })
// }

export const login = (params) => http.post('/login', params)
// export const init = () => http.get('/init')

/* eslint-disable */
// for 4.28
export const init = () => {
  return new Promise((resolve) => {
    
    resolve({
      code: 200,
      data: {
        user: {
          name: 'den'
        },
        roles: ['admin', 'kpi', 'book', 'book_list', 'distributor',
        'salesStatistics', 'subStatistics', 'defeatCustomer', 'customerStatistics'
      , 'finalInventStatist']
      }
    })
  })
}

/**
 * common相关
 */
// 获取品牌车系车型
export const allBrandList = () => http.get('/series/allList')
// 回去省市区数据
export const allRegionList = () => http.get('/regiProvcityCounty/allList')
// 获取平台渠道数据
export const allChannelList = () => http.get('/regiProvcityCounty/allList')

/**
 * kpi相关
 */
export const kpiList = (params) => http.post('api/customer-manage-key-kpi/query', params)
/**
 * 经销商相关
 */
export const finalInventStatistList = (params) => http.post('/report/dealersSelf', params)
/**
 * 战败统计
 */
export const defeatCustomerList = (params) => http.post('/store-customer-defeat-rate/query', params)
/**
 * 到店统计
 */
export const shopCustomersList = (params) => http.post('/shop/statistics', params)
/**
 * 潜客统计
 */
export const subStatisticsList = (params) => http.post('/report/submersibleReport', params)
/**
 * 销量统计
 */
export const salesStatisticsList = (params) => http.post('/report/salesReport', params)
/**
 * 客户统计
 */
export const customerStatisticsList = (params) => http.post('/store-customer-defeat-rate/query', params)
/**
 * 厂家潜客线索统计
 */
export const diveCusClueList = (params) => http.post('/p/clue/statistics', params)

/**
 * 导出相关
 */
export const download = {
  sales: '/api/report/salesReportExport',
  subStatis: 'api/report/submersibleReport',
  defeat: 'api/report/dealersSelfExport'
}
