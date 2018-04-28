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
  finalResult, testDrive, leadStatus
} from '../../../dictionary'

@Component
export default class Index extends mixins(TableColor) {
  ruleForm: any = {
    dealerStatus: '',
    customerLevel:'',
    customerType: '',
    dealerleadChannel: '',
    leadChannel: '',
    leadStatus: '',
    finalResult: '',
    testDrive: '',
    date1: '',
    name: ''
  }

  activeName: string = '1'
  editableTabsValue: string = '2'
  editableTabs: any = [{
    title: '线索统计-年',
    name: '1'
  }, {
    title: '线索统计-月',
    name: '2'
  }, {
    title: '线索统计-日',
    name: '3'
  }]
  tabIndex: number = 2

  dealerStatus: Array<any> = dealerStatus
  customerLevel: Array<any> = customerLevel
  customerType: Array<any> = customerType
  dealerleadChannel: Array<any> = dealerleadChannel
  leadChannel: Array<any> = leadChannel
  leadStatus: Array<any> = leadStatus
  finalResult: Array<any> = finalResult
  testDrive: Array<any> = testDrive


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
    // console.log(this.dealerStatus)
  }

  handleClick(tab, event) {
    // console.log(tab, event);
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
    console.log($form)
  }
}
