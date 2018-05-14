/* eslint-disable */
import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { State, Getter, Action } from 'vuex-class'
import TableColor from '../../../mixins/table-color/index.vue'
import {
  businessNature, quarterly, cityLevel
} from '../../../dictionary'
import ActiveMixin from '../../../mixins/activeMixin'
import DownloadMixin from '../../../mixins/downloadMixin'
import Region from '../../../components/region/index.vue'
import { download } from '../../../api'
import moment from 'moment'

@Component({
  components: {
    Region
  }
})
export default class Index extends mixins(TableColor, ActiveMixin, DownloadMixin) {
  @Action('salesStatistics/getSalesStatisticsList') actionSalesStatisticsList: any
  @Getter('salesStatistics/getList') salesStatisticsList: any

  form: any = {
    quarterly: '',
    value4: '',
    dealerId: '',
    dealerName: '',
    cityLevel: '',
    businessNature: ''
  }

  value4: string = ''
  quarterly: Array<any> = quarterly
  businessNature: Array<any> = businessNature
  cityLevel: Array<any> = cityLevel

  tableData: Array<any> = [{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }]

  cascade: any = {
    region: null
  }

  rules: any = {
    value4: [
      { required: true, message: '请选择时间' }
    ]
  }

  regionContext: any = {
    clear() {}
  }

  handlePageChange(...props) {
    // console.log(props)
    // this.submit.cu = 
    // this.actionGetFinalInVentStaList()
  }

  handleRegionChange(vm, data = {}) {
    this.regionContext = vm
    Object.assign(this.cascade,
      {region: data[0] ? data[0].label : null}
    )
  }

  submitForm(form) {
    const $form: any = this.$refs[form]
    $form.validate((valid) => {
      const { ...props } = this.form
      if(!this.form.value4) {
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
    this.regionContext.clear()
  }
}
