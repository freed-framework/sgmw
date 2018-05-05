/* eslint-disable */
import { format } from './helper'
const nameKeys = ['brandName', 'seriesName', 'seriesClass', 'vehModel']
const childKeys = ['varieties', 'varietySeries', 'seriesModels']

/**
 * 处理品牌，车系，车型数据
 * @param data 后端返会数据中的data
 */
export default (data = []) => {
  return format(data, nameKeys, childKeys)
}
