
/* eslint-disable */
import { format } from './helper'
const nameKeys = ['platform', 'mainChannel', 'partChannel', 'subChannel']
const childKeys = ['mainChannel', 'partChannel', 'subChannel']
/**
 * 平台/主渠道/分渠道/子渠道
 * @param data 后端返会数据中的data
 */
export default (data = []) => {
  return format(data, nameKeys, childKeys)
}

