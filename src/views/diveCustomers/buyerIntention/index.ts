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
  import {
		customerType
  } from '../../../dictionary'
	// import ActiveMixin from '../../../mixins/activeMixin'
  
	import { cutInvalidData } from '../../../store/helpers/index'
	
  @Component({})
  export default class Index extends mixins(TableColor) {
	@Action('diveCusClue/getDiveCusClueList') actionDiveCusClueList: any
	@Action('common/getChannelList') actionGetChannelList: any

	@Getter('diveCusClue/getList') diveCusClueListList: any
	
	cache = {
		date: '',
		customerType: '',
  }
  
	form: any = { ...this.cache }
  submit: any
	// cascade: any = {
	// 	region: null,
	// 	channel: null,
	//   province: null,
	//   brand: null,
	//   vehVariety: null,
	//   vehSerices: null,
	//   vehModel: null,
	// }
  
	rules: any = {
	  beginStatisDate: [
		{ required: false, message: '请选择时间' }
	  ],
	  endStatisDate: [
		{ required: false, message: '请选择时间' }
	  ]
	}
	
	value: string = ''
	activeName: string = '1'
	editableTabsValue: string = '2'
	editableTabs: any = [
  {
    name: 1,
    title: '意向车系分析'
  },
  {
    name: 2,
    title: '意向车型分析'
  },
  {
    name: 3,
    title: '购车用途分析'
  },
  {
    name: 4,
    title: '意向颜色分析'
  },
  {
    name: 5,
    title: '参考第一竞品分析'
  },
  {
    name: 6,
    title: '参考第二竞品分析'
  },
  {
    name: 7,
    title: '购车预算分析'
  },
  {
    name: 8,
    title: '购车形态分析'
  },
]

	tabIndex: number = 2
	dealer: any = 0
	select: any = {
	  select1: '',
	  select2: '',
	  select3: '',
	  select4: ''
	}
  
	cascadeContext: any = {
    clear() {}
  }

  regionContext: any = {
    clear() {}
  }
	channelContext: any = {
		clear() {}
	}
  rangeVm: any = {
    clear() {}
  }
  
	customerType: Array<any> = customerType
  
	$refs: any
  
	handleClick(tab, event) {
		// this.cache.endStatisDate = this.processDate()
		// console.log(this.processDate());
	}

	@Watch('form', {deep: true})
	watchSelect(val) {
	  // console.log(val, '----------------------')
	}
	
	@Watch('activeName')
  watchTypeChange(val) {
    this.form = { ...this.cache }
    // this.cascadeContext.clear()
    // this.regionContext.clear()
    // this.channelContext.clear()
    // this.rangeVm.clear()
  }
  
	created() {
		// console.log(this.dealerStatus)
		this.actionGetChannelList()
	}
  
	// timeRangeChange(vm, val) {
  //   this.rangeVm = vm
  //   // console.log(val)
  //   this.form.beginStatisDate = val.beginTime
  //   this.form.endStatisDate = val.endTime
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
      if (valid) {
        // const submit: any = {}
        const submit : any = {}
        Object.assign(submit, props)
        submit.queryType = this.activeName
				// Object.assign(submit, this.cascade)

				this.submit = cutInvalidData(submit)
				console.log('here submit',this.submit)
        this.actionDiveCusClueList(this.submit)
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
	resetForm(formName) {
		this.form = { ...this.cache }
    // this.cascadeContext.clear()
    // this.regionContext.clear()
    // this.channelContext.clear()
    // this.rangeVm.clear()
  }
}
  