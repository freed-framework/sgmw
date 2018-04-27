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
import Cascade from '../../../components/cascade/index.vue'

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


  form: any = {
    date: [new Date(Number(new Date()) - 40000), new Date()]
  }

  dealerStatus: Array<any> = dealerStatus
  customerLevel: Array<any> = customerLevel
  customerType: Array<any> = customerType
  leadChannel: Array<any> = leadChannel
  finalResult: Array<any> = finalResult
  testDrive: Array<any> = testDrive
  kpi: Array<any> = kpi

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
        Object.assign(submit, {
            "province": "全部"
        }, props)
        this.actionGetKpiList(submit)
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  resetForm(formName) {
    const $form: any = this.$refs[formName]
    $form.resetFields()
  }
}
