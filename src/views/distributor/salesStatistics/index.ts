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
  dealerStatus, customerLevel, customerType, leadChannel, dealerleadChannel,
  finalResult, testDrive, leadStatus, carType, kinds, factoryCard, pcaArea
} from '../../../dictionary'
import Brand from '../../../components/brand/index.vue'
import Region from '../../../components/region/index.vue'
import { kpi } from './kpi' 

@Component({
  components: {
    Brand,
    Region
  }
})
export default class Index extends mixins(TableColor) {
  @Action('salesStatistics/getSalesStatisticsList') actionSalesStatisticsList: any
  @Getter('salesStatistics/getList') salesStatisticsList: any
  
  cache = {
    leadChannel: null,
    factoryCard: null,
    carType: null,
    kinds: null,
    testDrive: null,
    pcaArea: null,
    dealerId: null,
    queryType: '1',
    materialId: null,
    vehColor: null,
    beginStatisDate: '',
    endStatisDate: '',
    kpi: 0
  }
  form: any = { ...this.cache }

  cascade: any = {
    region: null,
    province: null,
    brand: null,
    vehVariety: null,
    vehSerices: null,
    vehModel: null,
    p: null,
    c: null,
    a: null
  }

  rules: any = {
    beginStatisDate: [
      { required: false, message: '请选择时间' }
    ],
    endStatisDate: [
      { required: false, message: '请选择时间' }
    ]
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
  dealerleadChannel: Array<any> = dealerleadChannel
  leadStatus: Array<any> = leadStatus
  factoryCard: Array<any> = factoryCard
  finalResult: Array<any> = finalResult
  carType: Array<any> = carType
  kinds: Array<any> = kinds
  pcaArea: Array<any> = pcaArea

  kpi: Array<any> = kpi

  $refs: any

  @Watch('select')
  watchSelect(val) {
    // console.log(val, '----------------------')
  }

  handleClick(tab, event) {
    // this.cache.endStatisDate = this.processDate()
    // console.log(this.processDate());
  }

  created() {
    // console.log(this.dealerStatus)
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
      {province: data[0] ? data[0].label : null, city: data[1] ? data[1].label : null}
    )
  }

  dateChangeBeginTime(val) {
    console.log(val);
    this.form.beginStatisDate = val;
  }

  dateChangeEndTime(val) {
    console.log(val);
    this.$refs.form.endStatisDate = val;
  }

  // //提出开始时间必须大于今天
  // beginDate(){
  //   const _this = this
  //   return {
  //     disabledDate(time){
  //       return time.getTime() > Date.now()//开始时间不选时，结束时间最大值大于等于当天
  //     }
  //   }
  // }
  // //提出结束时间必须大于提出开始时间
  // processDate(){
  //   let self = this
  //   if (self.activeName === '1') {
  //     return {
  //       disabledDate(time){
  //         console.log(time)
  //         if(self.form.beginStatisDate){
  //           return new Date(self.form.beginStatisDate).getTime() > time.getTime()
  //         } else {
  //           return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
  //         }
  //       }
  //     }
  //   }
  //   if(self.activeName === '2') {
  //     return {
  //       disabledDate(time){
  //         if(self.form.beginStatisDate){
  //           return new Date(self.form.beginStatisDate).getTime() > time.getTime()
  //         } else {
  //           return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
  //         }
  //       }
  //     }
  //   }
  //   if(self.activeName === '2') {
  //     return {
  //       disabledDate(time){
  //         if(self.form.beginStatisDate){
  //           return new Date(self.form.beginStatisDate).getTime() > time.getTime()
  //         } else {
  //           return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
  //         }
  //       }
  //     }
  //   }
  // }

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
        // const submit: any = {}
        const submit : any = {}
        Object.assign(submit, props)
        submit.endStatisDate = props.endTime;
        Object.assign(submit, this.cascade)
        Object.assign(submit, queryType)
        this.actionSalesStatisticsList(submit)
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
