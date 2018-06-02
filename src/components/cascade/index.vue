<template>
  <span>
    <el-col key="1" :span="6" v-if="0 >= cols[0] && 0 <= cols[1]">
      <el-form-item :label="colLabel[0]">
        <el-select :clearable="true" v-model="form[keys[0]]" :placeholder="placeholders[0]">
          <el-option v-for="item in showData[0]" :label="item.label" :key="item.key" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col key="2" :span="6" v-if="1 >= cols[0] && 1 <= cols[1]">
      <el-form-item :label="colLabel[1]">
        <el-select :disabled="disabledB" :clearable="true" v-model="form[keys[1]]" :placeholder="placeholders[1]">
          <el-option v-for="item in showData[1]" :label="item.label" :key="item.key" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col key="3" :span="6" v-if="2 >= cols[0] && 2 <= cols[1]">
      <el-form-item :label="colLabel[2]">
        <el-select :disabled="disabledC" :clearable="true" v-model="form[keys[2]]" :placeholder="placeholders[2]">
          <el-option v-for="item in showData[2]" :label="item.label" :key="item.key" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col key="4" :span="6" v-if="3 >= cols[0] && 3 <= cols[1]">
      <el-form-item :label="colLabel[3]">
        <el-select :disabled="disabledD" :clearable="true" v-model="form[keys[3]]" :placeholder="placeholders[3]">
          <el-option v-for="item in showData[3]" :label="item.label" :key="item.key" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-col>
  </span>
</template>
<script lang="ts">
/* eslint-disable */
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

const cache = {
  a: null,
  b: null,
  c: null,
  d: null
}
const cacheAll = {
  a: '0',
  b: '0',
  c: '0',
  d: '0'
}

const all = {
  label: '全部',
  key: '0',
  value: '0'
}

@Component
export default class Cascade extends Vue {
  name: string = 'Cascade'

  @Prop({default: { list: [], fetched: false }}) data: any
  // 是否包含“全部”选项发
  @Prop({default: true}) hasAll: boolean
  // 显示几项 1-4之间
  @Prop({default: [0, 3]}) cols: number
  // 是否强制联动,(必须前面选了后面才能选)， 默认false
  @Prop({default: false}) force: boolean
  // 默认选中(暂不支持)
  @Prop() default: Array<any>
  // 没项label
  @Prop({default: () => ['1', '2', '3', '4']}) colLabel: Array<string>
  // placeholders
  @Prop({default: () => []}) placeholders: Array<string>
  // 是否默认选中全部
  @Prop({default: false}) defaultAll: boolean

  showData: Array<any> = []
  keys: Array<any> = ['a', 'b', 'c', 'd']
  form: any = this.hasAll && this.defaultAll ? {...cacheAll} : {...cache}

  disabledB: boolean = this.force
  disabledC: boolean = this.force
  disabledD: boolean = this.force
  timer: any = null

  /**添加”全部“选型 */
  addAll() {
    for (let i = 0; i < this.data.list.length; i++) {
      const newData = {
        0: all
      };
      Object.assign(newData, this.data.list[i])
      this.showData[i] = newData
    }
  }

  addOneAll(data) {
    if (!this.hasAll) {
      return data
    }

    const newData = {
      '0': all
    };

    Object.assign(newData, data)
    return newData
  }

  init() {
    if (this.hasAll) {
      this.addAll()
    } else {
      this.showData = [...this.data.list]
    }
    this.$emit('change', this, this.getReult())
  }

  find(data, val) {
    const result = {};
    const keys = Object.keys(data);

    for (var i = 0; i < keys.length; i++) {        
      const key = keys[i]

      if (key.indexOf(`${val}-`) === 0) {
        result[key] = data[key]
      }
    }

    return result
  }

  clear() {
    const { hasAll, addAll } = this
    if (hasAll) {
      this.addAll()
    } else {
      this.showData = [...this.data.list]
    }
    this.form = this.hasAll && this.defaultAll ? {...cacheAll} : {...cache}
  }

  getReult() {
    const { cols } = this
    const keys = Object.keys(this.form)
    const result = []

    for (let i = 0; i < keys.length; i++) {
      const value = this.form[keys[i]]
      if (value) {
        result[i] = this.showData[i] ? this.showData[i][value] : null
      } else {
        result[i] = null
      }
    }

    return result.slice(cols[0], cols[1] + 1)
  }

  changeDisabled(val, type) {
    if(!this.force) return
    if (!val) {
      this[type] = true
    } else {
      this[type] = false
    }
  }

  mounted() {
    this.timer = setTimeout(() => {
      this.init()
      this.$forceUpdate()
    }, 1500)
  }

  beforeDestroy() {
    clearTimeout(this.timer)
  }

  // @Watch('data.fetched')
  // watchData(val) {
  //   Vue.nextTick(() => {
  //     this.init()
  //     this.$forceUpdate()
  //   })
  // }

  // @Watch('form', {deep: true})
  // watchForm(val) {
  //   this.$emit('change', this, this.getReult())
  // }

  // @Watch('form.a')
  // watchA(val) {
  //   const { showData, data, addOneAll, find, form } = this;
  //   const all = this.hasAll && this.defaultAll
  //   Object.assign(this.form, {b: all ? '0' : null, c: all ? '0' : null, d: all ? '0' : null})
  //   this.changeDisabled(val, 'disabledB')
  //   if (val === '0' || !val) {
  //     this.showData = [showData[0], addOneAll(data.list[1]), addOneAll(data.list[2]), addOneAll(data.list[3])]
  //     return;
  //   }
  //   this.showData = [
  //     showData[0],
  //     addOneAll(find(data.list[1], val)),
  //     addOneAll(find(data.list[2], val)),
  //     addOneAll(find(data.list[3], val))
  //   ]
  // }

  // @Watch('form.b')
  // watchB(val) {
  //   const { showData, data, addOneAll, find, form } = this;
  //   const all = this.hasAll && this.defaultAll
  //   Object.assign(this.form, {c: all ? '0' : null, d: all ? '0' : null})
  //   this.changeDisabled(val, 'disabledC')
  //   if (val === '0' || !val) {
  //     this.showData = [showData[0], showData[1], addOneAll(data.list[2]), (data.list[3])]
  //     return;
  //   }
  //   this.showData = [
  //     showData[0],
  //     showData[1],
  //     addOneAll(find(data.list[2], val)),
  //     addOneAll(find(data.list[3], val))
  //   ]
  //   this.disabledB = false;
  // }

  // @Watch('form.c')
  // watchC(val) {
  //   const { showData, data, addOneAll, find, form } = this;
  //   const all = this.hasAll && this.defaultAll
  //   Object.assign(this.form, {d: all ? '0' : null})
  //   this.changeDisabled(val, 'disabledD')
  //   if (val === '0' || !val) {
  //     this.showData = [showData[0], showData[1], showData[2], addOneAll(data.list[3])]
  //     return;
  //   }
  //   this.showData = [
  //     showData[0],
  //     showData[1],
  //     showData[2],
  //     addOneAll(find(data.list[3], val))
  //   ]
  // }
}
</script>
<style lang="scss">
@import './index.scss';
</style>
