<template>
  <el-col :span="12" class="time-group" style="display: flex;">
    <el-form-item :label="label">
      <el-date-picker :type="type" :value-format="format" :placeholder="startPlaceholder" v-model="beginTime"
        :picker-options="beginStatisDate" style="margin-right: 12px;">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="division" label-width="25px">
        <el-date-picker :type="type" :value-format="format" :placeholder="endPlaceholder" v-model="endTime"
          :picker-options="endStatisDate">
        </el-date-picker>
    </el-form-item>
  </el-col>
</template>
<script lang="ts">
/* eslint-disable */
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

type formatType = 'yyyy' | 'yyyy-MM' | 'yyyy-MM-dd'
type typeType = 'year' | 'month' | 'date'

@Component
export default class Cascade extends Vue {
  name: string = 'TimeRange'

  @Prop({default: '日期'}) label: string
  @Prop({default: 'yyyy'}) format: formatType
  @Prop({default: 'year'}) type: typeType
  @Prop({default: '至'}) division: string
  @Prop({default: '选择开始日期'}) startPlaceholder: string
  @Prop({default: '选择结束日期'}) endPlaceholder: string

  beginTime: string = ''
  endTime: string = ''

  reset() {
    this.beginTime = ''
    this.endTime = ''
  }

  beginStatisDate: any = {
    disabledDate: (date) => {
      return false
    }
  }

  endStatisDate: any = {
    disabledDate: (date) => {
      return false
    }
  }

  @Watch('beginTime')
  watchStartChange(val) {
    const { beginTime, endTime } = this
    this.$emit('change', this, {beginTime, endTime})
  }

  @Watch('endTime')
  watchEndChange(val) {
    const { beginTime, endTime } = this
    this.$emit('change', this, {beginTime, endTime})
  }

  @Watch('type')
  watchTypeChange(val) {
    this.beginTime = ''
    this.endTime = ''
  }
}
</script>

