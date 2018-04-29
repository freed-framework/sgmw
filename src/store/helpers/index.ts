import formatBrandData from './formatBrand'
import formatRegionData from './formatRegion'

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
  const { pageNum, pageSize, total, data = [] } = res;
  const firstItem = data[0] || [];
  return {
    title: Object.keys(firstItem),
    list: data,
    pagination: {
      pageNum: total || 0,
      pageSize: pageSize || 0,
      total: total || 0
    }
  }
}

export { formatBrandData, formatRegionData }
