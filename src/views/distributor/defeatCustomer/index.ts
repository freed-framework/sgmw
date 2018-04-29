/* eslint-disable */
import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import { mixins } from 'vue-class-component'
import TableColor from '../../../mixins/table-color/index.vue'
import {
  dealerStatus, customerLevel, submersibleType, provincialCapital, cityCapital,
  countyAreaCapital, brands, varieties, carType, carKinds, dealerleadChannel,
  testDrive, createType
} from '../../../dictionary'

const cache = {
  dealerStatus: 0,
    createType: 0,
    dealerleadChannel: 0,
    customerLevel: 0,
    submersibleType: 0,
    provincialCapital: 0,
    cityCapital: 0,
    countyAreaCapital: 0,
    brands: 0,
    testDrive: 0,
    varieties: 0,
    finalResult: 0,
    carType: 0,
    carKinds: 0,
    date1: '',
    name: ''
}

@Component
export default class Index extends mixins(TableColor) {
  @Action('defeatCustomer/getDefeatCustomerList') actionGetDefeatCustomerList: any
  @Getter('defeatCustomer/getList') defeatCustomerList: any
  ruleForm: any = { ...cache }
  
  activeName: string = '1'
  editableTabsValue: string = '2'
  editableTabs: any = [{
    title: '战败统计-年',
    name: '1'
  }, {
    title: '战败统计-月',
    name: '2'
  }, {
    title: '战败统计-日',
    name: '3'
  }]
  tabIndex: number = 2

  dealerStatus: Array<any> = dealerStatus
  testDrive: Array<any> = testDrive
  customerLevel: Array<any> = customerLevel
  dealerleadChannel: Array<any> = dealerleadChannel
  submersibleType: Array<any> = submersibleType
  provincialCapital: Array<any> = provincialCapital
  cityCapital: Array<any> = cityCapital
  countyAreaCapital: Array<any> = countyAreaCapital
  brands: Array<any> = brands
  varieties: Array<any> = varieties
  createType: Array<any> = createType
  carType: Array<any> = carType
  carKinds: Array<any> = carKinds

  tableData: Array<any> = [{
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    color: '上海市普陀区金沙江路 1518 弄',
    ssx: '上海市普陀区金沙江路 1518 弄'
  }, {
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    color: '上海市普陀区金沙江路 1518 弄',
    ssx: '上海市普陀区金沙江路 1518 弄'
  }, {
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    color: '上海市普陀区金沙江路 1518 弄',
    ssx: '上海市普陀区金沙江路 1518 弄'
  }, {
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    color: '上海市普陀区金沙江路 1518 弄',
    ssx: '上海市普陀区金沙江路 1518 弄'
  }]

  $refs: any

  handleClick(tab, event) {
    // console.log(tab, event);
  }

  created() {
    // console.log(this.dealerStatus)
  }

  @Watch('ruleForm', {deep: true})
  watchSelect(val) {
    // console.log(val, '----------------------')
  }

  submitForm(ruleForm, index) {
    const $form: any = this.$refs[ruleForm]
    $form.validate((valid) => {
      if (valid) {
        const submit: any = {}
        const { date, ...props } = this.ruleForm
        Object.assign(submit, {
          "province": "全部"
        }, props)
        // console.log(submit)
        this.actionGetDefeatCustomerList(submit)
      } else {
        // console.log('error submit!!')
        return false
      }
    })
  }

  resetForm(ruleForm) {
    this.ruleForm = { ...cache }
  }

  dateChangeBeginTime(val) {
    // console.log(val);
    const _this = this
    _this.ruleForm.startDatePicker = val;
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
        if(self.ruleForm.startDatePicker){
          return new Date(self.ruleForm.startDatePicker).getTime() > time.getTime()
        } else {
          return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
        }
      }
    }
  }

}
