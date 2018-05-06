/* eslint-disable */
import {
    Component,
    Vue,
    Watch
  } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TableColor from '../../../mixins/table-color/index.vue'
import {
  customerType
} from '../../../dictionary/index.js'

  @Component
  export default class Index extends mixins(TableColor) {
    a: string = '9999'
    activeName: number = 1
    value4: string = ''
    tabs: Object = [
      {
        key: 1,
        text: '意向车系分析'
      },
      {
        key: 2,
        text: '意向车型分析'
      },
      {
        key: 3,
        text: '购车用途分析'
      },
      {
        key: 4,
        text: '意向颜色分析'
      },
      {
        key: 5,
        text: '参考第一竞品分析'
      },
      {
        key: 6,
        text: '参考第二竞品分析'
      },
      {
        key: 7,
        text: '购车预算分析'
      },
      {
        key: 8,
        text: '购车形态分析'
      },
    ]
  
    form: any = {
      customerType: '',
    }
  
    customerType: Array<any> = customerType
    // kpi: Array<any> = kpi
  
    tableData: Array<any> = [{
      area: '东北区域',
      province: '黑龙江',
      date: '2016-05-02',
      response_num: '11',
      sendnum: '11',
      response_rate: '100.00'
    }, {
      area: '东北区域',
      province: '黑龙江',
      date: '2016-05-02',
      response_num: '11',
      sendnum: '11',
      response_rate: '100.00'
    }]
  
    submitForm(formName,index) {
      console.log(1111,formName,index)
      const $form: any = this.$refs[formName]
      console.log($form)
      $form[index-1].validate((valid) => {
        if (valid) {
          console.log(this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  
    resetForm(formName, index) {
      const $form: any = this.$refs[formName]
      $form[index-1].resetFields();
    }
  }
  
  // export default class Index extends Vue {
  //   a: string = '9999'
  //   activeName: number = 1
  //   tabs: Object = [
  //     {
  //       key: 1,
  //       text: '线索响应率'
  //     },
  //     {
  //       key: 2,
  //       text: '线索有效率'
  //     },
  //     {
  //       key: 3,
  //       text: '线索成交率'
  //     },
  //     {
  //       key: 4,
  //       text: '线索战败率'
  //     },
  //     {
  //       key: 5,
  //       text: '线索试驾率'
  //     },
  //     {
  //       key: 6,
  //       text: '线索响应时间'
  //     },
  //     {
  //       key: 7,
  //       text: '渠道线索量'
  //     },
  //     {
  //       key: 8,
  //       text: '战败原因'
  //     },
  //   ]
  
  // }
  