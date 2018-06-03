<template>
  <!-- <cascade
    :data="regionList"
    :hasAll="hasAll"
    :cols="cols"
    :force="force"
    :colLabel="colLabel"
    :placeholders="placeholders"
    :defaultAll="defaultAll"
    @change="change"
  /> -->
  <span></span>
</template>

<script lang="ts">
/* eslint-disable */
import { Getter } from 'vuex-class'
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import Cascade from '../cascade/index.vue'

@Component({
  components: { Cascade }
})
export default class Region extends Vue {
  name: string = 'Region'

  @Getter('common/regionList') regionList: any

  // 是否包含“全部”选项发
  @Prop({default: true}) hasAll: boolean
  // 显示几项 1-4之间
  @Prop({default: () => [0, 3]}) cols: Array<any>
  // 是否强制联动,(必须前面选了后面才能选)， 默认false
  @Prop({default: true}) force: boolean
  // 默认选中(暂不支持)
  @Prop() default: Array<any>
  // 没项label
  @Prop({default: () => ['区域', '省份', '城市', '县区']}) colLabel: Array<string>
  // placeholders
  @Prop({default: () => []}) placeholders: Array<string>
  // 是否默认选中全部
  @Prop({default: false}) defaultAll: boolean

  data: any = [
  {
    100000: {
      label: 'xxx',
      key: '100000',
      value: '100000'
    },
    200000: {
      label: 'xxx',
      key: '200000',
      value: '200000'
    }
  },
  {
    110000: {
      label: 'xxx',
      key: '110000',
      value: 'xxx'
    },
    120000: {
      label: 'xxx',
      key: '120000',
      value: 'xxx'
    },
    210000: {
      label: 'xxx',
      key: '210000',
      value: 'xxx'
    },
    220000: {
      label: 'xxx',
      key: '220000',
      value: 'xxx'
    }
  },
  {
    111000: {
      label: 'xxx',
      key: '111000',
      value: 'xxx'
    },
    121000: {
      label: 'xxx',
      key: '121000',
      value: 'xxx'
    },
    211000: {
      label: 'xxx',
      key: '211000',
      value: 'xxx'
    },
    221000: {
      label: 'xxx',
      key: '221000',
      value: 'xxx'
    }
  },
  {
    111100: {
      label: 'xxx',
      key: '111100',
      value: 'xxx'
    },
    121100: {
      label: 'xxx',
      key: '121100',
      value: 'xxx'
    },
    211100: {
      label: 'xxx',
      key: '211100',
      value: 'xxx'
    },
    221100: {
      label: 'xxx',
      key: '221100',
      value: 'xxx'
    }
  }
]

  change(...params) {
    this.$emit('change', ...params)
  }
}
</script>
