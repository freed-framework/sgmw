<template>
  <el-row>
    <el-col :span="6" v-for="i in 4" :key="i" v-if="(i-1) >= cols[0] && (i-1) <= cols[1]">
      <el-form-item :label="colLabel[i-1]">
        <el-select :clearable="true" v-model="form[keys[i-1]]" :placeholder="placeholders[i-1]">
          <el-option v-for="item in showData[i-1]" :label="item.label" :key="item.key" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
</template>
<script lang="ts">
/* eslint-disable */
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

const cache = []
const all = {
  label: "全部",
  key: '0',
  value: '0'
}

@Component
export default class Cascade extends Vue {
  name: string = 'Cascade'

  @Prop({default: () => []}) data: Array<any>
  // 是否包含“全部”选项发
  @Prop({default: true}) hasAll: boolean
  // 显示几项 1-4之间
  @Prop({default: 4}) cols: number
  // 是否强制联动,(必须前面选了后面才能选)， 默认false
  @Prop({default: false}) force: boolean
  // 默认选中(暂不支持)
  @Prop() default: Array<any>
  // 没项label
  @Prop({default: () => ['1', '2', '3', '4']}) colLabel: Array<string>
  // placeholders
  @Prop({default: () => []}) placeholders: Array<string>

  showData: Array<any> = []
  keys: Array<any> = ['a', 'b', 'c', 'd']
  form: any = {
    a: null,
    b: null,
    c: null,
    d: null
  }

  /**添加”全部“选型 */
  addAll() {
    for (let i = 0; i < this.data.length; i++) {
      const newData = {
        0: all
      };
      Object.assign(newData, this.data[i])
      this.showData[i] = newData
    }
  }

  addOneAll(data) {
    if (!this.hasAll) {
      return data
    }

    const newData = {
      0: all
    };

    Object.assign(newData, data)
    return newData
  }

  init() {
    if (this.hasAll) {
      this.addAll()
    } else {
      this.showData = [...this.data]
    }
    this.$emit('change', this, this.getReult())
  }

  find(data, val, base) {
    const result = {};
    for (let i in data) {
      if (i > val && i < (Number(val) + base)) {
        result[i] = data[i]
      }
    }
    return result
  }

  reset() {
    this.showData = [...this.data]
    this.form = {
      a: null,
      b: null,
      c: null,
      d: null
    }
  }

  getReult() {
    const { cols } = this
    const keys = Object.keys(this.form)
    const result = []

    for (let i = 0; i < keys.length; i++) {
      const value = this.form[keys[i]]
      if (value) {
        result[i] = this.showData[i][value]
      } else {
        result[i] = null
      }
    }

    return result.slice(cols[0], cols[1] + 1)
  }

  created() {
    this.init()
  }

  @Watch('data', {deep: true})
  watchData(val) {
    this.init()
  }

  @Watch('form', {deep: true})
  watchForm(val) {
    this.$emit('change', this, this.getReult())
  }

  @Watch('form.a', {deep: true})
  watchA(val) {
    const { showData, data, addOneAll, find, form } = this;
    Object.assign(this.form, {b: null, c: null, d: null})
    if (val === '0' || !val) {
      this.showData = [showData[0], addOneAll(data[1]), addOneAll(data[2]), addOneAll(data[3])]
      return;
    }
    this.showData = [
      showData[0],
      addOneAll(find(data[1], val, 100000)),
      addOneAll(find(data[2], val, 10000)),
      addOneAll(find(data[3], val, 1000))
    ]
  }

  @Watch('form.b', {deep: true})
  watchB(val) {
    const { showData, data, addOneAll, find, form } = this;
    Object.assign(this.form, {c: null, d: null})
    if (val === '0' || !val) {
      this.showData = [showData[0], showData[1], addOneAll(data[2]), (data[3])]
      return;
    }
    this.showData = [
      showData[0],
      showData[1],
      addOneAll(find(data[2], val, 10000)),
      addOneAll(find(data[3], val, 1000))
    ]
  }

  @Watch('form.c', {deep: true})
  watchC(val) {
    const { showData, data, addOneAll, find, form } = this;
    Object.assign(this.form, {d: null})
    if (val === '0' || !val) {
      this.showData = [showData[0], showData[1], showData[2], addOneAll(data[3])]
      return;
    }
    this.showData = [
      showData[0],
      showData[1],
      showData[2],
      addOneAll(find(data[3], val, 1000))
    ]
  }
}
</script>
<style lang="scss">
@import './index.scss';
</style>

