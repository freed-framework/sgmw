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
  provincialCapital, carType
} from '../../../dictionary'

const cache = {
  region: 0,
  provincialCapital: 0,
  carType: 0,
  brand: ''
}

@Component
export default class Index extends mixins(TableColor) {
  @Action('finalInventStatist/getFinalInVentStaList') actionGetFinalVentList: any
  @Getter('finallnventStatist/getList') finalInventStatistList: any

  ruleForm: any = { ...cache }
  
  activeName: string = '1'
  editableTabs: any = [{
    title: '期末库存趋势统计-年',
    name: '1'
  }, {
    title: '期末库存趋势统计-月',
    name: '2'
  }]
  tabIndex: number = 2


  provincialCapital: Array<any> = provincialCapital
  carType: Array<any> = carType

  tableData: Array<any> = [{
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    '2008': '上海市普陀区金沙江路 1518 弄',
    '2009': '上海市普陀区金沙江路 1518 弄',
    '2010': '上海市普陀区金沙江路 1518 弄',
    '2011': '上海市普陀区金沙江路 1518 弄',
    '2012': '上海市普陀区金沙江路 1518 弄',
    '2013': '上海市普陀区金沙江路 1518 弄',
    '2014': '上海市普陀区金沙江路 1518 弄',
    '2015': '上海市普陀区金沙江路 1518 弄',
    '2016': '上海市普陀区金沙江路 1518 弄',
    '2017': '上海市普陀区金沙江路 1518 弄'
  }, {
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    '2008': '上海市普陀区金沙江路 1518 弄',
    '2009': '上海市普陀区金沙江路 1518 弄',
    '2010': '上海市普陀区金沙江路 1518 弄',
    '2011': '上海市普陀区金沙江路 1518 弄',
    '2012': '上海市普陀区金沙江路 1518 弄',
    '2013': '上海市普陀区金沙江路 1518 弄',
    '2014': '上海市普陀区金沙江路 1518 弄',
    '2015': '上海市普陀区金沙江路 1518 弄',
    '2016': '上海市普陀区金沙江路 1518 弄',
    '2017': '上海市普陀区金沙江路 1518 弄'
  }, {
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    '2008': '上海市普陀区金沙江路 1518 弄',
    '2009': '上海市普陀区金沙江路 1518 弄',
    '2010': '上海市普陀区金沙江路 1518 弄',
    '2011': '上海市普陀区金沙江路 1518 弄',
    '2012': '上海市普陀区金沙江路 1518 弄',
    '2013': '上海市普陀区金沙江路 1518 弄',
    '2014': '上海市普陀区金沙江路 1518 弄',
    '2015': '上海市普陀区金沙江路 1518 弄',
    '2016': '上海市普陀区金沙江路 1518 弄',
    '2017': '上海市普陀区金沙江路 1518 弄'
  }, {
    cors: '2016-05-02',
    pro: '王小虎',
    code: '上海市普陀区金沙江路 1518 弄',
    type: '上海市普陀区金沙江路 1518 弄',
    '2008': '上海市普陀区金沙江路 1518 弄',
    '2009': '上海市普陀区金沙江路 1518 弄',
    '2010': '上海市普陀区金沙江路 1518 弄',
    '2011': '上海市普陀区金沙江路 1518 弄',
    '2012': '上海市普陀区金沙江路 1518 弄',
    '2013': '上海市普陀区金沙江路 1518 弄',
    '2014': '上海市普陀区金沙江路 1518 弄',
    '2015': '上海市普陀区金沙江路 1518 弄',
    '2016': '上海市普陀区金沙江路 1518 弄',
    '2017': '上海市普陀区金沙江路 1518 弄'
  }]

  $refs: any
  @Watch('ruleForm', {deep: true})
  watchSelect(val) {
    // console.log(val, '----------------------')
  }

  submitForm(ruleForm, index) {
    const $form: any = this.$refs[ruleForm]
    $form.validate((valid) => {
      if (valid) {
        const submit: any = {}
        const { date, ...props } = this.ruleForm
        Object.assign(submit, {
          "province": "全部"
        }, props)
        // console.log(submit)
        this.actionGetFinalVentList(submit)
      } else {
        // console.log('error submit!!')
        return false
      }
    })
  }

  resetForm(ruleForm) {
    this.ruleForm = { ...cache }
  }

  handleClick(tab, event) {
    // console.log(tab, event);
  }

  created() {
    // console.log(this.dealerStatus)
  }

  dateChangeBeginTime(val) {
    // console.log(val);
    const _this = this
    _this.ruleForm.startDatePicker = val;
  }

  dateChangeEndTime(val) {
    // console.log(val);
    this.$refs.form.endDatePicker = val;
  }

}
