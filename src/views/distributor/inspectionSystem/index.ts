import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TableColor from '../../../mixins/table-color/index.vue'
import {
  dealerStatus, customerLevel, customerType, leadChannel, dealerleadChannel,
  finalResult, testDrive
} from '../../../dictionary'

@Component
export default class Index extends mixins(TableColor) {
  form: any = {
    dealerStatus: 0,
    customerLevel: 0,
    customerType: '',
    dealerleadChannel: '',
    leadChannel: 0,
    finalResult: 0,
    testDrive: ''
  }

  dealerStatus: Array<any> = dealerStatus
  customerLevel: Array<any> = customerLevel
  customerType: Array<any> = customerType
  dealerleadChannel: Array<any> = dealerleadChannel
  leadChannel: Array<any> = leadChannel
  finalResult: Array<any> = finalResult
  testDrive: Array<any> = testDrive

  tableData: Array<any> = [{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }]

  created() {
    console.log(this.dealerStatus)
  }
}
