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
  dealerStatus, customerLevel, customerType, leadChannel,
  finalResult, testDrive
} from '../../../dictionary'
import { kpi } from './kpi'
import Brand from '../../../components/brand/index.vue'
import Region from '../../../components/region/index.vue'

// const cacheDate = [new Date(Number(new Date()) - 700 * 24 * 60 * 60 * 1000), new Date()]

@Component({
  components: {
    Brand,
    Region
  }
})
export default class Index extends mixins(TableColor) {

  @Action('kpi/getKpiList') actionGetKpiList: any
  @Getter('kpi/getList') kpiList: any

  // kpiType: any = 0

  dealer: any = 0

  rules: any = {
    date: [
      { required: true, message: '请选择时间' }
    ]
  }

  cascade: any = {
    region: null,
    province: null,
    brand: null,
    vehVariety: null,
    vehSerices: null,
    vehModel: null
  }

  cascadeContext: any = {
    clear() {}
  }

  regionContext: any = {
    clear() {}
  }

  form: any = {
    date: [],
    channel: '全部',
    custLevel: '全部',
  }

  dealerStatus: Array<any> = dealerStatus
  customerLevel: Array<any> = customerLevel
  customerType: Array<any> = customerType
  leadChannel: Array<any> = leadChannel
  finalResult: Array<any> = finalResult
  testDrive: Array<any> = testDrive
  kpi: Array<any> = kpi
  loading: boolean = false

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
      {region: data[0] ? data[0].label : null, province: data[1] ? data[1].label : null}
    )
  }

  submitForm(formName) {
    const $form: any = this.$refs[formName]
    $form.validate((valid) => {
      const { date, ...props } = this.form
      if(!date[0]) {
        this.$message({
          center: true,
          showClose: true,
          message: '请选择日期',
          type: 'warning'
        });
        return
      }
      if(!this.form.kpiType) {
        this.$message({
          center: true,
          showClose: true,
          message: '请选择kpi类型',
          type: 'warning'
        });
        return
      }
      if (valid) {
        const submit: any = {}
        const that: any = this
        if (date) {
          submit.rq1 = moment(date[0]).format('YYYY-MM-DD')
          submit.rq2 = moment(date[1]).format('YYYY-MM-DD')
        }    
        Object.assign(submit, props, this.cascade)
        this.loading = true
        this.actionGetKpiList(submit)
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  resetForm(formName) {
    const $form: any = this.$refs[formName]
    this.cascadeContext.clear()
    this.regionContext.clear()
    $form.resetFields()
  }

  @Watch('kpiList', {deep: true})
  watchListChange() {
    this.loading = false
  }
}
