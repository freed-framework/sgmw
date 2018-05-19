/* eslint-disable */
import { format } from './helper'
const nameKeys = ['brandName', 'varietyName', 'seriesName', 'modelName']
const childKeys = ['varietyKind', 'varietySeries', 'modelList']

/**
 * 处理品牌，车系，车型数据
 * @param data 后端返会数据中的data
 */
export default (data = []) => {
  return format(data, nameKeys, childKeys)
}
