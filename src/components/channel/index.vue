<template>
  <cascade
    :data="channelList"
    :hasAll="hasAll"
    :cols="cols"
    :force="force"
    :colLabel="colLabel"
    :placeholders="placeholders"
    :defaultAll="defaultAll"
    @change="change"
  />
</template>

<script lang="ts">
/* eslint-disable */
import { Getter } from 'vuex-class'
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import Cascade from '../cascade/index.vue'

@Component({
  components: { Cascade }
})
export default class Channel extends Vue {
  name: string = 'Channel'
  @Getter('common/channelList') channelList: any

  // 是否包含“全部”选项发
  @Prop({default: true}) hasAll: boolean
  // 显示几项 1-4之间
  @Prop({default: () => [0, 3]}) cols: Array<any>
  // 是否强制联动,(必须前面选了后面才能选)， 默认false
  @Prop({default: false}) force: boolean
  // 默认选中(暂不支持)
  @Prop() default: Array<any>
  // 没项label
  @Prop({default: () => ['平台', '主渠道', '分渠道', '子渠道']}) colLabel: Array<string>
  // placeholders
  @Prop({default: () => []}) placeholders: Array<string>
    // 是否默认选中全部
  @Prop({default: false}) defaultAll: boolean

  change(...params) {
    this.$emit('change', ...params)
  }
}
</script>
