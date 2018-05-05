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
	
  @Component({
	components: {
	  Brand,
		Region,
		Channel,
	}
  })
  export default class Index extends mixins(TableColor, ActiveMixin) {
	@Action('diveCusClue/getDiveCusClueList') actionDiveCusClueList: any
	@Getter('diveCusClue/getList') diveCusClueListList: any
	
	cache = {
	  leadChannel: null,
	  factoryCard: null,
	  carType: null,
	  // kinds: null,
	  // testDrive: null,
	  // pcaArea: null,
	  // dealerId: null,
	  materialId: null,
	  vehColor: null,
	  // beginStatisDate: '',
	  // endStatisDate: '',
		leadType: '',

		month: '',
		brand: '',
		dealer: '',
		clueType: '',

	}
	form: any = { ...this.cache }
  
	cascade: any = {
		region: null,
		channel: null,
	  province: null,
	  brand: null,
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

	@Watch('form', {deep: true})
	watchSelect(val) {
	  // console.log(val, '----------------------')
	}
	
	@Watch('activeName')
  watchTypeChange(val) {
    this.form = { ...this.cache }
    this.cascadeContext.clear()
    this.regionContext.clear()
    this.channelContext.clear()
    this.rangeVm.clear()
  }
  
	created() {
	  // console.log(this.dealerStatus)
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
      {
        province: data[0] ? data[0].label : null,
        city: data[1] ? data[1].label : null, countyArea: data[2] ? data[2].label : null
      }
    )
  }
	handleChannelChange(vm, data = {}) {
    this.channelContext = vm
    Object.assign(this.cascade,
      {
        province: data[0] ? data[0].label : null,
        city: data[1] ? data[1].label : null, countyArea: data[2] ? data[2].label : null
      }
    )
  }
  
  
	submitForm(form) {
    const $form: any = this.$refs[form]
    $form.validate((valid) => {
			const { ...props } = this.form
      // if(!this.form.beginStatisDate && !this.form.endStatisDate) {
      //   this.$message({
      //     center: true,
      //     showClose: true,
      //     message: '请选择日期',
      //     type: 'warning'
      //   });
      //   return
      // }
      if (valid) {
        // const submit: any = {}
        const submit : any = {}
        Object.assign(submit, props)
        submit.queryType = this.activeName
				Object.assign(submit, this.cascade)

				let params = cutInvalidData(submit)
				console.log('here submit',params)
        this.actionDiveCusClueList(params)
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
	resetForm(formName) {
		this.form = { ...this.cache }
    this.cascadeContext.clear()
    this.regionContext.clear()
    this.channelContext.clear()
    this.rangeVm.clear()
  }
}
  