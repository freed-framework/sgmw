/* eslint-disable */
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

const mockRegion = {
  "code": 200,
  "success": true,
  "validateErrors": [],
  "data": [
      {
          "region": "中南区域",
          "regId": 2,
          "provinces": [
              {
                  "province": "安徽省",
                  "citys": [
                      {
                          "city": "安庆市",
                          "countys": [
                              {
                                  "county": "大观区"
                              },
                              {
                                  "county": "怀宁县"
                              },
                              {
                                  "county": "潜山县"
                              },
                              {
                                  "county": "宿松县"
                              },
                              {
                                  "county": "太湖县"
                              },
                              {
                                  "county": "桐城市"
                              },
                              {
                                  "county": "望江县"
                              },
                              {
                                  "county": "宜秀区"
                              },
                              {
                                  "county": "迎江区"
                              },
                              {
                                  "county": "岳西县"
                              }
                          ]
                      },
                      {
                          "city": "蚌埠市",
                          "countys": [
                              {
                                  "county": "蚌山区"
                              },
                              {
                                  "county": "固镇县"
                              },
                              {
                                  "county": "怀远县"
                              },
                              {
                                  "county": "淮上区"
                              },
                              {
                                  "county": "龙子湖区"
                              },
                              {
                                  "county": "五河县"
                              },
                              {
                                  "county": "禹会区"
                              }
                          ]
                      },
                      {
                          "city": "亳州市",
                          "countys": [
                              {
                                  "county": "利辛县"
                              },
                              {
                                  "county": "蒙城县"
                              },
                              {
                                  "county": "谯城区"
                              },
                              {
                                  "county": "涡阳县"
                              }
                          ]
                      },
                      {
                          "city": "池州市",
                          "countys": [
                              {
                                  "county": "东至县"
                              },
                              {
                                  "county": "贵池区"
                              },
                              {
                                  "county": "青阳县"
                              },
                              {
                                  "county": "石台县"
                              }
                          ]
                      },
                      {
                          "city": "滁州市",
                          "countys": [
                              {
                                  "county": "定远县"
                              },
                              {
                                  "county": "凤阳县"
                              },
                              {
                                  "county": "来安县"
                              },
                              {
                                  "county": "琅琊区"
                              },
                              {
                                  "county": "明光市"
                              },
                              {
                                  "county": "南谯区"
                              },
                              {
                                  "county": "全椒县"
                              },
                              {
                                  "county": "天长市"
                              }
                          ]
                      },
                      {
                          "city": "阜阳市",
                          "countys": [
                              {
                                  "county": "阜南县"
                              },
                              {
                                  "county": "界首市"
                              },
                              {
                                  "county": "临泉县"
                              },
                              {
                                  "county": "太和县"
                              },
                              {
                                  "county": "颍东区"
                              },
                              {
                                  "county": "颍泉区"
                              },
                              {
                                  "county": "颍上县"
                              },
                              {
                                  "county": "颍州区"
                              }
                          ]
                      },
                      {
                          "city": "合肥市",
                          "countys": [
                              {
                                  "county": "包河区"
                              },
                              {
                                  "county": "长丰县"
                              },
                              {
                                  "county": "巢湖市"
                              },
                              {
                                  "county": "肥东县"
                              },
                              {
                                  "county": "肥西县"
                              },
                              {
                                  "county": "庐江县"
                              },
                              {
                                  "county": "庐阳区"
                              },
                              {
                                  "county": "蜀山区"
                              },
                              {
                                  "county": "瑶海区"
                              }
                          ]
                      },
                      {
                          "city": "淮北市",
                          "countys": [
                              {
                                  "county": "杜集区"
                              },
                              {
                                  "county": "烈山区"
                              },
                              {
                                  "county": "濉溪县"
                              },
                              {
                                  "county": "相山区"
                              }
                          ]
                      },
                      {
                          "city": "淮南市",
                          "countys": [
                              {
                                  "county": "八公山区"
                              },
                              {
                                  "county": "大通区"
                              },
                              {
                                  "county": "凤台县"
                              },
                              {
                                  "county": "潘集区"
                              },
                              {
                                  "county": "寿县"
                              },
                              {
                                  "county": "田家庵区"
                              },
                              {
                                  "county": "谢家集区"
                              }
                          ]
                      },
                      {
                          "city": "黄山市",
                          "countys": [
                              {
                                  "county": "黄山区"
                              },
                              {
                                  "county": "徽州区"
                              },
                              {
                                  "county": "祁门县"
                              },
                              {
                                  "county": "屯溪区"
                              },
                              {
                                  "county": "歙县"
                              },
                              {
                                  "county": "休宁县"
                              },
                              {
                                  "county": "黟县"
                              }
                          ]
                      },
                      {
                          "city": "六安市",
                          "countys": [
                              {
                                  "county": "霍邱县"
                              },
                              {
                                  "county": "霍山县"
                              },
                              {
                                  "county": "金安区"
                              },
                              {
                                  "county": "金寨县"
                              },
                              {
                                  "county": "舒城县"
                              },
                              {
                                  "county": "叶集区"
                              },
                              {
                                  "county": "裕安区"
                              }
                          ]
                      },
                      {
                          "city": "马鞍山市",
                          "countys": [
                              {
                                  "county": "博望区"
                              },
                              {
                                  "county": "当涂县"
                              },
                              {
                                  "county": "含山县"
                              },
                              {
                                  "county": "和县"
                              },
                              {
                                  "county": "花山区"
                              },
                              {
                                  "county": "金家庄区"
                              },
                              {
                                  "county": "雨山区"
                              }
                          ]
                      },
                      {
                          "city": "宿州市",
                          "countys": [
                              {
                                  "county": "砀山县"
                              },
                              {
                                  "county": "灵璧县"
                              },
                              {
                                  "county": "泗县"
                              },
                              {
                                  "county": "萧县"
                              },
                              {
                                  "county": "埇桥区"
                              }
                          ]
                      },
                      {
                          "city": "铜陵市",
                          "countys": [
                              {
                                  "county": "枞阳县"
                              },
                              {
                                  "county": "郊区"
                              },
                              {
                                  "county": "狮子山区"
                              },
                              {
                                  "county": "铜官区"
                              },
                              {
                                  "county": "义安区"
                              }
                          ]
                      },
                      {
                          "city": "芜湖市",
                          "countys": [
                              {
                                  "county": "繁昌县"
                              },
                              {
                                  "county": "镜湖区"
                              },
                              {
                                  "county": "鸠江区"
                              },
                              {
                                  "county": "南陵县"
                              },
                              {
                                  "county": "三山区"
                              },
                              {
                                  "county": "无为县"
                              },
                              {
                                  "county": "芜湖县"
                              },
                              {
                                  "county": "弋江区"
                              }
                          ]
                      },
                      {
                          "city": "宣城市",
                          "countys": [
                              {
                                  "county": "广德县"
                              },
                              {
                                  "county": "绩溪县"
                              },
                              {
                                  "county": "泾县"
                              },
                              {
                                  "county": "旌德县"
                              },
                              {
                                  "county": "郎溪县"
                              },
                              {
                                  "county": "宁国市"
                              },
                              {
                                  "county": "宣州区"
                              }
                          ]
                      }
                  ]
              },
              {
                  "province": "湖北省",
                  "citys": [
                      {
                          "city": "鄂州市",
                          "countys": [
                              {
                                  "county": "鄂城区"
                              },
                              {
                                  "county": "华容区"
                              },
                              {
                                  "county": "梁子湖区"
                              }
                          ]
                      },
                      {
                          "city": "恩施土家族苗族自治州",
                          "countys": [
                              {
                                  "county": "巴东县"
                              },
                              {
                                  "county": "恩施市"
                              },
                              {
                                  "county": "鹤峰县"
                              },
                              {
                                  "county": "建始县"
                              },
                              {
                                  "county": "来凤县"
                              },
                              {
                                  "county": "利川市"
                              },
                              {
                                  "county": "咸丰县"
                              },
                              {
                                  "county": "宣恩县"
                              }
                          ]
                      },
                      {
                          "city": "黄冈市",
                          "countys": [
                              {
                                  "county": "红安县"
                              },
                              {
                                  "county": "黄梅县"
                              },
                              {
                                  "county": "黄州区"
                              },
                              {
                                  "county": "罗田县"
                              },
                              {
                                  "county": "麻城市"
                              },
                              {
                                  "county": "蕲春县"
                              },
                              {
                                  "county": "团风县"
                              },
                              {
                                  "county": "武穴市"
                              },
                              {
                                  "county": "浠水县"
                              },
                              {
                                  "county": "英山县"
                              }
                          ]
                      },
                      {
                          "city": "黄石市",
                          "countys": [
                              {
                                  "county": "大冶市"
                              },
                              {
                                  "county": "黄石港区"
                              },
                              {
                                  "county": "铁山区"
                              },
                              {
                                  "county": "团城山开发区"
                              },
                              {
                                  "county": "西塞山区"
                              },
                              {
                                  "county": "下陆区"
                              },
                              {
                                  "county": "阳新县"
                              }
                          ]
                      },
                      {
                          "city": "荆门市",
                          "countys": [
                              {
                                  "county": "东宝区"
                              },
                              {
                                  "county": "掇刀区"
                              },
                              {
                                  "county": "京山县"
                              },
                              {
                                  "county": "沙洋县"
                              },
                              {
                                  "county": "钟祥市"
                              }
                          ]
                      },
                      {
                          "city": "荆州市",
                          "countys": [
                              {
                                  "county": "公安县"
                              },
                              {
                                  "county": "洪湖市"
                              },
                              {
                                  "county": "监利县"
                              },
                              {
                                  "county": "江陵县"
                              },
                              {
                                  "county": "荆州区"
                              },
                              {
                                  "county": "沙市区"
                              },
                              {
                                  "county": "石首市"
                              },
                              {
                                  "county": "松滋市"
                              }
                          ]
                      },
                      {
                          "city": "潜江市",
                          "countys": [
                              {
                                  "county": "潜江市"
                              }
                          ]
                      },
                      {
                          "city": "神农架林区",
                          "countys": [
                              {
                                  "county": "神农架林区"
                              }
                          ]
                      },
                      {
                          "city": "十堰市",
                          "countys": [
                              {
                                  "county": "丹江口市"
                              },
                              {
                                  "county": "房县"
                              },
                              {
                                  "county": "茅箭区"
                              },
                              {
                                  "county": "郧西县"
                              },
                              {
                                  "county": "郧阳区"
                              },
                              {
                                  "county": "张湾区"
                              },
                              {
                                  "county": "竹山县"
                              },
                              {
                                  "county": "竹溪县"
                              }
                          ]
                      },
                      {
                          "city": "随州市",
                          "countys": [
                              {
                                  "county": "广水市"
                              },
                              {
                                  "county": "随县"
                              },
                              {
                                  "county": "曾都区"
                              }
                          ]
                      },
                      {
                          "city": "天门市",
                          "countys": [
                              {
                                  "county": "天门市"
                              }
                          ]
                      },
                      {
                          "city": "武汉市",
                          "countys": [
                              {
                                  "county": "蔡甸区"
                              },
                              {
                                  "county": "东西湖区"
                              },
                              {
                                  "county": "汉南区"
                              },
                              {
                                  "county": "汉阳区"
                              },
                              {
                                  "county": "洪山区"
                              },
                              {
                                  "county": "黄陂区"
                              },
                              {
                                  "county": "江岸区"
                              },
                              {
                                  "county": "江汉区"
                              },
                              {
                                  "county": "江夏区"
                              },
                              {
                                  "county": "硚口区"
                              },
                              {
                                  "county": "青山区"
                              },
                              {
                                  "county": "武昌区"
                              },
                              {
                                  "county": "新洲区"
                              }
                          ]
                      },
                      {
                          "city": "仙桃市",
                          "countys": [
                              {
                                  "county": "仙桃市"
                              }
                          ]
                      },
                      {
                          "city": "咸宁市",
                          "countys": [
                              {
                                  "county": "赤壁市"
                              },
                              {
                                  "county": "崇阳县"
                              },
                              {
                                  "county": "嘉鱼县"
                              },
                              {
                                  "county": "通城县"
                              },
                              {
                                  "county": "通山县"
                              },
                              {
                                  "county": "咸安区"
                              }
                          ]
                      },
                      {
                          "city": "襄阳市",
                          "countys": [
                              {
                                  "county": "保康县"
                              },
                              {
                                  "county": "樊城区"
                              },
                              {
                                  "county": "谷城县"
                              },
                              {
                                  "county": "老河口市"
                              },
                              {
                                  "county": "南漳县"
                              },
                              {
                                  "county": "襄城区"
                              },
                              {
                                  "county": "襄州区"
                              },
                              {
                                  "county": "宜城市"
                              },
                              {
                                  "county": "枣阳市"
                              }
                          ]
                      },
                      {
                          "city": "孝感市",
                          "countys": [
                              {
                                  "county": "安陆市"
                              },
                              {
                                  "county": "大悟县"
                              },
                              {
                                  "county": "汉川市"
                              },
                              {
                                  "county": "孝昌县"
                              },
                              {
                                  "county": "孝南区"
                              },
                              {
                                  "county": "应城市"
                              },
                              {
                                  "county": "云梦县"
                              }
                          ]
                      },
                      {
                          "city": "宜昌市",
                          "countys": [
                              {
                                  "county": "长阳土家族自治县"
                              },
                              {
                                  "county": "当阳市"
                              },
                              {
                                  "county": "点军区"
                              },
                              {
                                  "county": "五峰土家族自治县"
                              },
                              {
                                  "county": "伍家岗区"
                              },
                              {
                                  "county": "西陵区"
                              },
                              {
                                  "county": "猇亭区"
                              },
                              {
                                  "county": "兴山县"
                              },
                              {
                                  "county": "夷陵区"
                              },
                              {
                                  "county": "宜都市"
                              },
                              {
                                  "county": "远安县"
                              },
                              {
                                  "county": "枝江市"
                              },
                              {
                                  "county": "秭归县"
                              }
                          ]
                      }
                  ]
              },
              {
                  "province": "湖南省",
                  "citys": [
                      {
                          "city": "长沙市",
                          "countys": [
                              {
                                  "county": "长沙县"
                              },
                              {
                                  "county": "芙蓉区"
                              },
                              {
                                  "county": "开福区"
                              },
                              {
                                  "county": "浏阳市"
                              },
                              {
                                  "county": "宁乡县"
                              },
                              {
                                  "county": "天心区"
                              },
                              {
                                  "county": "望城区"
                              },
                              {
                                  "county": "雨花区"
                              },
                              {
                                  "county": "岳麓区"
                              }
                          ]
                      },
                      {
                          "city": "常德市",
                          "countys": [
                              {
                                  "county": "安乡县"
                              },
                              {
                                  "county": "鼎城区"
                              },
                              {
                                  "county": "汉寿县"
                              },
                              {
                                  "county": "津市市"
                              },
                              {
                                  "county": "澧县"
                              },
                              {
                                  "county": "临澧县"
                              },
                              {
                                  "county": "石门县"
                              },
                              {
                                  "county": "桃源县"
                              },
                              {
                                  "county": "武陵区"
                              }
                          ]
                      },
                      {
                          "city": "郴州市",
                          "countys": [
                              {
                                  "county": "安仁县"
                              },
                              {
                                  "county": "北湖区"
                              },
                              {
                                  "county": "桂东县"
                              },
                              {
                                  "county": "桂阳县"
                              },
                              {
                                  "county": "嘉禾县"
                              },
                              {
                                  "county": "临武县"
                              },
                              {
                                  "county": "汝城县"
                              },
                              {
                                  "county": "苏仙区"
                              },
                              {
                                  "county": "宜章县"
                              },
                              {
                                  "county": "永兴县"
                              },
                              {
                                  "county": "资兴市"
                              }
                          ]
                      },
                      {
                          "city": "衡阳市",
                          "countys": [
                              {
                                  "county": "常宁市"
                              },
                              {
                                  "county": "衡东县"
                              },
                              {
                                  "county": "衡南县"
                              },
                              {
                                  "county": "衡山县"
                              },
                              {
                                  "county": "衡阳县"
                              },
                              {
                                  "county": "耒阳市"
                              },
                              {
                                  "county": "南岳区"
                              },
                              {
                                  "county": "祁东县"
                              },
                              {
                                  "county": "石鼓区"
                              },
                              {
                                  "county": "雁峰区"
                              },
                              {
                                  "county": "蒸湘区"
                              },
                              {
                                  "county": "珠晖区"
                              }
                          ]
                      },
                      {
                          "city": "怀化市",
                          "countys": [
                              {
                                  "county": "辰溪县"
                              },
                              {
                                  "county": "鹤城区"
                              },
                              {
                                  "county": "洪江市"
                              },
                              {
                                  "county": "会同县"
                              },
                              {
                                  "county": "靖州苗族侗族自治县"
                              },
                              {
                                  "county": "麻阳苗族自治县"
                              },
                              {
                                  "county": "通道侗族自治县"
                              },
                              {
                                  "county": "新晃侗族自治县"
                              },
                              {
                                  "county": "溆浦县"
                              },
                              {
                                  "county": "沅陵县"
                              },
                              {
                                  "county": "芷江侗族自治县"
                              },
                              {
                                  "county": "中方县"
                              }
                          ]
                      },
                      {
                          "city": "娄底市",
                          "countys": [
                              {
                                  "county": "冷水江市"
                              },
                              {
                                  "county": "涟源市"
                              },
                              {
                                  "county": "娄星区"
                              },
                              {
                                  "county": "双峰县"
                              },
                              {
                                  "county": "新化县"
                              }
                          ]
                      },
                      {
                          "city": "邵阳市",
                          "countys": [
                              {
                                  "county": "北塔区"
                              },
                              {
                                  "county": "城步苗族自治县"
                              },
                              {
                                  "county": "大祥区"
                              },
                              {
                                  "county": "洞口县"
                              },
                              {
                                  "county": "隆回县"
                              },
                              {
                                  "county": "邵东县"
                              },
                              {
                                  "county": "邵阳县"
                              },
                              {
                                  "county": "双清区"
                              },
                              {
                                  "county": "绥宁县"
                              },
                              {
                                  "county": "武冈市"
                              },
                              {
                                  "county": "新宁县"
                              },
                              {
                                  "county": "新邵县"
                              }
                          ]
                      },
                      {
                          "city": "湘潭市",
                          "countys": [
                              {
                                  "county": "韶山市"
                              },
                              {
                                  "county": "湘潭县"
                              },
                              {
                                  "county": "湘乡市"
                              },
                              {
                                  "county": "雨湖区"
                              },
                              {
                                  "county": "岳塘区"
                              }
                          ]
                      },
                      {
                          "city": "湘西土家族苗族自治州",
                          "countys": [
                              {
                                  "county": "保靖县"
                              },
                              {
                                  "county": "凤凰县"
                              },
                              {
                                  "county": "古丈县"
                              },
                              {
                                  "county": "花垣县"
                              },
                              {
                                  "county": "吉首市"
                              },
                              {
                                  "county": "龙山县"
                              },
                              {
                                  "county": "泸溪县"
                              },
                              {
                                  "county": "永顺县"
                              }
                          ]
                      },
                      {
                          "city": "益阳市",
                          "countys": [
                              {
                                  "county": "安化县"
                              },
                              {
                                  "county": "赫山区"
                              },
                              {
                                  "county": "南县"
                              },
                              {
                                  "county": "桃江县"
                              },
                              {
                                  "county": "沅江市"
                              },
                              {
                                  "county": "资阳区"
                              }
                          ]
                      },
                      {
                          "city": "永州市",
                          "countys": [
                              {
                                  "county": "道县"
                              },
                              {
                                  "county": "东安县"
                              },
                              {
                                  "county": "江华瑶族自治县"
                              },
                              {
                                  "county": "江永县"
                              },
                              {
                                  "county": "蓝山县"
                              },
                              {
                                  "county": "冷水滩区"
                              },
                              {
                                  "county": "零陵区"
                              },
                              {
                                  "county": "宁远县"
                              },
                              {
                                  "county": "祁阳县"
                              },
                              {
                                  "county": "双牌县"
                              },
                              {
                                  "county": "新田县"
                              }
                          ]
                      },
                      {
                          "city": "岳阳市",
                          "countys": [
                              {
                                  "county": "华容县"
                              },
                              {
                                  "county": "君山区"
                              },
                              {
                                  "county": "临湘市"
                              },
                              {
                                  "county": "汨罗市"
                              },
                              {
                                  "county": "平江县"
                              },
                              {
                                  "county": "湘阴县"
                              },
                              {
                                  "county": "岳阳楼区"
                              },
                              {
                                  "county": "岳阳县"
                              },
                              {
                                  "county": "云溪区"
                              }
                          ]
                      },
                      {
                          "city": "张家界市",
                          "countys": [
                              {
                                  "county": "慈利县"
                              },
                              {
                                  "county": "桑植县"
                              },
                              {
                                  "county": "武陵源区"
                              },
                              {
                                  "county": "永定区"
                              }
                          ]
                      },
                      {
                          "city": "株洲市",
                          "countys": [
                              {
                                  "county": "茶陵县"
                              },
                              {
                                  "county": "荷塘区"
                              },
                              {
                                  "county": "醴陵市"
                              },
                              {
                                  "county": "芦淞区"
                              },
                              {
                                  "county": "石峰区"
                              },
                              {
                                  "county": "天元区"
                              },
                              {
                                  "county": "炎陵县"
                              },
                              {
                                  "county": "攸县"
                              },
                              {
                                  "county": "株洲县"
                              }
                          ]
                      }
                  ]
              },
              {
                  "province": "江西省",
                  "citys": [
                      {
                          "city": "抚州市",
                          "countys": [
                              {
                                  "county": "崇仁县"
                              },
                              {
                                  "county": "东乡县"
                              },
                              {
                                  "county": "广昌县"
                              },
                              {
                                  "county": "金溪县"
                              },
                              {
                                  "county": "乐安县"
                              },
                              {
                                  "county": "黎川县"
                              },
                              {
                                  "county": "临川区"
                              },
                              {
                                  "county": "南城县"
                              },
                              {
                                  "county": "南丰县"
                              },
                              {
                                  "county": "宜黄县"
                              },
                              {
                                  "county": "资溪县"
                              }
                          ]
                      },
                      {
                          "city": "赣州市",
                          "countys": [
                              {
                                  "county": "安远县"
                              },
                              {
                                  "county": "崇义县"
                              },
                              {
                                  "county": "大余县"
                              },
                              {
                                  "county": "定南县"
                              },
                              {
                                  "county": "赣县"
                              },
                              {
                                  "county": "会昌县"
                              },
                              {
                                  "county": "龙南县"
                              },
                              {
                                  "county": "南康区"
                              },
                              {
                                  "county": "宁都县"
                              },
                              {
                                  "county": "全南县"
                              },
                              {
                                  "county": "瑞金市"
                              },
                              {
                                  "county": "上犹县"
                              },
                              {
                                  "county": "石城县"
                              },
                              {
                                  "county": "信丰县"
                              },
                              {
                                  "county": "兴国县"
                              },
                              {
                                  "county": "寻乌县"
                              },
                              {
                                  "county": "于都县"
                              },
                              {
                                  "county": "章贡区"
                              }
                          ]
                      },
                      {
                          "city": "吉安市",
                          "countys": [
                              {
                                  "county": "安福县"
                              },
                              {
                                  "county": "吉安县"
                              },
                              {
                                  "county": "吉水县"
                              },
                              {
                                  "county": "吉州区"
                              },
                              {
                                  "county": "井冈山市"
                              },
                              {
                                  "county": "青原区"
                              },
                              {
                                  "county": "遂川县"
                              },
                              {
                                  "county": "泰和县"
                              },
                              {
                                  "county": "万安县"
                              },
                              {
                                  "county": "峡江县"
                              },
                              {
                                  "county": "新干县"
                              },
                              {
                                  "county": "永丰县"
                              },
                              {
                                  "county": "永新县"
                              }
                          ]
                      },
                      {
                          "city": "景德镇市",
                          "countys": [
                              {
                                  "county": "昌江区"
                              },
                              {
                                  "county": "浮梁县"
                              },
                              {
                                  "county": "乐平市"
                              },
                              {
                                  "county": "珠山区"
                              }
                          ]
                      },
                      {
                          "city": "九江市",
                          "countys": [
                              {
                                  "county": "德安县"
                              },
                              {
                                  "county": "都昌县"
                              },
                              {
                                  "county": "共青城市"
                              },
                              {
                                  "county": "湖口县"
                              },
                              {
                                  "county": "九江县"
                              },
                              {
                                  "county": "庐山区"
                              },
                              {
                                  "county": "彭泽县"
                              },
                              {
                                  "county": "瑞昌市"
                              },
                              {
                                  "county": "武宁县"
                              },
                              {
                                  "county": "星子县"
                              },
                              {
                                  "county": "修水县"
                              },
                              {
                                  "county": "浔阳区"
                              },
                              {
                                  "county": "永修县"
                              }
                          ]
                      },
                      {
                          "city": "南昌市",
                          "countys": [
                              {
                                  "county": "安义县"
                              },
                              {
                                  "county": "东湖区"
                              },
                              {
                                  "county": "进贤县"
                              },
                              {
                                  "county": "南昌县"
                              },
                              {
                                  "county": "青山湖区"
                              },
                              {
                                  "county": "青云谱区"
                              },
                              {
                                  "county": "湾里区"
                              },
                              {
                                  "county": "西湖区"
                              },
                              {
                                  "county": "新建区"
                              }
                          ]
                      },
                      {
                          "city": "萍乡市",
                          "countys": [
                              {
                                  "county": "安源区"
                              },
                              {
                                  "county": "莲花县"
                              },
                              {
                                  "county": "芦溪县"
                              },
                              {
                                  "county": "上栗县"
                              },
                              {
                                  "county": "湘东区"
                              }
                          ]
                      },
                      {
                          "city": "上饶市",
                          "countys": [
                              {
                                  "county": "德兴市"
                              },
                              {
                                  "county": "广丰区"
                              },
                              {
                                  "county": "横峰县"
                              },
                              {
                                  "county": "鄱阳县"
                              },
                              {
                                  "county": "铅山县"
                              },
                              {
                                  "county": "上饶县"
                              },
                              {
                                  "county": "万年县"
                              },
                              {
                                  "county": "婺源县"
                              },
                              {
                                  "county": "信州区"
                              },
                              {
                                  "county": "弋阳县"
                              },
                              {
                                  "county": "余干县"
                              },
                              {
                                  "county": "玉山县"
                              }
                          ]
                      },
                      {
                          "city": "新余市",
                          "countys": [
                              {
                                  "county": "分宜县"
                              },
                              {
                                  "county": "渝水区"
                              }
                          ]
                      },
                      {
                          "city": "宜春市",
                          "countys": [
                              {
                                  "county": "丰城市"
                              },
                              {
                                  "county": "奉新县"
                              },
                              {
                                  "county": "高安市"
                              },
                              {
                                  "county": "靖安县"
                              },
                              {
                                  "county": "上高县"
                              },
                              {
                                  "county": "铜鼓县"
                              },
                              {
                                  "county": "万载县"
                              },
                              {
                                  "county": "宜丰县"
                              },
                              {
                                  "county": "袁州区"
                              },
                              {
                                  "county": "樟树市"
                              }
                          ]
                      },
                      {
                          "city": "鹰潭市",
                          "countys": [
                              {
                                  "county": "贵溪市"
                              },
                              {
                                  "county": "余江县"
                              },
                              {
                                  "county": "月湖区"
                              }
                          ]
                      }
                  ]
              }
          ]
      },
      {
          "region": "华北区域",
          "regId": 7,
          "provinces": [
              {
                  "province": "北京市",
                  "citys": [
                      {
                          "city": "北京市",
                          "countys": [
                              {
                                  "county": "昌平区"
                              },
                              {
                                  "county": "朝阳区"
                              },
                              {
                                  "county": "崇文区"
                              },
                              {
                                  "county": "大兴区"
                              },
                              {
                                  "county": "东城区"
                              },
                              {
                                  "county": "房山区"
                              },
                              {
                                  "county": "丰台区"
                              },
                              {
                                  "county": "海淀区"
                              },
                              {
                                  "county": "怀柔区"
                              },
                              {
                                  "county": "门头沟区"
                              },
                              {
                                  "county": "密云区"
                              },
                              {
                                  "county": "平谷区"
                              },
                              {
                                  "county": "石景山区"
                              },
                              {
                                  "county": "顺义区"
                              },
                              {
                                  "county": "通县"
                              },
                              {
                                  "county": "通州区"
                              },
                              {
                                  "county": "西城区"
                              },
                              {
                                  "county": "宣武区"
                              },
                              {
                                  "county": "延庆区"
                              }
                          ]
                      }
                  ]
              },
              {
                  "province": "河北省",
                  "citys": [
                      {
                          "city": "保定市",
                          "countys": [
                              {
                                  "county": "安国市"
                              },
                              {
                                  "county": "安新县"
                              },
                              {
                                  "county": "博野县"
                              },
                              {
                                  "county": "定兴县"
                              },
                              {
                                  "county": "定州市"
                              },
                              {
                                  "county": "阜平县"
                              },
                              {
                                  "county": "高碑店市"
                              },
                              {
                                  "county": "高阳县"
                              },
                              {
                                  "county": "竞秀区"
                              },
                              {
                                  "county": "涞水县"
                              },
                              {
                                  "county": "涞源县"
                              },
                              {
                                  "county": "蠡县"
                              },
                              {
                                  "county": "莲池区"
                              },
                              {
                                  "county": "满城区"
                              },
                              {
                                  "county": "南市区"
                              },
                              {
                                  "county": "清苑区"
                              },
                              {
                                  "county": "曲阳县"
                              },
                              {
                                  "county": "容城县"
                              },
                              {
                                  "county": "顺平县"
                              },
                              {
                                  "county": "唐县"
                              },
                              {
                                  "county": "望都县"
                              },
                              {
                                  "county": "雄县"
                              },
                              {
                                  "county": "徐水区"
                              },
                              {
                                  "county": "易县"
                              },
                              {
                                  "county": "涿州市"
                              }
                          ]
                      },
                      {
                          "city": "沧州市",
                          "countys": [
                              {
                                  "county": "泊头市"
                              },
                              {
                                  "county": "沧县"
                              },
                              {
                                  "county": "东光县"
                              },
                              {
                                  "county": "海兴县"
                              },
                              {
                                  "county": "河间市"
                              },
                              {
                                  "county": "黄骅市"
                              },
                              {
                                  "county": "孟村回族自治县"
                              },
                              {
                                  "county": "南皮县"
                              },
                              {
                                  "county": "青县"
                              },
                              {
                                  "county": "任丘市"
                              },
                              {
                                  "county": "肃宁县"
                              },
                              {
                                  "county": "吴桥县"
                              },
                              {
                                  "county": "献县"
                              },
                              {
                                  "county": "新华区"
                              },
                              {
                                  "county": "盐山县"
                              },
                              {
                                  "county": "运河区"
                              }
                          ]
                      },
                      {
                          "city": "承德市",
                          "countys": [
                              {
                                  "county": "承德县"
                              },
                              {
                                  "county": "丰宁满族自治县"
                              },
                              {
                                  "county": "宽城满族自治县"
                              },
                              {
                                  "county": "隆化县"
                              },
                              {
                                  "county": "滦平县"
                              },
                              {
                                  "county": "平泉县"
                              },
                              {
                                  "county": "双滦区"
                              },
                              {
                                  "county": "双桥区"
                              },
                              {
                                  "county": "围场满族蒙古族自治县"
                              },
                              {
                                  "county": "兴隆县"
                              },
                              {
                                  "county": "鹰手营子矿区"
                              }
                          ]
                      },
                      {
                          "city": "邯郸市",
                          "countys": [
                              {
                                  "county": "成安县"
                              },
                              {
                                  "county": "磁县"
                              },
                              {
                                  "county": "丛台区"
                              },
                              {
                                  "county": "大名县"
                              },
                              {
                                  "county": "肥乡县"
                              },
                              {
                                  "county": "峰峰矿区"
                              },
                              {
                                  "county": "复兴区"
                              },
                              {
                                  "county": "馆陶县"
                              },
                              {
                                  "county": "广平县"
                              },
                              {
                                  "county": "邯郸县"
                              },
                              {
                                  "county": "邯山区"
                              },
                              {
                                  "county": "鸡泽县"
                              },
                              {
                                  "county": "临漳县"
                              },
                              {
                                  "county": "邱县"
                              },
                              {
                                  "county": "曲周县"
                              },
                              {
                                  "county": "涉县"
                              },
                              {
                                  "county": "魏县"
                              },
                              {
                                  "county": "武安市"
                              },
                              {
                                  "county": "永年县"
                              }
                          ]
                      },
                      {
                          "city": "衡水市",
                          "countys": [
                              {
                                  "county": "安平县"
                              },
                              {
                                  "county": "阜城县"
                              },
                              {
                                  "county": "故城县"
                              },
                              {
                                  "county": "冀州市"
                              },
                              {
                                  "county": "景县"
                              },
                              {
                                  "county": "饶阳县"
                              },
                              {
                                  "county": "深州市"
                              },
                              {
                                  "county": "桃城区"
                              },
                              {
                                  "county": "武强县"
                              },
                              {
                                  "county": "武邑县"
                              },
                              {
                                  "county": "枣强县"
                              }
                          ]
                      },
                      {
                          "city": "廊坊市",
                          "countys": [
                              {
                                  "county": "安次区"
                              },
                              {
                                  "county": "霸州市"
                              },
                              {
                                  "county": "大厂回族自治县"
                              },
                              {
                                  "county": "大城县"
                              },
                              {
                                  "county": "固安县"
                              },
                              {
                                  "county": "广阳区"
                              },
                              {
                                  "county": "三河市"
                              },
                              {
                                  "county": "文安县"
                              },
                              {
                                  "county": "香河县"
                              },
                              {
                                  "county": "永清县"
                              }
                          ]
                      },
                      {
                          "city": "秦皇岛市",
                          "countys": [
                              {
                                  "county": "北戴河区"
                              },
                              {
                                  "county": "昌黎县"
                              },
                              {
                                  "county": "抚宁区"
                              },
                              {
                                  "county": "海港区"
                              },
                              {
                                  "county": "经济技术开发区"
                              },
                              {
                                  "county": "卢龙县"
                              },
                              {
                                  "county": "青龙满族自治县"
                              },
                              {
                                  "county": "山海关区"
                              }
                          ]
                      },
                      {
                          "city": "石家庄市",
                          "countys": [
                              {
                                  "county": "长安区"
                              },
                              {
                                  "county": "高邑县"
                              },
                              {
                                  "county": "藁城区"
                              },
                              {
                                  "county": "晋州市"
                              },
                              {
                                  "county": "井陉矿区"
                              },
                              {
                                  "county": "井陉县"
                              },
                              {
                                  "county": "灵寿县"
                              },
                              {
                                  "county": "鹿泉区"
                              },
                              {
                                  "county": "栾城区"
                              },
                              {
                                  "county": "平山县"
                              },
                              {
                                  "county": "桥东区"
                              },
                              {
                                  "county": "桥西区"
                              },
                              {
                                  "county": "深泽县"
                              },
                              {
                                  "county": "无极县"
                              },
                              {
                                  "county": "辛集市"
                              },
                              {
                                  "county": "新华区"
                              },
                              {
                                  "county": "新乐市"
                              },
                              {
                                  "county": "行唐县"
                              },
                              {
                                  "county": "裕华区"
                              },
                              {
                                  "county": "元氏县"
                              },
                              {
                                  "county": "赞皇县"
                              },
                              {
                                  "county": "赵县"
                              },
                              {
                                  "county": "正定县"
                              }
                          ]
                      },
                      {
                          "city": "唐山市",
                          "countys": [
                              {
                                  "county": "曹妃甸区"
                              },
                              {
                                  "county": "丰南区"
                              },
                              {
                                  "county": "丰润区"
                              },
                              {
                                  "county": "古冶区"
                              },
                              {
                                  "county": "开平区"
                              },
                              {
                                  "county": "乐亭县"
                              },
                              {
                                  "county": "路北区"
                              },
                              {
                                  "county": "路南区"
                              },
                              {
                                  "county": "滦南县"
                              },
                              {
                                  "county": "滦县"
                              },
                              {
                                  "county": "迁安市"
                              },
                              {
                                  "county": "迁西县"
                              },
                              {
                                  "county": "玉田县"
                              },
                              {
                                  "county": "遵化市"
                              }
                          ]
                      },
                      {
                          "city": "邢台市",
                          "countys": [
                              {
                                  "county": "柏乡县"
                              },
                              {
                                  "county": "广宗县"
                              },
                              {
                                  "county": "巨鹿县"
                              },
                              {
                                  "county": "临城县"
                              },
                              {
                                  "county": "临西县"
                              },
                              {
                                  "county": "隆尧县"
                              },
                              {
                                  "county": "内丘县"
                              },
                              {
                                  "county": "南宫市"
                              },
                              {
                                  "county": "南和县"
                              },
                              {
                                  "county": "宁晋县"
                              },
                              {
                                  "county": "平乡县"
                              },
                              {
                                  "county": "桥东区"
                              },
                              {
                                  "county": "桥西区"
                              },
                              {
                                  "county": "清河县"
                              },
                              {
                                  "county": "任县"
                              },
                              {
                                  "county": "沙河市"
                              },
                              {
                                  "county": "威县"
                              },
                              {
                                  "county": "新河县"
                              },
                              {
                                  "county": "邢台县"
                              }
                          ]
                      },
                      {
                          "city": "张家口市",
                          "countys": [
                              {
                                  "county": "赤城县"
                              },
                              {
                                  "county": "崇礼县"
                              },
                              {
                                  "county": "沽源县"
                              },
                              {
                                  "county": "怀安县"
                              },
                              {
                                  "county": "怀来县"
                              },
                              {
                                  "county": "康保县"
                              },
                              {
                                  "county": "桥东区"
                              },
                              {
                                  "county": "桥西区"
                              },
                              {
                                  "county": "尚义县"
                              },
                              {
                                  "county": "万全县"
                              },
                              {
                                  "county": "蔚县"
                              },
                              {
                                  "county": "下花园区"
                              },
                              {
                                  "county": "宣化区"
                              },
                              {
                                  "county": "宣化县"
                              },
                              {
                                  "county": "阳原县"
                              },
                              {
                                  "county": "张北县"
                              },
                              {
                                  "county": "涿鹿县"
                              }
                          ]
                      }
                  ]
              },
              {
                  "province": "山西省",
                  "citys": [
                      {
                          "city": "长治市",
                          "countys": [
                              {
                                  "county": "长治县"
                              },
                              {
                                  "county": "长子县"
                              },
                              {
                                  "county": "城区"
                              },
                              {
                                  "county": "壶关县"
                              },
                              {
                                  "county": "郊区"
                              },
                              {
                                  "county": "黎城县"
                              },
                              {
                                  "county": "潞城市"
                              },
                              {
                                  "county": "平顺县"
                              },
                              {
                                  "county": "沁县"
                              },
                              {
                                  "county": "沁源县"
                              },
                              {
                                  "county": "屯留县"
                              },
                              {
                                  "county": "武乡县"
                              },
                              {
                                  "county": "襄垣县"
                              }
                          ]
                      },
                      {
                          "city": "大同市",
                          "countys": [
                              {
                                  "county": "城区"
                              },
                              {
                                  "county": "大同县"
                              },
                              {
                                  "county": "广灵县"
                              },
                              {
                                  "county": "浑源县"
                              },
                              {
                                  "county": "矿区"
                              },
                              {
                                  "county": "灵丘县"
                              },
                              {
                                  "county": "南郊区"
                              },
                              {
                                  "county": "天镇县"
                              },
                              {
                                  "county": "新荣区"
                              },
                              {
                                  "county": "阳高县"
                              },
                              {
                                  "county": "左云县"
                              }
                          ]
                      },
                      {
                          "city": "晋城市",
                          "countys": [
                              {
                                  "county": "城区"
                              },
                              {
                                  "county": "高平市"
                              },
                              {
                                  "county": "陵川县"
                              },
                              {
                                  "county": "沁水县"
                              },
                              {
                                  "county": "阳城县"
                              },
                              {
                                  "county": "泽州县"
                              }
                          ]
                      },
                      {
                          "city": "晋中市",
                          "countys": [
                              {
                                  "county": "和顺县"
                              },
                              {
                                  "county": "介休市"
                              },
                              {
                                  "county": "灵石县"
                              },
                              {
                                  "county": "平遥县"
                              },
                              {
                                  "county": "祁县"
                              },
                              {
                                  "county": "寿阳县"
                              },
                              {
                                  "county": "太谷县"
                              },
                              {
                                  "county": "昔阳县"
                              },
                              {
                                  "county": "榆次区"
                              },
                              {
                                  "county": "榆社县"
                              },
                              {
                                  "county": "左权县"
                              }
                          ]
                      },
                      {
                          "city": "临汾市",
                          "countys": [
                              {
                                  "county": "安泽县"
                              },
                              {
                                  "county": "大宁县"
                              },
                              {
                                  "county": "汾西县"
                              },
                              {
                                  "county": "浮山县"
                              },
                              {
                                  "county": "古县"
                              },
                              {
                                  "county": "洪洞县"
                              },
                              {
                                  "county": "侯马市"
                              },
                              {
                                  "county": "霍州市"
                              },
                              {
                                  "county": "吉县"
                              },
                              {
                                  "county": "蒲县"
                              },
                              {
                                  "county": "曲沃县"
                              },
                              {
                                  "county": "隰县"
                              },
                              {
                                  "county": "乡宁县"
                              },
                              {
                                  "county": "襄汾县"
                              },
                              {
                                  "county": "尧都区"
                              },
                              {
                                  "county": "翼城县"
                              },
                              {
                                  "county": "永和县"
                              }
                          ]
                      },
                      {
                          "city": "吕梁市",
                          "countys": [
                              {
                                  "county": "方山县"
                              },
                              {
                                  "county": "汾阳市"
                              },
                              {
                                  "county": "交城县"
                              },
                              {
                                  "county": "交口县"
                              },
                              {
                                  "county": "岚县"
                              },
                              {
                                  "county": "离石区"
                              },
                              {
                                  "county": "临县"
                              },
                              {
                                  "county": "柳林县"
                              },
                              {
                                  "county": "石楼县"
                              },
                              {
                                  "county": "文水县"
                              },
                              {
                                  "county": "孝义市"
                              },
                              {
                                  "county": "兴县"
                              },
                              {
                                  "county": "中阳县"
                              }
                          ]
                      },
                      {
                          "city": "朔州市",
                          "countys": [
                              {
                                  "county": "怀仁县"
                              },
                              {
                                  "county": "平鲁区"
                              },
                              {
                                  "county": "山阴县"
                              },
                              {
                                  "county": "朔城区"
                              },
                              {
                                  "county": "应县"
                              },
                              {
                                  "county": "右玉县"
                              }
                          ]
                      },
                      {
                          "city": "太原市",
                          "countys": [
                              {
                                  "county": "古交市"
                              },
                              {
                                  "county": "尖草坪区"
                              },
                              {
                                  "county": "晋源区"
                              },
                              {
                                  "county": "娄烦县"
                              },
                              {
                                  "county": "清徐县"
                              },
                              {
                                  "county": "万柏林区"
                              },
                              {
                                  "county": "小店区"
                              },
                              {
                                  "county": "杏花岭区"
                              },
                              {
                                  "county": "阳曲县"
                              },
                              {
                                  "county": "迎泽区"
                              }
                          ]
                      },
                      {
                          "city": "忻州市",
                          "countys": [
                              {
                                  "county": "保德县"
                              },
                              {
                                  "county": "代县"
                              },
                              {
                                  "county": "定襄县"
                              },
                              {
                                  "county": "繁峙县"
                              },
                              {
                                  "county": "河曲县"
                              },
                              {
                                  "county": "静乐县"
                              },
                              {
                                  "county": "岢岚县"
                              },
                              {
                                  "county": "宁武县"
                              },
                              {
                                  "county": "偏关县"
                              },
                              {
                                  "county": "神池县"
                              },
                              {
                                  "county": "五台县"
                              },
                              {
                                  "county": "五寨县"
                              },
                              {
                                  "county": "忻府区"
                              },
                              {
                                  "county": "原平市"
                              }
                          ]
                      },
                      {
                          "city": "阳泉市",
                          "countys": [
                              {
                                  "county": "城区"
                              },
                              {
                                  "county": "郊区"
                              },
                              {
                                  "county": "矿区"
                              },
                              {
                                  "county": "平定县"
                              },
                              {
                                  "county": "盂县"
                              }
                          ]
                      },
                      {
                          "city": "运城市",
                          "countys": [
                              {
                                  "county": "河津市"
                              },
                              {
                                  "county": "稷山县"
                              },
                              {
                                  "county": "绛县"
                              },
                              {
                                  "county": "临猗县"
                              },
                              {
                                  "county": "平陆县"
                              },
                              {
                                  "county": "芮城县"
                              },
                              {
                                  "county": "万荣县"
                              },
                              {
                                  "county": "闻喜县"
                              },
                              {
                                  "county": "夏县"
                              },
                              {
                                  "county": "新绛县"
                              },
                              {
                                  "county": "盐湖区"
                              },
                              {
                                  "county": "永济市"
                              },
                              {
                                  "county": "垣曲县"
                              }
                          ]
                      }
                  ]
              },
              {
                  "province": "天津市",
                  "citys": [
                      {
                          "city": "天津市",
                          "countys": [
                              {
                                  "county": "宝坻区"
                              },
                              {
                                  "county": "北辰区"
                              },
                              {
                                  "county": "滨海新区"
                              },
                              {
                                  "county": "东丽区"
                              },
                              {
                                  "county": "和平区"
                              },
                              {
                                  "county": "河北区"
                              },
                              {
                                  "county": "河东区"
                              },
                              {
                                  "county": "河西区"
                              },
                              {
                                  "county": "红桥区"
                              },
                              {
                                  "county": "蓟县"
                              },
                              {
                                  "county": "津南区"
                              },
                              {
                                  "county": "静海区"
                              },
                              {
                                  "county": "南开区"
                              },
                              {
                                  "county": "宁河区"
                              },
                              {
                                  "county": "武清区"
                              },
                              {
                                  "county": "西青区"
                              }
                          ]
                      }
                  ]
              }
          ]
      }
    ]
  }

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
