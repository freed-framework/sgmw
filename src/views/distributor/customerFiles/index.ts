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
  import DownloadMixin from '../../../mixins/downloadMixin'
  import {
    dealerStatus, customerLevel, customerType,
    provincialCapital, factoryCard, cityCapital, countyAreaCapital,
    carType, carKinds, carBrands,
  } from '../../../dictionary'
  import Brand from '../../../components/brand/index.vue'
  import Region from '../../../components/region/index.vue'
  import TimeRange from '../../../components/timeRanage/index.vue'
  import { download } from '../../../api'
  
  @Component({
    components: {
      Brand,
      Region,
      TimeRange
    }
  })
  export default class Index extends mixins(TableColor, ActiveMixin, DownloadMixin) {
    @Action('customerFiles/getCustomerFilesList') getCustomerFilesList: any
    @Action('customerFiles/resetCustomerFilesList') resetCustomerFilesList: any
    @Getter('customerFiles/getList') customerFilesList: any
    cache = {
      dealerId: '',
      dealerAbbr: '',
    }
    form: any = { ...this.cache }

    timeRange: any = {
      type: 'date',
      format: 'yyyy-MM-dd'
    }
  
    cascade: any = {
      province: '',
      city: '',
      region: '',
    }
  
    regionContext: any = {
      clear() {}
    }
  
    rangeVm: any = {
      clear() {}
    }
    
    activeName: string = '1'
    editableTabsValue: string = '2'
    editableTabs: any = [{
      title: '客户统计-年',
      name: '1'
    }, {
      title: '客户统计-月',
      name: '2'
    }, {
      title: '客户统计-日',
      name: '3'
    }]
    tabIndex: number = 2
  
    dealerStatus: Array<any> = dealerStatus
    customerLevel: Array<any> = customerLevel
    customerType: Array<any> = customerType
    cityCapital: Array<any> = cityCapital
    countyAreaCapital: Array<any> = countyAreaCapital
    provincialCapital: Array<any> = provincialCapital
    factoryCard: Array<any> = factoryCard
    carType: any = carType
    carKinds: any = carKinds

    exportChecked: any = ['DealerId','DealerAbbr','VIN', 'CustName', 'BuilRecoDate', 'SubmVehDate', 'InvoiceDate', 'MadeTime', 'QualifiedID' ]

    exportFieldsOption: Array<any> = [
{fieldName:'经销商号',fieldValue:'DealerId'},
{fieldName:'经销商简称',fieldValue:'DealerAbbr'},
{fieldName:'车架号',fieldValue:'VIN'},
{fieldName:'客户名称',fieldValue:'CustName'},
{fieldName:'座机',fieldValue:'CustTel'},
{fieldName:'手机',fieldValue:'CustPhone'},
{fieldName:'建档时间',fieldValue:'BuilRecoDate'},
{fieldName:'交车日期',fieldValue:'SubmVehDate'},
{fieldName:'开票日期',fieldValue:'InvoiceDate'},
{fieldName:'制造日期',fieldValue:'MadeTime'},
{fieldName:'合格证号',fieldValue:'QualifiedID'},
{fieldName:'车型代码',fieldValue:'VehModelID'},
{fieldName:'QQ',fieldValue:'QQ'},
{fieldName:'SGMW审核结果',fieldValue:'SGMWAudiResults'},
{fieldName:'厂发线索编号',fieldValue:'SGMWClueID'},
{fieldName:'厂发线索渠道',fieldValue:'SGMWClueChannelName'},
{fieldName:'车辆使用场所',fieldValue:'VehUsePosition'},
{fieldName:'车辆用途',fieldValue:'VehUse'},
{fieldName:'车牌号',fieldValue:'PlateNum'},
{fieldName:'车系',fieldValue:'VehSerices'},
{fieldName:'出生年月日',fieldValue:'Birthday'},
{fieldName:'电子邮件',fieldValue:'CustMail'},
{fieldName:'发动机号',fieldValue:'EngineID'},
{fieldName:'付款方式分期贷款金额',fieldValue:'PayWay_LoanAmount'},
{fieldName:'付款方式分期贷款利率',fieldValue:'PayWay_LoanRate'},
{fieldName:'付款方式分期贷款期限',fieldValue:'PayWay_LoanCount'},
{fieldName:'付款方式分期首付金额',fieldValue:'PayWay_DownPayAmount'},
{fieldName:'付款方式一次性方式',fieldValue:'PayWay_Once'},
{fieldName:'个人月收入水平',fieldValue:'CustIncome'},
{fieldName:'购买类型',fieldValue:'PurcType'},
{fieldName:'基地代码',fieldValue:'BaseID'},
{fieldName:'集团车',fieldValue:'GroupVeh'},
{fieldName:'家庭月收入水平',fieldValue:'FamiIncome'},
{fieldName:'经销商申请修改人',fieldValue:'Updater'},
{fieldName:'经销商申请修改状态',fieldValue:'UpdateStatus'},
{fieldName:'经销商申请修改时间',fieldValue:'UpdateTime'},
{fieldName:'经销商审核人',fieldValue:'DealAuditor '},
{fieldName:'经销商审核时间',fieldValue:'DealAudiTime'},
{fieldName:'开票价格',fieldValue:'InvoPrice'},
{fieldName:'客户编号',fieldValue:'CustID'},
{fieldName:'客户类型',fieldValue:'CustType'},
{fieldName:'客户性别',fieldValue:'CustSex'},
{fieldName:'渠道',fieldValue:'Channel'},
{fieldName:'身份证地址/户籍地址',fieldValue:'PermAdd'},
{fieldName:'身份证地址所在城市',fieldValue:'IDCity'},
{fieldName:'身份证地址所在省份',fieldValue:'IDProvince'},
{fieldName:'身份证地址所在县区',fieldValue:'IDCounty'},
{fieldName:'实际地址',fieldValue:'ActulAddr'},
{fieldName:'使用性质',fieldValue:'UseType'},
{fieldName:'是否愿意参加活动',fieldValue:'IfActivity'},
{fieldName:'所属城市',fieldValue:'City'},
{fieldName:'所属地区',fieldValue:'Region'},
{fieldName:'所在省份',fieldValue:'Province'},
{fieldName:'统计日期',fieldValue:'StatisDate'},
{fieldName:'微信',fieldValue:'WeChat'},
{fieldName:'文化程度',fieldValue:'EducLevel'},
{fieldName:'物料号',fieldValue:'MaterialID'},
{fieldName:'线索数据来源',fieldValue:'LeadsDataSource'},
{fieldName:'销售公司审核人',fieldValue:'SGMWAuditor'},
{fieldName:'销售公司审核时间',fieldValue:'SGMWAudiTime'},
{fieldName:'销售员',fieldValue:'SalesMan'},
{fieldName:'新车保险-承保公司',fieldValue:'InsurCompany'},
{fieldName:'新车保险-交强险',fieldValue:'InsurCTAL'},
{fieldName:'新车保险-金额',fieldValue:'InsurAmount'},
{fieldName:'新车保险-商业险',fieldValue:'InsurBusiness'},
{fieldName:'信息来源-介绍-手机',fieldValue:'IntrPhone'},
{fieldName:'信息来源-介绍-姓名',fieldValue:'Introducer'},
{fieldName:'型号/车型',fieldValue:'VehModel'},
{fieldName:'行业',fieldValue:'Trade'},
{fieldName:'颜色',fieldValue:'VehColor'},
{fieldName:'邮编',fieldValue:'ZipCode'},
{fieldName:'原厂发线索编号',fieldValue:'OldSGMWClueID'},
{fieldName:'增/换购前品牌车型',fieldValue:'OldVehBrand'},
{fieldName:'证件号码',fieldValue:'CustCardId'},
{fieldName:'证件类型',fieldValue:'CustIDType'},
{fieldName:'职业',fieldValue:'Job'},
{fieldName:'自建线索流水号',fieldValue:'DealClueID'},
{fieldName:'最后修改时间',fieldValue:'FinalUpdaTime'},
    ]

    carBrands: any = carBrands
    SGMWAudiResults: Array<any> = [{label:'全部'},{label:'审核通过'},{label:'审核未通过'}]
    GroupVeh: Array<any> = [{label:'全部'},{label:'集团车'},{label:'非集团车'}]
    UpdateStatus: Array<any> = [{label:'全部', value: '全部'},{label:'已修改', value: 1},{label:'未修改', value: 0}]
    syxz: any = [{label:'全部'},{label:'个人用车'},{label:'单位用车'}]
  
    tjRangeChange(vm, val) {
      // console.log(val)
      this.form.beginStatisDate = val.beginTime
      this.form.endStatisDate = val.endTime
    }
  
    jdRangeChange(vm, val) {
      // console.log(val)
      this.form.beginCreaDate = val.beginTime
      this.form.endCreaDate = val.endTime
    }
  
    kpRangeChange(vm, val) {
      // console.log(val)
      this.form.beginInvoiceDate = val.beginTime
      this.form.endInvoiceDate = val.endTime
    }
  
    jcRangeChange(vm, val) {
      // console.log(val)
      this.form.beginSubmVehDate = val.beginTime
      this.form.endSubmVehDate = val.endTime
    }
  
    khsrRangeChange(vm, val) {
      // console.log(val)
      this.form.beginBirthday = val.beginTime
      this.form.endBirthday = val.endTime
    }
  
    jxsshRangeChange(vm, val) {
      // console.log(val)
      this.form.beginDealAudiTime = val.beginTime
      this.form.endDealAudiTime = val.endTime
    }


   
  
    $refs: any
  
    handleClick(tab, event) {
      this.resetForm(this.form)
      // console.log(tab, event);
    }
  
    created() {
      // console.log(this.dealerStatus)
    }
  
  
  
    handlePageChange(num) {
      const all = Object.assign({}, this.form, this.cascade)
      const params = Object.assign({}, all, {
        pageNum: num
      })

      this.getCustomerFilesList(params)
    }
  
    handleRegionChange(vm, data = {}) {
      this.regionContext = vm
      Object.assign(this.cascade,
        {
          province: data[0] ? data[0].label : '',
          city: data[1] ? data[1].label : '',
          region: data[2] ? data[2].label : '',
        }
      )
    }

    handleCxcxChange(vm, data = {}) {
      this.form.vehSerices = data[0] ? data[0].label : ''
      this.form.vehModel = data[1] ? data[1].label : ''
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
          this.getCustomerFilesList(submit)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    getExportParams(arr = []) {
      const map = []
      arr.forEach(k => {
        const finder = this.exportFieldsOption.find(item => item.fieldValue === k)

        if (finder) {
          const value = `${finder.fieldName} = ${finder.fieldValue}`
          map.push(value)
        }
      })
      const str = map.join(',');
      return str
    }
  
    exportList(form) {
      const submit : any = {}

      const params = this.getExportParams(this.exportChecked)

      this.exportChecked = ['DealerId','DealerAbbr','VIN', 'CustName', 'BuilRecoDate', 'SubmVehDate', 'InvoiceDate', 'MadeTime', 'QualifiedID' ]
      this.download(download.custfiles, {exportMap: params})
    }
  
  
    resetForm(form) {
      this.resetCustomerFilesList()
      this.form = { ...this.cache }
      this.regionContext.clear()
      this.rangeVm.clear()
    }
  
    beforeDestroy() {
      this.resetCustomerFilesList()
      this.form = { ...this.cache }
      this.regionContext.clear()
      this.rangeVm.clear()
    }

  }
  