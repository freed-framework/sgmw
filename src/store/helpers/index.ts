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

const nameKeys = ['brandName', 'seriesName', 'seriesClass', 'vehModel']
const childKeys = ['varieties', 'varietySeries', 'seriesModels']
const resultkeys = ['brand', 'series', 'classes', 'model']
const result = {
  // 品牌
  brand: {
  },
  // 品种
  series: {
  },
  // 车系
  classes: {
  },
  // 车型
  model: {
  }
}
/**
 * 处理品牌，车系，车型数据
 * @param data 后端返会数据中的data
 */
export const formatBrandData = (data = []) => {
  for (let j = 0; j < data.length; j++) {
    const weight = (j + 1) * 100000
    const item = data[j]
    const name = item[nameKeys[0]]
    result['brand'][weight] = name

    formatSeriesData(item[childKeys[0]], weight)
  }
  return result
}

function formatSeriesData(data = [], w) {
  for (let j = 0; j < data.length; j++) {
    const weight = w + (j + 1) * 10000
    const item = data[j]
    const name = item[nameKeys[1]]
    result['series'][weight] = name

    formatClassData(item[childKeys[1]], weight)
  }
}

function formatClassData(data = [], w) {
  for (let j = 0; j < data.length; j++) {
    const weight = w + (j + 1) * 1000
    const item = data[j]
    const name = item[nameKeys[2]]
    result['classes'][weight] = name

    formatModelData(item[childKeys[2]], weight)
  }
}

function formatModelData(data = [], w) {
  for (let j = 0; j < data.length; j++) {
    const weight = w + (j + 1) * 100
    const item = data[j]
    const name = item[nameKeys[3]]
    result['model'][weight] = name
  }
}

// const regionResult

export function formatRegionData(data = []) {

}
