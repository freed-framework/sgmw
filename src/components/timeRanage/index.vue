<template>
  <el-col :span="12" class="time-group" style="display: flex;">
    <el-form-item :label="label">
      <el-date-picker :type="type" :value-format="format" :placeholder="startPlaceholder" v-model="beginTime"
        :picker-options="beginStatisDate" style="margin-right: 12px;">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="division" label-width="25px">
        <el-date-picker :type="type" :value-format="format" :placeholder="endPlaceholder" v-model="endTime"
          :picker-options="endStatisDate" v-if="!changeShow">
        </el-date-picker>
         <el-date-picker :type="type" :value-format="format" :placeholder="endPlaceholder"
          :picker-options="endStatisDate" v-if="changeShow">
        </el-date-picker>
    </el-form-item>
  </el-col>
</template>
<script lang="ts">
/* eslint-disable */
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import moment,{ months } from 'moment'

type formatType = 'yyyy' | 'yyyy-MM' | 'yyyy-MM-dd'
type typeType = 'year' | 'month' | 'date'

window.globalConfig = {
  beginTime: ''
}

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
  changeShow: boolean = false

  clear() {
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
      const { beginTime } = window.globalConfig
      const { type }  = this
      const year = moment(date).format('YYYY')
      const month = moment(date).format('M')
      const day = moment(date).format('D')

      if (!beginTime) return false
      if (type === 'year') {
        if (Number(beginTime) > Number(year)) {
          return true
        }
      } else if (type === 'month') {
        const arr = beginTime.split('-')
        if (Number(arr[0]) !== Number(year)) {
          return true
        }
      } else if (type === 'date') {
        const arr = beginTime.split('-')
        if (Number(arr[0]) !== Number(year) || Number(arr[1]) !== Number(month) || Number(arr[2]) > Number(day)) {
          return true
        }
      }
      return false
    }
  }

  @Watch('beginTime')
  watchStartChange(val) {
    const { beginTime, endTime } = this
    window.globalConfig = {
      beginTime
    }
    this.endTime = ''
    this.$emit('change', this, {beginTime, endTime})
    // bugfix 解决组件不会重新渲染， 禁用不能实时更新
    this.changeShow = true
    Vue.nextTick(() => {
      this.changeShow = false
    })
  }

  @Watch('endTime')
  watchEndChange(val) {
    const { beginTime, endTime } = this
    this.$emit('change', this, {beginTime, endTime})
  }

  @Watch('type')
  watchTypeChange(val) {
    window.globalConfig = {
      beginTime: ''
    }
    this.beginTime = ''
    this.endTime = ''
  }
}
</script>
