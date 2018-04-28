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
import AreaData from '../../../dictionary/area'
import { kpi } from './kpi'
import Cascade from '../../../components/cascade/index.vue'

const cacheDate = [new Date(Number(new Date()) - 700 * 24 * 60 * 60 * 1000), new Date()]

@Component({
  components: {
    Cascade
  }
})
export default class Index extends mixins(TableColor) {

  @Action('kpi/getKpiList') actionGetKpiList: any
  @Getter('kpi/getList') kpiList: any

  kpiType: any = 0

  dealer: any = 0

  region: any = '0'

  cascade: any = {}

  cascadeContext: any = {
    clear() {}
  }


  form: any = {
    date: cacheDate,
    province: '全部',
    channel: '全部',
    custLevel: '全部',
    brand: '全部' // 测试
  }

  dealerStatus: Array<any> = dealerStatus
  customerLevel: Array<any> = customerLevel
  customerType: Array<any> = customerType
  leadChannel: Array<any> = leadChannel
  finalResult: Array<any> = finalResult
  testDrive: Array<any> = testDrive
  kpi: Array<any> = kpi
  provinceList: any = AreaData.province_list
  regionList: any = AreaData.region_list

  handleCacadeChange(cascade, data = {}) {
    this.cascadeContext = cascade
    this.cascade = data
  }

  submitForm(formName) {
    const $form: any = this.$refs[formName]
    $form.validate((valid) => {
      if (valid) {
        const submit: any = {}
        const { date, ...props } = this.form
        if (date) {
          submit.rq1 = moment(date[0]).format('YYYY-MM-DD')
          submit.rq2 = moment(date[1]).format('YYYY-MM-DD')
        }        
        Object.assign(submit, props, this.cascade)
        console.log(submit)
        this.actionGetKpiList(submit)
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  resetForm(formName) {
    const $form: any = this.$refs[formName]
    this.region = '0'
    this.cascadeContext.clear()
    $form.resetFields()
  }

  @Watch('region')
  watchRegionChange(val, old) {
    const province = {}
    const data: any = AreaData
    const value = Number(val) 
    for (let i in data.province_list) {
      const max: any = value + 100000;
      if (i === '0' || (i > val && i < max) || val === '0') {
        province[i] = data.province_list[i]
      }
    }

    this.provinceList = province
    this.form.province = '全部'
  } 
}
