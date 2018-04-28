/* eslint-disable */
import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TableColor from '../../../mixins/table-color/index.vue'
import {
  dealerStatus, customerLevel, finalResult, testDrive,
  submersibleType, provincialCapital, cityCapital,
  countyAreaCapital, brands, createType, dealerleadChannel,
  varieties, carType, carKinds
} from '../../../dictionary'
import { kpi } from './kpi' 

@Component
export default class Index extends mixins(TableColor) {
  form: any = {
    dealerStatus: 0,
    customerLevel: 0,
    submersibleType: 0,
    countyAreaCapital: 0,
    createType: 0,
    brands: 0,
    cityCapital: 0,
    provincialCapital: 0,
    customerType: 0,
    finalResult: 0,
    testDrive: 0,
    dealerleadChannel: 0,
    startDatePicker: this.beginDate(),
    endDatePicker: this.processDate(),
    kpi: 0
  }
  
  activeName: string = '1'
  editableTabsValue: string = '2'
  editableTabs: any = [{
    title: '到店次数-年',
    name: '1'
  }, {
    title: '到店次数-月',
    name: '2'
  }, {
    title: '到店次数-日',
    name: '3'
  }]
  tabIndex: number = 2

  dealerStatus: Array<any> = dealerStatus
  varieties: Array<any> = varieties
  carKinds: Array<any> = carKinds
  carType: Array<any> = carType
  customerLevel: Array<any> = customerLevel
  finalResult: Array<any> = finalResult
  testDrive: Array<any> = testDrive
  dealerleadChannel: Array<any> = dealerleadChannel
  submersibleType: Array<any> = submersibleType
  provincialCapital: Array<any> = provincialCapital
  cityCapital: Array<any> = cityCapital
  countyAreaCapital: Array<any> = countyAreaCapital
  brands: Array<any> = brands
  createType: Array<any> = createType
  kpi: Array<any> = kpi

  tableData: Array<any> = [{
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    color: '上海市普陀区金沙江路 1518 弄',
    shenf: '上海市普陀区金沙江路 1518 弄',
    city: '上海市普陀区金沙江路 1518 弄',
    xianf: '上海市普陀区金沙江路 1518 弄',
    pinp: '上海市普陀区金沙江路 1518 弄',
    pinz: '上海市普陀区金沙江路 1518 弄',
    chex: '上海市普陀区金沙江路 1518 弄',
    xingh: '上海市普陀区金沙江路 1518 弄',
    creat: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    '01': '上海市普陀区金沙江路 1518 弄'
  }, {
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    color: '上海市普陀区金沙江路 1518 弄',
    shenf: '上海市普陀区金沙江路 1518 弄',
    city: '上海市普陀区金沙江路 1518 弄',
    xianf: '上海市普陀区金沙江路 1518 弄',
    pinp: '上海市普陀区金沙江路 1518 弄',
    pinz: '上海市普陀区金沙江路 1518 弄',
    chex: '上海市普陀区金沙江路 1518 弄',
    xingh: '上海市普陀区金沙江路 1518 弄',
    creat: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    '01': '上海市普陀区金沙江路 1518 弄'
  }, {
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    color: '上海市普陀区金沙江路 1518 弄',
    shenf: '上海市普陀区金沙江路 1518 弄',
    city: '上海市普陀区金沙江路 1518 弄',
    xianf: '上海市普陀区金沙江路 1518 弄',
    pinp: '上海市普陀区金沙江路 1518 弄',
    pinz: '上海市普陀区金沙江路 1518 弄',
    chex: '上海市普陀区金沙江路 1518 弄',
    xingh: '上海市普陀区金沙江路 1518 弄',
    creat: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    '01': '上海市普陀区金沙江路 1518 弄'
  }, {
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    color: '上海市普陀区金沙江路 1518 弄',
    shenf: '上海市普陀区金沙江路 1518 弄',
    city: '上海市普陀区金沙江路 1518 弄',
    xianf: '上海市普陀区金沙江路 1518 弄',
    pinp: '上海市普陀区金沙江路 1518 弄',
    pinz: '上海市普陀区金沙江路 1518 弄',
    chex: '上海市普陀区金沙江路 1518 弄',
    xingh: '上海市普陀区金沙江路 1518 弄',
    creat: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    '01': '上海市普陀区金沙江路 1518 弄'
  }]

  $refs: any

  handleClick(tab, event) {
    // console.log(tab, event);
  }

  submitForm(form, index) {
    const $form: any = this.$refs[form]
    $form.validate((valid) => {
      if (valid) {
        // console.log(this.form)
      } else {
        // console.log('error submit!!')
        return false
      }
    })
  }

  resetForm(form) {
    // const indexNum: any = Number(this.activeName)
    const $form: any = this.$refs[form]
    // this.$refs[ruleForm].resetFields()
    $form.resetFields()
  }

  created() {
    // console.log(this.dealerStatus)
  }

  dateChangeBeginTime(val) {
    // console.log(val);
    const _this = this
    _this.form.startDatePicker = val;
  }

  dateChangeEndTime(val) {
    // console.log(val);
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
