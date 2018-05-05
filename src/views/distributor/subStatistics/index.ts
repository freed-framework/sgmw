/* eslint-disable */
import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import moment from 'moment'
import { State, Getter, Action } from 'vuex-class'
import TableColor from '../../../mixins/table-color/index.vue'
import ActiveMixin from '../../../mixins/activeMixin'
import {
  dealerStatus, submersibleType, provincialCapital,
  countyAreaCapital, cityCapital, varieties, carType, finalResult,
  dealerleadChannel, testDrive, createType, customerLevel, brands, carKinds
} from '../../../dictionary'
import Brand from '../../../components/brand/index.vue'
import Region from '../../../components/region/index.vue'
import TimeRange from '../../../components/timeRanage/index.vue'

@Component({
  components: {
    Brand,
    Region,
    TimeRange
  }
})export default class Index extends mixins(TableColor, ActiveMixin) {
  @Action('subStatistics/getSubStatisticsListList') actionSubStatisticsListList: any
  @Getter('subStatistics/getList') subStatisticsList: any
  cache = {
    status: '',
    custType: '',
    custLevel: '',
    saleResult: '',
    ifDrive: '',
    distributorNum: '',
    channel: '',
    queryType: '',
    dealerId: '',
    beginStatisDate: '',
    endStatisDate: ''
  }
  ruleForm: any = { ...this.cache }
  
  editableTabsValue: string = '2'
  editableTabs: any = [{
    title: '潜客统计-年',
    name: '1'
  }, {
    title: '潜客统计-月',
    name: '2'
  }, {
    title: '潜客统计-日',
    name: '3'
  }]
  tabIndex: number = 2

  rules: any = {
    startDatePicker: [
      { required: false, message: '请选择时间' }
    ],
    endDatePicker: [
      { required: false, message: '请选择时间' }
    ]
  }

  cascade: any = {
    province: null,
    city: null,
    county: null,
    brand: null,
    variety: null,
    vehSerices: null,
    vehModel: null
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
  customerLevel: Array<any> = customerLevel
  submersibleType: Array<any> = submersibleType
  provincialCapital: Array<any> = provincialCapital
  countyAreaCapital: Array<any> = countyAreaCapital
  cityCapital: Array<any> = cityCapital
  varieties: Array<any> = varieties
  carType: Array<any> = carType
  finalResult: Array<any> = finalResult
  dealerleadChannel: Array<any> = dealerleadChannel
  carKinds: Array<any> = carKinds
  testDrive: Array<any> = testDrive
  createType: Array<any> = createType
  brands: Array<any> = brands

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

  created() {
    // console.log(this.dealerStatus)
  }
  @Watch('select')
  watchSelect(val) {
    // console.log(val, '----------------------')
  }

  timeRangeChange(vm, val) {
    this.rangeVm = vm
    console.log(vm)
    this.ruleForm.beginStatisDate = val.beginTime
    this.ruleForm.endStatisDate = val.endTime
  }

  handleRegionChange(vm, data = {}) {
    this.regionContext = vm
    Object.assign(this.cascade,
      {
        provinc: data[0] ? data[0].label : null,
        city: data[1] ? data[1].label : null,
        county: data[2] ? data[2].label : null
      }
    )
  }

  handleCacadeChange(vm, data = {}) {
    this.cascadeContext = vm
    Object.assign(this.cascade,
      {
        brand: data[0] ? data[0].label : null,
        variety: data[1] ? data[1].label : null,
        vehSerices: data[2] ? data[2].label : null,
        vehModel: data[3] ? data[3].label : null
      }
    )
  }

  submitForm(form) {
    const $form: any = this.$refs[form]
    $form.validate((valid) => {
      const { ...props } = this.ruleForm
      // if(props.beginStatisDate) {
      //   console.log(props.beginStatisDate < props.endStatisDate)
      // }
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
        this.actionSubStatisticsListList(submit)
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  resetForm(ruleForm) {
    this.ruleForm = { ...this.cache }
    this.cascadeContext.clear()
    this.regionContext.clear()
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
