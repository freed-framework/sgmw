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
import ActiveMixin from '../../../mixins/activeMixin'
import DownloadMixin from '../../../mixins/downloadMixin'
import {
  carType
} from '../../../dictionary'
import Brand from '../../../components/brand/index.vue'
import Region from '../../../components/region/index.vue'
import { download } from '../../../api'

@Component({
  components: {
    Brand,
    Region
  }
})
export default class Index extends mixins(TableColor, ActiveMixin, DownloadMixin) {
  @Action('finalInventStatist/getFinalInVentStaList') actionFinalInventStatistList: any
  @Getter('finalInventStatist/getList') finalInventStatistList: any

  cascade: any = {
    region: null,
    province: null,
    brand: null,
    vehVariety: null
  }

  cascadeContext: any = {
    clear() {}
  }

  regionContext: any = {
    clear() {}
  }
  
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
  // handlePageChange(...props) {
  //   // console.log(props)
  //   // this.submit.cu = 
  //   // this.actionGetFinalInVentStaList()
  // }

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
    // $form.validate((valid) => {
      // if (valid) {
        const submit: any = {}   
        Object.assign(submit, this.cascade)
        this.actionFinalInventStatistList(submit)
    //   } else {
    //     console.log('error submit!!')
    //     return false
    //   }
    // })
  }

  exportList(form) {
    const $form: any = this.$refs[form]
    const submit : any = {}
    Object.assign(submit, this.cascade)
    submit.queryType = this.activeName
    Object.assign(submit, this.cascade)
    this.download(download.sales, submit)
  }

  get exquery() {
    const submit : any = {}
    Object.assign(submit, this.cascade)
    submit.queryType = this.activeName
    Object.assign(submit, this.cascade)

    return submit
  }

  resetForm(ruleForm) {
    this.cascadeContext.clear()
    this.regionContext.clear()
  }

  handleClick(tab, event) {
    // console.log(tab, event);
  }

}
