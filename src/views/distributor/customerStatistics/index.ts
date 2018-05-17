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
  dealerStatus, customerLevel, customerType,
  provincialCapital, factoryCard, cityCapital, countyAreaCapital
} from '../../../dictionary'
// import Brand from '../../../components/brand/index.vue'
import Region from '../../../components/region/index.vue'
import TimeRange from '../../../components/timeRanage/index.vue'
import { download } from '../../../api'

@Component({
  components: {
    Region,
    TimeRange
  }
})
export default class Index extends mixins(TableColor, ActiveMixin, DownloadMixin) {
  @Action('customerStatistics/getCustomerStatisticsList') getCustomerStatisticsList: any
  @Getter('customerStatistics/getList') customerStatisticsList: any
  cache = {
    // dealerStatus: '',
    // customerLevel: '',
    // customerType: '',
    // provincialCapital: '',
    // cityCapital: '',
    // factoryCard: '',
    beginStatisDate: '',
    endStatisDate: '',
    dealerId: ''
  }
  form: any = { ...this.cache }

  cascade: any = {
    province: null,
    city: null,
    region: null,
    // brand: null,
    // vehVariety: null,
    // vehSerices: null,
    // vehModel: null
  }

  regionContext: any = {
    clear() {}
  }

  rangeVm: any = {
    clear() {}
  }
  
  activeName: string = '1'
  editableTabsValue: string = '2'
  editableTabs: any = [{
    title: '客户统计-年',
    name: '1'
  }, {
    title: '客户统计-月',
    name: '2'
  }, {
    title: '客户统计-日',
    name: '3'
  }]
  tabIndex: number = 2

  dealerStatus: Array<any> = dealerStatus
  // customerLevel: Array<any> = customerLevel
  // customerType: Array<any> = customerType
  // cityCapital: Array<any> = cityCapital
  // countyAreaCapital: Array<any> = countyAreaCapital
  // provincialCapital: Array<any> = provincialCapital
  // factoryCard: Array<any> = factoryCard

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
    this.resetForm(this.form)
    // console.log(tab, event);
  }

  created() {
    // console.log(this.dealerStatus)
  }

  @Watch('select')
  watchSelect(val) {
    // console.log(val, '----------------------')
  }

  handlePageChange(...props) {
    // console.log(props)
    // this.submit.cu = 
    // this.actionGetFinalInVentStaList()
  }

  timeRangeChange(vm, val) {
    this.rangeVm = vm
    // console.log(val)
    this.form.beginStatisDate = val.beginTime
    this.form.endStatisDate = val.endTime
  }

  handleRegionChange(vm, data = {}) {
    this.regionContext = vm
    Object.assign(this.cascade,
      {
        province: data[0] ? data[0].label : null,
        city: data[1] ? data[1].label : null, region: data[2] ? data[2].label : null
      }
    )
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
        this.getCustomerStatisticsList(submit)
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
    this.form = { ...this.cache }
    this.regionContext.clear()
    this.rangeVm.clear()
  }

}
