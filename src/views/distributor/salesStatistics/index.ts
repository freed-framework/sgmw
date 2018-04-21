import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TableColor from '../../../mixins/table-color/index.vue'
import {
  dealerStatus, customerLevel, customerType, leadChannel,
  finalResult, testDrive
} from '../../../dictionary'
import { kpi } from './kpi' 

@Component
export default class Index extends mixins(TableColor) {
  form: any = {
    dealerStatus: 0,
    customerLevel: 0,
    customerType: '',
    leadChannel: 0,
    finalResult: 0,
    testDrive: '',
    startDatePicker: this.beginDate(),
    endDatePicker: this.processDate(),
    kpi: 0
  }

  dealerStatus: Array<any> = dealerStatus
  customerLevel: Array<any> = customerLevel
  customerType: Array<any> = customerType
  leadChannel: Array<any> = leadChannel
  finalResult: Array<any> = finalResult
  testDrive: Array<any> = testDrive
  kpi: Array<any> = kpi

  tableData: Array<any> = [{
    type: '2016-05-02',
    way: '王小虎',
    status: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    zeroOne: '上海市普陀区金沙江路 1518 弄'
  }, {
    type: '2016-05-02',
    way: '王小虎',
    status: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    zeroOne: '上海市普陀区金沙江路 1518 弄'
  }, {
    type: '2016-05-02',
    way: '王小虎',
    status: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    zeroOne: '上海市普陀区金沙江路 1518 弄'
  }, {
    type: '2016-05-02',
    way: '王小虎',
    status: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    zeroOne: '上海市普陀区金沙江路 1518 弄'
  }]

  $refs: any

  created() {
    console.log(this.dealerStatus)
  }

  dateChangeBeginTime(val) {
    console.log(val);
    const _this = this
    _this.form.startDatePicker = val;
  }

  dateChangeEndTime(val) {
    console.log(val);
    this.$refs.form.endDatePicker = val;
  }

  //提出开始时间必须小于今天
  beginDate(){
    return {
      disabledDate(time){
        return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
      }
    }
  }
  //提出结束时间必须大于提出开始时间
  processDate(){
    let self = this
    return {
      disabledDate(time){
        if(self.form.startDatePicker){
          return new Date(self.form.startDatePicker).getTime() > time.getTime()
        } else {
          return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
        }
      }
    }
  }

}
