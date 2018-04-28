import { allBrandList, allRegionList } from '../../api'
import { formatBrandData, formatRegionData } from '../helpers'

const ActionType = {
  FETCH_COMMON_BRAND_LIST: 'FETCH_COMMON_BRAND_LIST',
  FETCH_COMMON_REGION_LIST: 'FETCH_COMMON_REGION_LIST',
}

// initial state
const state = {
  brandList: [],
  regionList: []
}

// const mockData = {
//   "code": 200,
//   "success": true,
//   "validateErrors": [],
//   "data": [
//     {
//       "brandName": "宝骏",
//       "varieties": [
//         {
//           "seriesName": "赛弗",
//           "varietySeries": [
//             {
//               "id": 6,
//               "series": "赛弗",
//               "configure": "宝骏510",
//               "seriesClass": "SUV",
//               "brand": "宝骏",
//               "memo": null,
//               "seriesModels": [
//                 {
//                   "id": 68,
//                   "materialNo": "0J00KF5530EC81",
//                   "vehModel": "2003款 2.2L 两驱豪华型",
//                   "seriesId": "6",
//                   "vehColor": "绿色",
//                   "motorModel": null,
//                   "memo": null
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "seriesName": "兰德酷路泽",
//           "varietySeries": [
//             {
//               "id": 45,
//               "series": "兰德酷路泽",
//               "configure": "宝骏510",
//               "seriesClass": "SUV",
//               "brand": "宝骏",
//               "memo": null,
//               "seriesModels": [
//                 {
//                   "id": 115,
//                   "materialNo": "0J00KF5530EC81",
//                   "vehModel": "2005款 4.5L 自动GX",
//                   "seriesId": "45",
//                   "vehColor": "绿色",
//                   "motorModel": null,
//                   "memo": null
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "seriesName": "蒙迪欧",
//           "varietySeries": [
//             {
//               "id": 117,
//               "series": "蒙迪欧",
//               "configure": "宝骏520",
//               "seriesClass": "SUV",
//               "brand": "宝骏",
//               "memo": null,
//               "seriesModels": [
//                 {
//                   "id": 62,
//                   "materialNo": "0J00KF5530EC81",
//                   "vehModel": "2004款 2.0L 尊贵型",
//                   "seriesId": "117",
//                   "vehColor": "绿色",
//                   "motorModel": null,
//                   "memo": null
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "seriesName": "美日",
//           "varietySeries": [
//             {
//               "id": 132,
//               "series": "美日",
//               "configure": "宝骏520",
//               "seriesClass": "SUV",
//               "brand": "宝骏",
//               "memo": null,
//               "seriesModels": [
//                 {
//                   "id": 66,
//                   "materialNo": "0J00KF5530EC81",
//                   "vehModel": "2004款 美日之星 1.3L 舒适型",
//                   "seriesId": "132",
//                   "vehColor": "绿色",
//                   "motorModel": null,
//                   "memo": null
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "brandName": "红旗",
//       "varieties": [
//         {
//           "seriesName": "千里马",
//           "varietySeries": [
//             {
//               "id": 142,
//               "series": "千里马",
//               "configure": "红旗120",
//               "seriesClass": "SUV",
//               "brand": "红旗",
//               "memo": null,
//               "seriesModels": [
//                 {
//                   "id": 18,
//                   "materialNo": "0J00KF5530EC81",
//                   "vehModel": "2004款 1.3L AT",
//                   "seriesId": "142",
//                   "vehColor": "绿色",
//                   "motorModel": null,
//                   "memo": null
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "seriesName": "乐驰",
//           "varietySeries": [
//             {
//               "id": 155,
//               "series": "乐驰",
//               "configure": "红旗120",
//               "seriesClass": "SUV",
//               "brand": "红旗",
//               "memo": null,
//               "seriesModels": [
//                 {
//                   "id": 61,
//                   "materialNo": "0J00KF5530EC81",
//                   "vehModel": "2004款 0.8L 手动",
//                   "seriesId": "155",
//                   "vehColor": "绿色",
//                   "motorModel": null,
//                   "memo": null
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "seriesName": "标致206(进口)",
//           "varietySeries": [
//             {
//               "id": 184,
//               "series": "标致206(进口)",
//               "configure": "红旗110",
//               "seriesClass": "轿车",
//               "brand": "红旗",
//               "memo": null,
//               "seriesModels": [
//                 {
//                   "id": 41,
//                   "materialNo": "0J00KF5530EC81",
//                   "vehModel": "2004款 206CC 1.6",
//                   "seriesId": "184",
//                   "vehColor": "绿色",
//                   "motorModel": null,
//                   "memo": null
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "seriesName": "标致407",
//           "varietySeries": [
//             {
//               "id": 185,
//               "series": "标致407",
//               "configure": "红旗130",
//               "seriesClass": "轿车",
//               "brand": "红旗",
//               "memo": null,
//               "seriesModels": [
//                 {
//                   "id": 60,
//                   "materialNo": "0J00KF5530EC81",
//                   "vehModel": "2004款 SV 2.0",
//                   "seriesId": "185",
//                   "vehColor": "绿色",
//                   "motorModel": null,
//                   "memo": null
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "seriesName": "标致607",
//           "varietySeries": [
//             {
//               "id": 186,
//               "series": "标致607",
//               "configure": "红旗130",
//               "seriesClass": "轿车",
//               "brand": "红旗",
//               "memo": null,
//               "seriesModels": [
//                 {
//                   "id": 40,
//                   "materialNo": "0J00KF5530EC81",
//                   "vehModel": "2004款 3.0",
//                   "seriesId": "186",
//                   "vehColor": "绿色",
//                   "motorModel": null,
//                   "memo": null
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ],
//   "displayMessage": "",
//   "validateError": false
// }


const actions = {
  async getBrandList({ commit }) {
    const result = await allBrandList()
    const payload: any = { ...result }

    commit(ActionType.FETCH_COMMON_BRAND_LIST, payload)
  },
  async getRegionList({ commit }) {
    const result = await allRegionList()
    const payload: any = { ...result }

    commit(ActionType.FETCH_COMMON_REGION_LIST, payload)
  },
}

const mutations = {
  [ActionType.FETCH_COMMON_BRAND_LIST](state: any, payload: any) {
    const { data = [] } = payload
    state.brandList = formatBrandData(data)
  },
  [ActionType.FETCH_COMMON_REGION_LIST](state: any, payload: any) {
    const { data = [] } = payload
    state.regionList = formatRegionData(data)
  },
}

const getters = {
  brandList(state) {
    const { brandList = [] } = state
    return brandList
  },
  regionList(state) {
    const { regionList = [] } = state

    return regionList
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
