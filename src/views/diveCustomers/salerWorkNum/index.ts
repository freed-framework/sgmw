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
  customerType1, quarterly
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
  @Action('salerWorkNum/getSalerWorkNumList') actionSalerWorkNumList: any
  @Action('salerWorkNum/getPageList') getPageList: any
  @Action('salerWorkNum/resetSalerWorkNumList') actionResetSalerWorkNumList: any
  @Getter('salerWorkNum/getList') salerWorkNumList: any

  cache = {
    date: '',
    customerType: ''
  }

  form: any = { ...this.cache }

  date: string = ''
  customerType1: Array<any> = customerType1
  quarterly: Array<any> = quarterly

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

  // cascade: any = {
  //   region: null
  // }

  rules: any = {
    date: [
      { required: true, message: '请选择时间' }
    ]
  }
  $refs: any

  // regionContext: any = {
  //   clear() {}
  // }

  handlePageChange(num) {
    this.getPageList(num)
  }

  // handleRegionChange(vm, data = {}) {
  //   this.regionContext = vm
  //   Object.assign(this.cascade,
  //     {region: data[0] ? data[0].label : null}
  //   )
  // }

  submitForm(form) {
    const $form: any = this.$refs[form]
    $form.validate((valid) => {
      const { ...props } = this.form
      if(!this.form.date) {
        this.$message({
          center: true,
          showClose: true,
          message: '请选择日期',
          type: 'warning'
        });
        return
      }
      if(!this.form.customerType) {
        this.$message({
          center: true,
          showClose: true,
          message: '请选择经营性质',
          type: 'warning'
        });
        return
      }
      if (valid) {
        // const submit: any = {}
        const submit : any = {}
        Object.assign(submit, props)
        // Object.assign(submit, this.cascade)
        this.actionSalerWorkNumList(submit)
      } else {
        // console.log('error submit!!')
        return false
      }
    })
  }

  exportList(form) {
    const $form: any = this.$refs[form]
    const { ...props } = this.form
    const submit : any = {}
    Object.assign(submit, props)
    this.download(download.salerWorkNum, submit)
  }

  get exquery() {
    const { ...props } = this.form
    const submit : any = {}
    Object.assign(submit, props)
    return submit
  }

  resetForm(form) {
    this.actionResetSalerWorkNumList()
    this.form = { ...this.cache }
  }
  beforeDestroy() {
    this.actionResetSalerWorkNumList()
    this.form = { ...this.cache }
  }
}
