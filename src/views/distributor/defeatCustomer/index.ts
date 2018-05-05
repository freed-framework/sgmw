/* eslint-disable */
import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import { mixins } from 'vue-class-component'
import moment from 'moment'
import TableColor from '../../../mixins/table-color/index.vue'
import {
  dealerStatus, customerLevel, submersibleType,
  varieties, dealerleadChannel,
  testDrive, createType, finalResult
} from '../../../dictionary'
import ActiveMixin from '../../../mixins/activeMixin'
import Brand from '../../../components/brand/index.vue'
import Region from '../../../components/region/index.vue'
import TimeRange from '../../../components/timeRanage/index.vue'


@Component({
  components: {
    Brand,
    Region,
    TimeRange
  }
})
export default class Index extends mixins(TableColor, ActiveMixin) {
  @Action('defeatCustomer/getDefeatCustomerList') actionGetDefeatCustomerList: any
  @Getter('defeatCustomer/getList') defeatCustomerList: any
  cache = {
    dealerStatus: '',
    createType: '',
    dealerleadChannel: '',
    customerLevel: '',
    submersibleType: '',
    testDrive: '',
    varieties: '',
    finalResult: '',
    name: '',
    numberOfStores: '',
    SalesConsultant: '',
    beginStatisDate: '',
    endStatisDate: '',
  }
  ruleForm: any = { ...this.cache }

  cascade: any = {
    province: null,
    countyArea: null,
    city: null,
    brand: null,
    vehVariety: null,
    vehSerices: null,
    vehModel: null
  }
  
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
  dealer: any = 0
  rules: any = {
    date: [
      { required: false, message: '请选择时间' }
    ]
  }

  cascadeContext: any = {
    clear() {}
  }

  regionContext: any = {
    clear() {}
  }

  rangeVm: any = {
    clear() {}
  }

  dealerStatus: Array<any> = dealerStatus
  finalResult: Array<any> = finalResult
  testDrive: Array<any> = testDrive
  customerLevel: Array<any> = customerLevel
  dealerleadChannel: Array<any> = dealerleadChannel
  submersibleType: Array<any> = submersibleType
  varieties: Array<any> = varieties
  createType: Array<any> = createType

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

  timeRangeChange(vm, val) {
    this.rangeVm = vm
    // console.log(val)
    this.ruleForm.beginStatisDate = val.beginTime
    this.ruleForm.endStatisDate = val.endTime
  }

  handleCacadeChange(vm, data = {}) {
    this.cascadeContext = vm
    Object.assign(this.cascade,
      {
        brand: data[0] ? data[0].label : null,
        vehVariety: data[1] ? data[1].label : null,
        vehSerices: data[2] ? data[2].label : null,
        vehModel: data[3] ? data[3].label : null
      }
    )
  }

  handleRegionChange(vm, data = {}) {
    this.regionContext = vm
    Object.assign(this.cascade,
      {
        province: data[0] ? data[0].label : null,
        city: data[1] ? data[1].label : null, countyArea: data[2] ? data[2].label : null
      }
    )
  }

  submitForm(ruleForm) {
    const $form: any = this.$refs[ruleForm]
    $form.validate((valid) => {
      const { ...props } = this.ruleForm
      if(!this.ruleForm.beginStatisDate && !this.ruleForm.endStatisDate) {
        this.$message({
          center: true,
          showClose: true,
          message: '请选择日期',
          type: 'warning'
        });
        return
      }
      if (valid) {
        // const submit: any = {}
        const submit : any = {}
        Object.assign(submit, props)
        submit.queryType = this.activeName
        Object.assign(submit, this.cascade)
        this.actionGetDefeatCustomerList(submit)
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  resetForm(formName) {
    this.ruleForm = { ...this.cache }
    this.cascadeContext.clear()
    this.regionContext.clear()
    this.rangeVm.clear()
  }

}
