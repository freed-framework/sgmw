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
import DownloadMixin from '../../../mixins/downloadMixin'
import {
  dealerStatus, customerLevel, customerType, leadChannel, dealerleadChannel,
  finalResult, testDrive, leadStatus, carType, kinds, pcaArea
} from '../../../dictionary'
import Brand from '../../../components/brand/index.vue'
import Region from '../../../components/region/index.vue'
import { download } from '../../../api'
import TimeRange from '../../../components/timeRanage/index.vue'

@Component({
  components: {
    Brand,
    Region,
    TimeRange
  }
})
export default class Index extends mixins(TableColor, ActiveMixin, DownloadMixin) {
  @Action('salesStatistics/getSalesStatisticsList') actionSalesStatisticsList: any
  @Action('salesStatistics/resetSalesStatisticsList') actionResetSalesStatisticsList: any
  @Getter('salesStatistics/getList') salesStatisticsList: any
  
  cache = {
    leadChannel: null,
    // factoryCard: '',
    carType: null,
    kinds: null,
    testDrive: null,
    cityLevel: null,
    dealerId: null,
    materialId: null,
    vehColor: null,
    beginStatisDate: '',
    queryType: '',
    endStatisDate: ''
  }
  form: any = { ...this.cache }

  cascade: any = {
    region: null,
    province: null,
    vehSerices: null,
    vehModel: null
  }

  rules: any = {
    beginStatisDate: [
      { required: false, message: '请选择时间' }
    ],
    endStatisDate: [
      { required: false, message: '请选择时间' }
    ]
  }
  
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

  rangeVm: any = {
    clear() {}
  }

  leadChannel: Array<any> = leadChannel
  testDrive: Array<any> = testDrive
  dealerStatus: Array<any> = dealerStatus
  customerLevel: Array<any> = customerLevel
  customerType: Array<any> = customerType
  dealerleadChannel: Array<any> = dealerleadChannel
  leadStatus: Array<any> = leadStatus
  // factoryCard: Array<any> = factoryCard
  finalResult: Array<any> = finalResult
  carType: Array<any> = carType
  kinds: Array<any> = kinds
  pcaArea: Array<any> = pcaArea

  $refs: any

  timeRangeChange(vm, val) {
    this.rangeVm = vm
    // console.log(val)
    this.form.beginStatisDate = val.beginTime
    this.form.endStatisDate = val.endTime
  }

  // @Watch('select')
  // watchSelect(val) {
  //   // console.log(val, '----------------------')
  // }

  handlePageChange(...props) {
    // console.log(props)
    // this.submit.cu = 
    // this.actionGetFinalInVentStaList()
  }

  handleClick(tab, event) {
    this.resetForm(this.form)
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
        vehSerices: data[0] ? data[0].label : null,
        vehModel: data[1] ? data[1].label : null
      }
    )
  }

  handleRegionChange(vm, data = {}) {
    this.regionContext = vm
    Object.assign(this.cascade,
      {region: data[0] ? data[0].label : null,province: data[1] ? data[1].label : null}
    )
  }

  dateChangeBeginTime(val) {
    this.form.beginStatisDate = val;
  }

  dateChangeEndTime(val) {
    this.$refs.form.endStatisDate = val;
  }

  submitForm(form) {
    const $form: any = this.$refs[form]
    $form.validate((valid) => {
      const { ...props } = this.form
      if(!this.form.beginStatisDate && !this.form.endStatisDate) {
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
        this.actionSalesStatisticsList(submit)
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  exportList(form) {
    const $form: any = this.$refs[form]
    const { ...props } = this.form
    const submit : any = {}
    Object.assign(submit, props)
    submit.queryType = this.activeName
    Object.assign(submit, this.cascade)
    this.download(download.sales, submit)
  }

  resetForm(form) {
    this.actionResetSalesStatisticsList()
    this.form = { ...this.cache }
    this.cascadeContext.clear()
    this.regionContext.clear()
    this.rangeVm.clear()
  }
  beforeDestroy() {
    this.actionResetSalesStatisticsList()
    this.form = { ...this.cache }
    this.cascadeContext.clear()
    this.regionContext.clear()
    this.rangeVm.clear()
  }
}
