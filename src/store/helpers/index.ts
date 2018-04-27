/* eslint-disable */
/**
 * 处理数据
 * @param data 后端返会数据中的data
 */
export const formatData = (data = []) => {
  const firstItem = data[0] || [];
  return {
    title: Object.keys(firstItem),
    list: data
  }
}