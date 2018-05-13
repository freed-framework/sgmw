/**
 * @file api.ts
 * @author denglingbo
 *
 * 接口请求文件
 */
import Http from './util/http'
import store from './store'
import { Message } from 'element-ui'

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
    } else if (code === 500) {
      Message({
        showClose: true,
        message: res.data.displayMessage || '系统错误！',
        type: 'error',
        center: true
      })

      return Promise.reject(res)
    }

    return Promise.resolve(res)
  },
  err => {
    if (err.response) {
      const status = err.response.status
      if (status === 401) {
        store.dispatch('auth/LOGIN_ACCESS')
        return Promise.reject(err)
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

export const init = () => http.get('/profile/current')

/* eslint-disable */
// for 4.28
// export const init = () => {
//   return new Promise((resolve) => {
//     resolve({
//       code: 200,
//       data: {
//         user: {
//           name: 'den'
//         },
//         roles: ['admin', 'kpi', 'book', 'book_list', 'distributor', 'roles',
//         'salesStatistics', 'subStatistics', 'defeatCustomer', 'customerStatistics'
//       , 'finalInventStatist']
//       }
//     })
//   })
// }

export const getRoleList = (params) => http.get('/role/query', params)
export const getRoleAll = () => http.get('/role/getAll')
export const getRoleDetail = (id) => http.get('/role/detail', { id })
export const roleUpdate = (params) => http.post('/role/update', params)
export const roleAdd = (params) => http.post('/role/add', params)

export const getUserList = (params) => http.get('/user/query', params)
export const getUserDetail = (id) => http.get('/user/detail', { id })
export const userUpdate = (params) => http.post('/user/update', params)

/**
 * common相关
 */
// 获取品牌车系车型
export const allBrandList = () => http.get('/basedata/seriesList')
// 回去省市区数据
export const allRegionList = () => http.get('/basedata/proCityList')
// 获取平台渠道数据
export const allChannelList = () => http.get('/basedata/platformChannelList')

export const login = (params) => http.post('/profile/login', params)
export const logout = () => http.post('/profile/logout')

/**
 * kpi相关
 */
export const kpiList = (params) => http.post('/customer-manage-key-kpi/query', params)
/**
 * 经销商自建线索
 */
export const InspectionSystemList = (params) => http.post('/report/dealersSelf', params)
/**
 * 期末库存统计
 */
export const finalInventStatistList = (params) => http.post('/report/dealersSelf', params)
/**
 * 战败统计
 */
export const defeatCustomerList = (params) => http.post('/defeat/statistics', params)
/**
 * 到店客户统计
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
export const customerStatisticsList = (params) => http.post('/report/customerReport', params)
/**
 * 厂家潜客线索统计
 */
export const diveCusClueList = (params) => http.post('/p/clue/statistics', params)
/**
 * 潜在客户购买意向分析
 */
export const buyerIntention = (params) => http.post('/p/p/intent/analysis', params)
/**
 * 潜在客户特征分析
 */
export const feature = (params) => http.post('/p/clue/statistics', params)
/**
 * 销售顾问工作量
 */
export const salerWorkNumList = (params) => http.post('/report/salesReport', params)

/**
 * 导出相关
 */
export const download = {
  sales: '/api/report/salesReportExport',
  subStatis: '/api/report/submersibleReportExport',
  kpi: '/api/customer-manage-key-kpi/export',
  // 经销商自建
  defeat: '/api/report/dealersSelfExport',
  // 到店
  shop: '/api/shop/export',
  // 厂家潜客线索
  diveCusClue: '/api/p/clue/export',
  // 潜在客户购买意向分析
  buyerIntention: '/api/p/p/intent/export',
  // 潜在客户特征分析
  feature: '/api/p/p/intent/export',
  // 客户统计
  customerStatic: '/api/report/customerReportExport',
  // 销售顾问工作量
  salerWorkNum: '/api/report/salesReportExport',
}
