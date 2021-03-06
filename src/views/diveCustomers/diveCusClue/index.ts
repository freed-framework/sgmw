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
		dealerStatus, customerLevel, customerType, leadChannel, dealerleadChannel, carBrands,
		finalResult, testDrive, leadStatus, carType, kinds, factoryCard, leadType
  } from '../../../dictionary'
	import ActiveMixin from '../../../mixins/activeMixin'
	import Brand from '../../../components/brand/index.vue'
  import Region from '../../../components/region/index.vue'
  import Channel from '../../../components/channel/index.vue'
	import { cutInvalidData } from '../../../store/helpers/index'
	import { download } from '../../../api'
  import DownloadMixin from '../../../mixins/downloadMixin'
	
  @Component({
	components: {
		Brand,
		Region,
		Channel,
	}
  })
  export default class Index extends mixins(TableColor, ActiveMixin, DownloadMixin) {
	@Action('diveCusClue/getDiveCusClueList') actionDiveCusClueList: any
	@Action('diveCusClue/resetDiveCusClueList') actionResetDiveCusClueList: any
	@Action('common/getChannelList') actionGetChannelList: any

	@Getter('diveCusClue/getList') diveCusClueListList: any
	
	cache = {
	  leadChannel: null,
	  factoryCard: null,
	  carType: null,
	  
	  materialId: null,
	  vehColor: null,
		leadType: '',

		date: '',
		brand: '',
		dealer: '',
		clueType: '',

	}
	form: any = { ...this.cache }
  submit: any
	cascade: any = {
		region: null,
		channel: null,
	  province: null,
	  // brand: null,
	  vehVariety: null,
	  vehSerices: null,
	  vehModel: null,
	}
  
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
	editableTabs: any = [{
	  title: '线索响应率',
	  name: '1'
	}, {
	  title: '线索有效率',
	  name: '2'
	}, {
	  title: '线索成交率',
	  name: '3'
	},{
		title: '线索战败率',
		name: '4'
	},{
		title: '线索试驾率',
		name: '5'
	},{
		title: '线索响应时间',
		name: '6'
	},{
		title: '渠道线索量',
		name: '7'
	},{
		title: '战败原因',
		name: '8'
	}
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
  
	leadChannel: Array<any> = leadChannel
	testDrive: Array<any> = testDrive
	dealerStatus: Array<any> = dealerStatus
	customerLevel: Array<any> = customerLevel
	customerType: Array<any> = customerType
	dealerleadChannel: Array<any> = dealerleadChannel
	leadStatus: Array<any> = leadStatus
	factoryCard: Array<any> = factoryCard
	finalResult: Array<any> = finalResult
	carType: Array<any> = carType
	kinds: Array<any> = kinds
	leadType: Array<any> = leadType
	carBrands: Array<any> = carBrands
  
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
		this.actionResetDiveCusClueList()
    this.form = { ...this.cache }
    this.cascadeContext.clear()
    this.regionContext.clear()
    this.channelContext.clear()
    this.rangeVm.clear()
  }
  
	created() {
		// console.log(this.dealerStatus)
		this.actionGetChannelList()
	}
  
	timeRangeChange(vm, val) {
    this.rangeVm = vm
    // console.log(val)
    this.form.beginStatisDate = val.beginTime
    this.form.endStatisDate = val.endTime
  }

	handleCacadeChange(vm, data = {}) {
    this.cascadeContext = vm
    Object.assign(this.cascade,
      {
        // brand: data[0] ? data[0].label : null,
        // variety: data[1] ? data[1].label : null,
        carType: data[0] ? data[0].label : null,
        carVersion: data[1] ? data[1].label : null
      }
    )
  }

  handlePageChange(val) {
    // console.log(val)
    let param = this.submit;
    param.pageNum = val;
    this.actionDiveCusClueList(param)
  }
	handleRegionChange(vm, data = {}) {
    this.regionContext = vm
    Object.assign(this.cascade,
      {
        region: data[0] ? data[0].label : null,
				province: data[1] ? data[1].label : null,
      }
    )
  }
	handleChannelChange(vm, data = {}) {
    this.channelContext = vm
    Object.assign(this.cascade,
      {
        platform: data[0] ? data[0].label : null,
				mainChannel: data[1] ? data[1].label : null,
				partChannel: data[2] ? data[2].label : null,
				// subChannel: data[3] ? data[3].label : null
      }
		)
		
		this.form = {
			...this.form,
			...this.cascade,
		}
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
        // const submit: any = {}
        const submit : any = {}
        Object.assign(submit, props)
        submit.queryType = this.activeName
				Object.assign(submit, this.cascade)

				this.submit = cutInvalidData(submit)
				// console.log('here submit',this.submit)
        this.actionDiveCusClueList(this.submit)
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
    submit.queryType = this.activeName
		Object.assign(submit, this.cascade)

    this.submit = cutInvalidData(submit)
		// console.log(this.submit)
    this.download(download.diveCusClue, this.submit)
	}

	get exquery() {
    const { ...props } = this.form
    const submit : any = {}
    Object.assign(submit, props)
    submit.queryType = this.activeName
		Object.assign(submit, this.cascade)

		// this.submit = cutInvalidData(submit)
		return submit
	}
	
	resetForm(formName) {
		this.actionResetDiveCusClueList()
		this.form = { ...this.cache }
    this.cascadeContext.clear()
    this.regionContext.clear()
    this.channelContext.clear()
    this.rangeVm.clear()
	}
	
	beforeDestroy() {
    this.actionResetDiveCusClueList()
		this.form = { ...this.cache }
    this.cascadeContext.clear()
    this.regionContext.clear()
    this.channelContext.clear()
    this.rangeVm.clear()
  }
}
  