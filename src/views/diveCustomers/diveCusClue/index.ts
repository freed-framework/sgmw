import {
    Component,
    Vue,
    Watch
  } from 'vue-property-decorator'
import {
    Tabs,
  } from 'element-ui'  
  
  @Component({
    components: {
      Tabs: Tabs
    }
  })
  export default class Index extends Vue {
    a: string = '9999'
    activeName: string = 'second'
  }
  