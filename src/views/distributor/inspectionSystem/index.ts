import {
  Component,
  // Vue,
  // Watch
} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TableColor from '../../../mixins/table-color/index.vue'
import {
  dealerStatus, customerLevel, customerType, leadChannel, dealerleadChannel,
  finalResult, testDrive, leadStatus
} from '../../../dictionary'
// import http from './../../../util/http';

@Component
export default class Index extends mixins(TableColor) {
  ruleForm: any = {
    dealerStatus: 0,
    customerLevel: 0,
    customerType: '',
    dealerleadChannel: '',
    leadChannel: 0,
    leadStatus: 0,
    finalResult: 0,
    testDrive: ''
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


  tableData: Array<any> = []

  $refs: any

  created() {
    // console.log(this.dealerStatus)
    // post('api/report/dealersSelf', {})
    //   .then(res => {
    //     console.log(res)
    //     this.tableData = res;
    //   })
  }

  handleClick(tab, event) {
    // console.log(tab, event);
  }

  submitForm(formName, index) {
    const $ruleForm: any = this.$refs[formName]
    $ruleForm[index - 1].validate((valid) => {
      if (valid) {
        // console.log(1,this.ruleForm)
        // console.log(2,this.ruleForm.date1)
        // post('api/report/dealersSelf',{
        //   ...this.ruleForm
        // })
        // .then(res => {
        //   console.log(res)
        //   this.tableData = res;
        // })
      } else {
        // console.log('error submit!!')
        return false
      }
    })
  }

  resetForm(formName) {
    const $ruleForm: any = this.$refs[formName]
    // console.log($ruleForm);
    $ruleForm.resetFields()
  }
}
