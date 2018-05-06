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
  dealerStatusList, customerLevel, dealerCustomerType, customerType, leadChannel, dealerleadChannel,
  finalResult, testDrive, leadStatus, carType, kinds, factoryCard
} from '../../../dictionary'
import TimeRange from '../../../components/timeRanage/index.vue'
import { download } from '../../../api'
import DownloadMixin from '../../../mixins/downloadMixin'
import { cutInvalidData } from '../../../store/helpers/index'

@Component({
  components: {
    TimeRange,
  }
})
export default class Index extends mixins(TableColor, ActiveMixin, DownloadMixin) {
  @Action('finalInventStatist/getFinalInVentStaList') actionGetFinalInVentStaList: any
  @Getter('finalInventStatist/getList') finalInventStatistList: any
  
  cache = {
    beginCreateTime:  '',
    endCreateTime: '',
    dealerId:'',
    custType:'',
    channel:'',
    potentialCustSaleResult:'',
    salesMan:'',
    dealerStatus:'',
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
    beginCreateTime: [
      { required: false, message: '请选择时间' }
    ],
    endCreateTime: [
      { required: false, message: '请选择时间' }
    ]
  }
  
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

  rangeVm: any = {
    clear() {}
  }

  leadChannel: Array<any> = leadChannel
  testDrive: Array<any> = testDrive
  dealerStatus: Array<any> = dealerStatusList
  customerLevel: Array<any> = customerLevel
  customerType: Array<any> = customerType
  dealerCustomerType: Array<any> = dealerCustomerType
  dealerleadChannel: Array<any> = dealerleadChannel
  leadStatus: Array<any> = leadStatus
  factoryCard: Array<any> = factoryCard
  finalResult: Array<any> = finalResult
  carType: Array<any> = carType
  kinds: Array<any> = kinds

  $refs: any

  timeRangeChange(vm, val) {
    this.rangeVm = vm
    // console.log(val)
    this.form.beginCreateTime = val.beginTime
    this.form.endCreateTime = val.endTime
  }

  handlePageChange(val) {
    console.log(val)
    // this.submit.cu = 
    // this.actionGetFinalInVentStaList()
  }

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

  dateChangeBeginTime(val) {
    this.form.beginCreateTime = val;
  }

  dateChangeEndTime(val) {
    this.$refs.form.endCreateTime = val;
  }

  submitForm(form) {
    const $form: any = this.$refs[form]
    $form.validate((valid) => {
      const { ...props } = this.form
      if(!this.form.beginCreateTime && !this.form.endCreateTime) {
        this.$message({
          center: true,
          showClose: true,
          message: '请选择日期',
          type: 'warning'
        });
        return
      }
      if (valid) {
        const submit : any = {}
        Object.assign(submit, props)
        submit.queryType = this.activeName
        // Object.assign(submit, this.cascade)
        let param = cutInvalidData(submit)
        console.log('here submit', param)
        this.actionGetFinalInVentStaList(param)
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
    // Object.assign(submit, this.cascade)
    this.download(download.defeat, submit)
  }

  resetForm(form) {
    this.form = { ...this.cache }
    this.cascadeContext.clear()
    this.regionContext.clear()
    this.rangeVm.clear()
  }
}
