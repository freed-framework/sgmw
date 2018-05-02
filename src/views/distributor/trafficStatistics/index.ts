/* eslint-disable */
import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TableColor from '../../../mixins/table-color/index.vue'
import {
  dealerStatus, customerLevel, customerType, leadChannel, carKinds, carType, factoryCard
} from '../../../dictionary'

@Component
export default class Index extends mixins(TableColor) {
  form: any = {
    province: '',
    leadChannel: 0,
    goodsNum: '',
    color: '',
    carKinds: 0,
    brand: 0,
    carType: 0,
    region: 0,
    startDatePicker: this.beginDate(),
    endDatePicker: this.processDate()
  }
  
  activeName: string = '1'
  editableTabsValue: string = '2'
  editableTabs: any = [{
    title: '发车统计-年',
    name: '1'
  }, {
    title: '发车统计-月',
    name: '2'
  }, {
    title: '发车统计-日',
    name: '3'
  }]
  tabIndex: number = 2

  dealerStatus: Array<any> = dealerStatus
  customerLevel: Array<any> = customerLevel
  customerType: Array<any> = customerType
  leadChannel: Array<any> = leadChannel
  carKinds: Array<any> = carKinds
  carType: Array<any> = carType
  factoryCard: Array<any> = factoryCard

  tableData: Array<any> = [{
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    '2017': '上海市普陀区金沙江路 1518 弄'
  }, {
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    '2017': '上海市普陀区金沙江路 1518 弄'
  }, {
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    '2017': '上海市普陀区金沙江路 1518 弄'
  }, {
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    total: '上海市普陀区金沙江路 1518 弄',
    '2017': '上海市普陀区金沙江路 1518 弄'
  }]

  $refs: any

  handleClick(tab, event) {
    // console.log(tab, event);
  }

  created() {
    // console.log(this.dealerStatus)
  }

  @Watch('select')
  watchSelect(val) {
    // console.log(val, '----------------------')
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
