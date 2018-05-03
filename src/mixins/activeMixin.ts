/* eslint-disable */
import { Watch } from 'vue-property-decorator'
import { Component, Vue } from 'vue-property-decorator'

const conf = {
  '1': {
    type: 'year',
    format: 'yyyy'
  },
  '2': {
    type: 'month',
    format: 'yyyy-MM'
  },
  '3': {
    type: 'date',
    format: 'yyyy-MM-dd'
  }
}

@Component
export default class ActiveMixin extends Vue {
  activeName: string = '1'
  timeRange: any = conf[this.activeName]

  @Watch('activeName')
  watchActiveChange(val) {
    this.timeRange = conf[val]
  }
}
