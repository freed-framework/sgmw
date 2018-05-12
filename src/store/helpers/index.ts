import formatBrandData from './formatBrand'
import formatRegionData from './formatRegion'
import formatChannelData from './formatChannel'

/* eslint-disable */
export function initList() {
  return {
    title: [],
    list: [],
    pagination: {
      pageNum: 0,
      pageSize: 0,
      total: 0
    }
  }
}
/**
 * 处理数据
 * @param data 后端返会数据中的data
 */
/**
 * 后端返会数据结构
   {
    "code": 200,
    "success": true,
    "validateErrors": [],
    "data": {
        "pageNum": null,
        "pageSize": null,
        "total": 2,
        "data": [
          {...},
          {...}
        ]
      }
    }
    参数res 是上面的data的值
 */

export const formatData = (res: any = {}) => {
  const { pageNum, pageSize, total, fields, data = [] } = res;
  const firstItem = data[0] || [];
  return {
    title: fields,
    list: data,
    pagination: {
      pageNum: pageNum || 0,
      pageSize: pageSize || 0,
      total: total || 0
    }
  }
}

/**
 * 清楚无效数据
 * @param params 
 */
export const cutInvalidData = (params) => {
  if (params instanceof Object) {
    const result = {}
    const keys = Object.keys(params)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = params[key]

      // 0 咋办，，，@花花
      // if ((typeof value === 'boolean') || value) {
      // why not ???? value != null  ||  value !== trim('')
      if ((typeof value === 'boolean') || value || value === 0) {
        result[key] = value
      }
    }
    return result
  }
  return params
}

export { formatBrandData, formatRegionData, formatChannelData }
