import {
    Component,
    Vue,
    Watch
  } from 'vue-property-decorator'
  
  @Component({
    components: {
    }
  })
  export default class Index extends Vue {
    a: string = '9999'
    activeName: number = 1
    tabs: Object = [
      {
        key: 1,
        text: '线索响应率'
      },
      {
        key: 2,
        text: '线索有效率'
      },
      {
        key: 3,
        text: '线索成交率'
      },
      {
        key: 4,
        text: '线索战败率'
      },
      {
        key: 5,
        text: '线索试驾率'
      },
      {
        key: 6,
        text: '线索响应时间'
      },
      {
        key: 7,
        text: '渠道线索量'
      },
      {
        key: 8,
        text: '战败原因'
      },
    ]
  
  }
  