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
  import { customerType } from '../../../dictionary'
	import { cutInvalidData } from '../../../store/helpers/index'
  import { download } from '../../../api'
  import DownloadMixin from '../../../mixins/downloadMixin'
  import ActiveMixin from '../../../mixins/activeMixin'

  @Component({})
  export default class Index extends mixins(TableColor, ActiveMixin, DownloadMixin) {
	@Action('buyerIntention/getBuyerIntention') actionBuyerIntentionList: any
	@Action('buyerIntention/resetBuyerIntention') actionResetBuyerIntention: any
	@Getter('buyerIntention/getList') buyerIntentionList: any
	
	cache = {
		date: '',
		customerType: '',
  }
  
	form: any = { ...this.cache }
  submit: any

	value: string = ''
	activeName: string = '1'
	editableTabsValue: string = '2'
	editableTabs: any = [
    {
      name: '1',
      title: '意向车系分析'
    },
    {
      name: '2',
      title: '意向车型分析'
    },
    {
      name: '3',
      title: '购车用途分析'
    },
    {
      name: '4',
      title: '意向颜色分析'
    },
    {
      name: '5',
      title: '参考第一竞品分析'
    },
    {
      name: '6',
      title: '参考第二竞品分析'
    },
    {
      name: '7',
      title: '购车预算分析'
    },
    {
      name: '8',
      title: '购车形态分析'
    },
  ]

	tabIndex: number = 2
	customerType: Array<any> = customerType
  
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
    this.actionResetBuyerIntention()
    this.form = { ...this.cache }
  }
  
	created() {
		// console.log(this.dealerStatus)
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

				this.submit = cutInvalidData(submit)
				console.log('here submit',this.submit)
        this.actionBuyerIntentionList(this.submit)
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
    this.download(download.buyerIntention, this.submit)
  }

	resetForm(formName) {
    this.actionResetBuyerIntention()
		this.form = { ...this.cache }
  }

  beforeDestroy() {
    this.actionResetBuyerIntention()
		this.form = { ...this.cache }
  }
}
  