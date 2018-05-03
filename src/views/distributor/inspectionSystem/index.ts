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
import {
  dealerStatus, customerLevel, dealerCustomerType, customerType, leadChannel, dealerleadChannel,
  finalResult, testDrive, leadStatus, carType, kinds, factoryCard
} from '../../../dictionary'
import Brand from '../../../components/brand/index.vue'
import Region from '../../../components/region/index.vue'
// import { kpi } from './kpi' 

@Component({
  components: {
    Brand,
    Region
  }
})
export default class Index extends mixins(TableColor) {
  @Action('finalInventStatist/getFinalInVentStaList') actionGetFinalInVentStaList: any
  @Getter('finalInventStatist/getList') finalInventStatistList: any
  
  cache = {
    dealerStatus: '',
    leadChannel: '',
    factoryCard: '',
    carType: '',
    kinds: '',
    testDrive: '',
    name: '',
    goodsNum: '',
    color: '',
    startDatePicker: this.beginDate() || '',
    endDatePicker: this.processDate() ||'',
    // kpi: 0
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

  // handleCacadeChange(vm, data = {}) {
  //   this.cascadeContext = vm
  //   Object.assign(this.cascade,
  //     {
  //       brand: data[0] ? data[0].label : null,
  //       vehVariety: data[1] ? data[1].label : null,
  //       vehSerices: data[2] ? data[2].label : null,
  //       vehModel: data[3] ? data[3].label : null
  //     }
  //   )
  // }
  handleOptionsChange(value) {
    const { ...props } = this.form
    console.log(this.finalInventStatistList)
    console.log(value)
    // Object.assign(this.cascade,
    //   {
    //     p: value[0] || null,
    //     c: value[1] || null,
    //     a: value[2] || null,
    //   }
    // )
  }

  handleRegionChange(vm, data = {}) {
    this.regionContext = vm
    // Object.assign(this.cascade,
    //   {province: data[0] ? data[0].label : null, city: data[1] ? data[1].label : null}
    // )
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
      const { date, ...props } = this.form
      if(!props.beginTime && !props.endTime) {
        this.$message({
          center: true,
          showClose: true,
          message: '请选择日期',
          type: 'warning'
        });
        return
      }
      if (valid) {
        const submit: any = {}
        Object.assign(submit, props)
        // Object.assign(submit, this.cascade)
        // console.log(this.cascade)
        // console.log(submit)
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
