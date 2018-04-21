/**
 * @file http.ts
 * @author denglingbo
 */

import axios from 'axios'
import * as util from './util'

// axios 配置
axios.defaults.timeout = 10000

axios.defaults.headers = {
  'Content-Type': 'application/json;charset=UTF-8'
}

export default class http {
  constructor() {
    this.axios = axios
  }

  /**
   * 请求拦截器
   *
   * @param {Function} success 成功回调
   * @param {Function} error 失败回调
   */
  request(success, error) {
    this.axios.interceptors.request.use(success, error)
  }

  /**
   * 响应拦截器
   *
   * @param {Function} success 成功回调
   * @param {Function} error 失败回调
   */
  response(success, error) {
    this.axios.interceptors.response.use(success, error)
  }

  /**
   * 统一处理请求方法
   *
   * @param {string} type 请求类型
   * @param {string} url 请求的url
   * @param {Object} options 请求数据对象
   */

  fetchData(type, url, options) {
    return this.axios[type](url, options)
      .then(res => {
        return res.data
      })
      .catch(error => {
        if (error.response) {
          const { status } = error.response

          if (status !== 200 && status !== 401) {
          }
        }
        return error
      })
  }

  /**
   * http get请求封装
   *
   * @param {string} url 请求链接
   * @param {Object} query 查询数据对象
   */
  get(url, query = {}) {
    let newUrl = url
    const newQuery = {}

    Object.assign(newQuery, query)

    // 产生一个随机数防止get请求被缓存
    newQuery[`b${new Date().getTime()}`] = 1

    const queryString = util.parseQuerystring(newQuery)

    newUrl =
      newUrl.indexOf('?') > 0
        ? `${encodeURI(newUrl)}&${queryString}`
        : `${encodeURI(newUrl)}?${queryString}`

    return this.fetchData('get', newUrl, {})
  }

  /**
   * http post请求封装
   *
   * @param {string} url 请求链接
   * @param {Object} options post数据
   */
  post(url, options) {
    return this.fetchData('post', url, options)
  }

  /**
   * http put请求封装
   *
   * @param {string} url 请求链接
   * @param {Object} options put数据
   */
  put(url, options) {
    return this.fetchData('put', url, options)
  }

  /**
   * http delete请求封装
   *
   * @param {string} url 请求链接
   * @param {Object} options delete数据
   */
  delete(url, options) {
    return this.fetchData('delete', url, options)
  }
}
