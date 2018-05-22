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
  import { customerType1 } from '../../../dictionary'
	import { cutInvalidData } from '../../../store/helpers/index'
	import { download } from '../../../api'
  import DownloadMixin from '../../../mixins/downloadMixin'
  import ActiveMixin from '../../../mixins/activeMixin'

  @Component({})
  export default class Index extends mixins(TableColor, ActiveMixin, DownloadMixin) {
	@Action('diveFeature/getDiveFeature') actionDiveFeature: any
	@Action('diveFeature/resetDiveFeatureList') actionResetDiveFeatureList: any
	@Getter('diveFeature/getList') diveFeatureList: any
	
	cache = {
		visitTime: '',
		custLevel: '直接来店',
  }
  
	form: any = { ...this.cache }
  submit: any

	value: string = ''
	activeName: string = '个人月收入'
	editableTabsValue: string = '2'
	editableTabs: any = [
    {
      name: '个人月收入',
      title: '个人月收入'
    },
    {
      name: '家庭月收入',
      title: '家庭月收入'
    },
    {
      name: '文化水平',
      title: '文化水平'
    },
    {
      name: '从事行业',
      title: '从事行业'
    },
    {
      name: '从事职业',
      title: '从事职业'
    },
    {
      name: '车辆使用地市',
      title: '车辆使用地市'
    },
    {
      name: '车辆使用区县',
      title: '车辆使用区县'
    },
    {
      name: '进店次数',
      title: '进店次数'
    },
    {
      name: '进店次数与成交',
      title: '进店次数与成交'
    },
    {
      name: '年龄段',
      title: '年龄段'
    },
  ]

	tabIndex: number = 2

  customerType: Array<any> = customerType1
  
	$refs: any
  
	handleClick(tab, event) {
		// this.cache.endStatisDate = this.processDate()
		// console.log(this.processDate());
	}

	// @Watch('form', {deep: true})
	// watchSelect(val) {
	//   // console.log(val, '----------------------')
	// }
	
	@Watch('activeName')
  watchTypeChange(val) {
    this.actionResetDiveFeatureList()
    this.form = { ...this.cache }
  }
  
	created() {
		// console.log(this.dealerStatus)
	}
  
	submitForm(form) {
    const $form: any = this.$refs[form]

    $form.validate((valid) => {
      const { ...props } = this.form
      
      if(!this.form.visitTime) {
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
        submit.lb = this.activeName
        submit.queryType = '2'

				this.submit = cutInvalidData(submit)
				console.log('here submit',this.submit)
        this.actionDiveFeature(this.submit)
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

    this.submit = cutInvalidData(submit)
    this.download(download.feature, this.submit)
  }

	resetForm(formName) {
    this.actionResetDiveFeatureList()
		this.form = { ...this.cache }
  }

  beforeDestroy() {
    this.actionResetDiveFeatureList()
		this.form = { ...this.cache }
  }
}
  