/* eslint-disable */
import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { State, Getter, Action } from 'vuex-class'
import moment from 'moment'
import TableColor from '../../../mixins/table-color/index.vue'
import ActiveMixin from '../../../mixins/activeMixin'
import {
  dealerStatus, customerLevel, dealerCustomerType, customerType, leadChannel, dealerleadChannel,
  finalResult, testDrive, leadStatus, carType, kinds, factoryCard
} from '../../../dictionary'
// import Brand from '../../../components/brand/index.vue'
// import Region from '../../../components/region/index.vue'
// import { kpi } from './kpi' 
import TimeRange from '../../../components/timeRanage/index.vue'

@Component({
  components: {
    // Brand,
    // Region,
    TimeRange,
  }
})
export default class Index extends mixins(TableColor, ActiveMixin) {
  @Action('finalInventStatist/getFinalInVentStaList') actionGetFinalInVentStaList: any
  @Getter('finalInventStatist/getList') finalInventStatistList: any
  
  cache = {
    // dealerStatus: '',
    // leadChannel: '',
    // factoryCard: '',
    // carType: '',
    // kinds: '',
    // testDrive: '',
    // name: '',
    // goodsNum: '',
    // color: '',

    // beginCreateTime: this.beginDate() || '',
    beginCreateTime:  '',
    // endCreateTime: this.processDate() ||'',
    endCreateTime: '',
    dealerId:'',
    custType:'',
    channel:'',
    xszt:'',
    salesMan:'',
    jxszt:'',
    queryType: '1',
  }
  form: any = { ...this.cache }

  // cascade: any = {
  //   region: null,
  //   province: null,
  //   brand: null,
  //   vehVariety: null,
  //   vehSerices: null,
  //   vehModel: null,
  //   p: null,
  //   c: null,
  //   a: null
  // }

  rules: any = {
    startDatePicker: [
      { required: false, message: '请选择时间' }
    ],
    endDatePicker: [
      { required: false, message: '请选择时间' }
    ]
  }
  
  // activeName: string = '1'
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
  select: any = {
    select1: '',
    select2: '',
    select3: '',
    select4: ''
  }

  cascadeContext: any = {
    clear() {}
  }

  regionContext: any = {
    clear() {}
  }

  leadChannel: Array<any> = leadChannel
  testDrive: Array<any> = testDrive
  dealerStatus: Array<any> = dealerStatus
  customerLevel: Array<any> = customerLevel
  customerType: Array<any> = customerType
  dealerCustomerType: Array<any> = dealerCustomerType
  dealerleadChannel: Array<any> = dealerleadChannel
  leadStatus: Array<any> = leadStatus
  factoryCard: Array<any> = factoryCard
  finalResult: Array<any> = finalResult
  carType: Array<any> = carType
  kinds: Array<any> = kinds

  // kpi: Array<any> = kpi

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
  timeRangeChange(value) {
    console.log(value)
  }
  

  //提出开始时间必须大于今天
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

  submitForm(form) {
    const $form: any = this.$refs[form]
    $form.validate((valid) => {
      const { ...props } = this.form
      let queryType = '1'
      if (this.activeName) {
        if(this.activeName === '1') {
          queryType = '1'
        } else if (this.activeName === '2') {
          queryType = '2'
        } else {
          queryType = '3'
        }
      }
      if(props.beginStatisDate) {
        console.log(props.beginStatisDate < props.endStatisDate)
      }
      // if(!props.beginTime && !props.endTime) {
      //   this.$message({
      //     center: true,
      //     showClose: true,
      //     message: '请选择日期',
      //     type: 'warning'
      //   });
      //   return
      // }
      if (valid) {
        const submit: any = {}
        Object.assign(submit, props)
        submit.endStatisDate = props.endTime;
        console.log(submit)
        Object.assign(submit, queryType)
        console.log(submit)
        this.actionGetFinalInVentStaList(submit)
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  resetForm(form) {
    this.form = { ...this.cache }
    this.cascadeContext.clear()
    this.regionContext.clear()
  }
}
