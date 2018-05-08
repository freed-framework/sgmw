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
  customerType,
} from '../../../dictionary'
import { download } from '../../../api'
import DownloadMixin from '../../../mixins/downloadMixin'
import { cutInvalidData } from '../../../store/helpers/index'

@Component({
})
export default class Index extends mixins(TableColor, ActiveMixin, DownloadMixin) {
  @Action('finalInventStatist/getFinalInVentStaList') actionGetFinalInVentStaList: any
  @Getter('finalInventStatist/getList') finalInventStatistList: any
  
  cache = {
    date: '',
    customerType: '',
  }

  form: any = { ...this.cache }

  rules: any = {
    date: [
      { required: false, message: '请选择时间' }
    ],
  }
  
  editableTabsValue: string = '2'
  editableTabs: any = [{
    title: '个人收入',
    name: '1'
  }, {
    title: '家庭月收入',
    name: '2'
  }, {
    title: '文化水平',
    name: '3'
  }, {
    title: '从事行业',
    name: '4'
  }, {
    title: '从事职业',
    name: '5'
  }, {
    title: '车辆使用地市',
    name: '6'
  }, {
    title: '车辆使用区县',
    name: '7'
  }, {
    title: '进店次数',
    name: '8'
  }, {
    title: '进店次数与成交',
    name: '9'
  }, {
    title: '年龄段',
    name: '10'
  }
]
  tabIndex: number = 2
  // select: any = {
  //   select1: '',
  //   select2: '',
  //   select3: '',
  //   select4: ''
  // }


  customerType: Array<any> = customerType

  $refs: any


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
      if(!this.form.date) {
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
    // this.cascadeContext.clear()
    // this.regionContext.clear()
    // this.rangeVm.clear()
  }
}
