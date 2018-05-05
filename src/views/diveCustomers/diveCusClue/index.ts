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
	dealerStatus, customerLevel, customerType, leadChannel, dealerleadChannel,
	finalResult, testDrive, leadStatus, carType, kinds, factoryCard, pcaArea, leadType
  } from '../../../dictionary'
  import Brand from '../../../components/brand/index.vue'
  import Region from '../../../components/region/index.vue'
  
  @Component({
	components: {
	  Brand,
	  Region,
	}
  })
  export default class Index extends mixins(TableColor, ActiveMixin) {
	@Action('salesStatistics/getSalesStatisticsList') actionSalesStatisticsList: any
	@Getter('salesStatistics/getList') salesStatisticsList: any
	
	cache = {
	  leadChannel: null,
	  factoryCard: null,
	  carType: null,
	  kinds: null,
	  testDrive: null,
	  pcaArea: null,
	  dealerId: null,
	  queryType: '1',
	  materialId: null,
	  vehColor: null,
	  beginStatisDate: '',
	  endStatisDate: '',
	  leadType: '',
	}
	form: any = { ...this.cache }
  
	cascade: any = {
	  region: null,
	  province: null,
	  brand: null,
	  vehVariety: null,
	  vehSerices: null,
	  vehModel: null,
	  p: null,
	  c: null,
	  a: null
	}
  
	rules: any = {
	  beginStatisDate: [
		{ required: false, message: '请选择时间' }
	  ],
	  endStatisDate: [
		{ required: false, message: '请选择时间' }
	  ]
	}
	
	editableTabsValue: string = '2'
	value: string = ''
	tabs: any = [{
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
	pcaArea: Array<any> = pcaArea
	leadType: Array<any> = leadType
  
	$refs: any
  
	@Watch('select')
	watchSelect(val) {
	  // console.log(val, '----------------------')
	}
  
	handleClick(tab, event) {
	  // this.cache.endStatisDate = this.processDate()
	  // console.log(this.processDate());
	}
  
	created() {
	  // console.log(this.dealerStatus)
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
		{province: data[0] ? data[0].label : null, city: data[1] ? data[1].label : null}
	  )
	}
  
	dateChangeBeginTime(val) {
	  console.log(val);
	  this.form.beginStatisDate = val;
	}
  
	dateChangeEndTime(val) {
	  console.log(val);
	  this.$refs.form.endStatisDate = val;
	}
  
	submitForm(form) {
	  const $form: any = this.$refs[form]
	  $form.validate((valid) => {
		const { ...props } = this.form
		let queryType = '1'
		if (this.activeName) {
		  if(this.activeName === '1') {
			queryType = '1'
		  } else if (this.activeName === '2') {
			queryType = '2'
		  } else {
			queryType = '3'
		  }
		}
		if(props.beginStatisDate) {
		  console.log(props.beginStatisDate < props.endStatisDate)
		}
		// if(!props.beginTime && !props.endTime) {
		//   this.$message({
		// 	center: true,
		// 	showClose: true,
		// 	message: '请选择日期',
		// 	type: 'warning'
		//   });
		//   return
		// }
		if (valid) {
		  // const submit: any = {}
		  const submit : any = {}
		  Object.assign(submit, props)
		  submit.endStatisDate = props.endTime;
		  Object.assign(submit, this.cascade)
		  Object.assign(submit, queryType)
		  this.actionSalesStatisticsList(submit)
		} else {
		  console.log('error submit!!')
		  return false
		}
	  })
	}
  
	resetForm(form) {
	  this.form = { ...this.cache }
	  this.cascadeContext.clear()
	  this.regionContext.clear()
	}
  }
  