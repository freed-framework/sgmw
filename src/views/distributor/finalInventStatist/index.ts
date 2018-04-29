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
import AreaData from '../../../dictionary/area'
import {
  carType
} from '../../../dictionary'
import Region from '../../../components/region/index.vue'
import constantRoutes from '@/router/routes';

const cache = {
  carType: '全部',
  brand: '',
  province: '全部'
}

@Component({
  components: {
    Region
  }
})
export default class Index extends mixins(TableColor) {
  @Action('finalInventStatist/getFinalInVentStaList') actionFinalInventStatistList: any
  @Getter('finalInventStatist/getList') finalInventStatistList: any
  ruleForm: any = { ...cache }
  
  activeName: string = '1'
  region: any = '0'
  editableTabs: any = [{
    title: '期末库存趋势统计-年',
    name: '1'
  }, {
    title: '期末库存趋势统计-月',
    name: '2'
  }]
  tabIndex: number = 2

  carType: Array<any> = carType
  regionList: any = AreaData.region_list
  provinceList: any = AreaData.province_list

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
  // @Watch('ruleForm', {deep: true})
  @Watch('region', {deep: true})
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
    // console.log(province)
    this.provinceList = province
    this.ruleForm.province = '全部'
  }

  submitForm(ruleForm, index) {
    const $form: any = this.$refs[ruleForm]
    $form.validate((valid) => {
      if (valid) {
        const submit: any = {}
        const { ...props } = this.ruleForm
        const regionValue = this.region
        Object.assign(submit, props)
        Object.assign(submit, regionValue)
        console.log(submit)
        this.actionFinalInventStatistList(submit)
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  resetForm(ruleForm) {
    this.ruleForm = { ...cache }
    this.region = '0'
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
