/* eslint-disable */
import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TableColor from '../../../mixins/table-color/index.vue'
import {
  dealerStatus, customerLevel, customerType, leadChannel, dealerleadChannel,
  finalResult, testDrive, leadStatus, factoryCard, carType, kinds
} from '../../../dictionary'
import { kpi } from './kpi' 

@Component
export default class Index extends mixins(TableColor) {
  form: any = {
    leadChannel: 0,
    brand: 0,
    carType: 0,
    kinds: 0,
    testDrive: 0,
    region: 0,
    name: '',
    goodsNum: '',
    color: '',
    startDatePicker: this.beginDate() || '',
    endDatePicker: this.processDate() || '',
    kpi: 0
  }
  
  activeName: string = '1'
  editableTabsValue: string = '2'
  editableTabs: any = [{
    title: '销量统计-年',
    name: '1'
  }, {
    title: '销量统计-月',
    name: '2'
  }, {
    title: '销量统计-日',
    name: '3'
  }]
  tabIndex: number = 2
  select: any = {
    select1: '',
    select2: '',
    select3: '',
    select4: ''
  }

  leadChannel: Array<any> = leadChannel
  testDrive: Array<any> = testDrive
  dealerStatus: Array<any> = dealerStatus
  customerLevel: Array<any> = customerLevel
  customerType: Array<any> = customerType
  dealerleadChannel: Array<any> = dealerleadChannel
  leadStatus: Array<any> = leadStatus
  finalResult: Array<any> = finalResult
  carType: Array<any> = carType
  kinds: Array<any> = kinds
  factoryCard: Array<any> = factoryCard

  kpi: Array<any> = kpi

  tableData: Array<any> = [{
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    color: '上海市普陀区金沙江路 1518 弄',
    ssx: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    '2017': '2017'
  }, {
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    color: '上海市普陀区金沙江路 1518 弄',
    ssx: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    '2017': '2017'
  }, {
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    color: '上海市普陀区金沙江路 1518 弄',
    ssx: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    '2017': '2017'
  }, {
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    color: '上海市普陀区金沙江路 1518 弄',
    ssx: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    '2017': '2017'
  }]

  $refs: any

  @Watch('select')
  watchSelect(val) {
    // console.log(val, '----------------------')
  }

  handleClick(tab, event) {
    // console.log(tab, event);
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

  submitForm(ruleForm, index) {
    const $form: any = this.$refs[ruleForm]
    $form.validate((valid) => {
      if (valid) {
        // console.log(this.form)
      } else {
        // console.log('error submit!!')
        return false
      }
    })
  }

  resetForm(ruleForm) {
    // const indexNum: any = Number(this.activeName)
    const $form: any = this.$refs[ruleForm]
    // this.$refs[ruleForm].resetFields()
    $form.resetFields()
  }
}
