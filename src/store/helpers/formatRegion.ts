
/* eslint-disable */
import { format } from './helper'
const nameKeys = ['region', 'province', 'city', 'county']
const childKeys = ['provinces', 'citys', 'countys']
/**
 * 省市县
 * @param data 后端返会数据中的data
 */
export default (data = []) => {
  return format(data, nameKeys, childKeys)
}

