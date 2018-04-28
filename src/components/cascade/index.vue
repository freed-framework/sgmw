<template>
  <el-row>
    <el-col :span="6">
      <el-form-item label="品牌">
        <el-select :clearable="true" v-model="form.brand" placeholder="请选择品牌">
          <el-option v-for="(item, index) in showData.brand" :label="item" :key="index" :value="index" />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col  :span="6">
      <el-form-item label="品种">
        <el-select :clearable="true" v-model="form.vehVariety" placeholder="请选择品种">
          <el-option v-for="(item, index) of showData.series" :label="item" :key="index" :value="index" />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="车系">
        <el-select :clearable="true" v-model="form.vehSerices" placeholder="请选择车系">
          <el-option v-for="(item, index) in showData.classes" :label="item" :key="index" :value="index" />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="车型">
        <el-select :clearable="true" v-model="form.vehModel" placeholder="请选择车型">
          <el-option v-for="(item, index) in showData.model" :label="item" :key="index" :value="index" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
</template>
<script lang="ts">
/* eslint-disable */
import emitter from 'element-ui/src/mixins/emitter';
import { State, Getter, Action } from 'vuex-class'
import { mixins } from 'vue-class-component'
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import Emitter from '@/mixins/Emitter'

let cache = {
  // 品牌
  brand: {},
  // 品种
  series: {},
  // 车系
  classes: {},
  // 车型
  model: {}
}

@Component({
  // mixins: [emitter]
})
export default class Cascade extends mixins(Emitter) {
  @Action('common/getBrandList') actionGetBrandList: any
  @Getter('common/brandList') brandList: any

  name: string = 'Cascade'
  @Prop() value: any

  form: any = {
    brand: '全部', // 测试
    vehVariety: '',
    vehSerices: '',
    vehModel: ''
  }

  showData: any = {
    // 品牌
    brand: {},
    // 品种
    series: {},
    // 车系
    classes: {},
    // 车型
    model: {}
  }

  resetData(val, item) {
    const { brand, series, classes, model } = cache
    const keys = Object.keys(this.showData)
    if (!val) {
      if (item === 0) {
        Object.assign(this.showData, { series, classes, model })
        Object.assign(this.form, { vehVariety: '', vehSerices: '', vehModel: '' })
      }
      if (item === 1) {
        Object.assign(this.showData, { classes, model })
        Object.assign(this.form, { vehSerices: '', vehModel: '' })
      }
      if (item === 2) {
        Object.assign(this.showData, { model })
        Object.assign(this.form, { vehModel: '' })
      }
    } else {
      if (item === 0 ) {
        Object.assign(this.showData,
        { 
          series: this.getItem(series, val, 100000),
          classes: this.getItem(classes, val, 100000),
          model: this.getItem(model, val, 100000)
        })
        Object.assign(this.form, { vehVariety: '', vehSerices: '', vehModel: '' })
      } 
      if (item === 1) {
        Object.assign(this.showData,
        { 
          classes: this.getItem(classes, val, 10000),
          model: this.getItem(model, val, 10000)
        })
        Object.assign(this.form, { vehSerices: '', vehModel: '' })
      }
      if (item === 2) {
        Object.assign(this.showData,
        { 
          model: this.getItem(model, val, 1000)
        })
        Object.assign(this.form, { vehModel: '' })
      }
    }
  }

  getItem(data, val, index) {
    const result = {};
    for (let i in data) {
      const value = Number(val)
      if (i > val && i <  (value + index)) {
        result[i] = data[i]
      }
    }
    return result
  }

  clear() {
    Object.assign(this.form, {brand: '', vehVariety: '', vehSerices: '', vehModel: ''})
    Object.assign(this.showData, cache)
  }

  @Watch('brandList')
  watchBrandListChange(val) {
    Object.assign(cache, val)
    Object.assign(this.showData, val)
  }

  @Watch('form', {deep: true})
  watchForm(val) {

    this.$emit('change', this, {
      brand: cache['brand'][val['brand']],
      vehVariety: cache['series'][val['vehVariety']],
      vehSerices: cache['classes'][val['vehSerices']],
      vehModel: cache['model'][val['vehModel']]
    })
  }

  @Watch('form.brand')
  watchBrand(val) {
    this.resetData(val, 0) 
  }

  @Watch('form.vehVariety')
  watchSeries(val) {
    this.resetData(val, 1) 
  }

  @Watch('form.vehSerices')
  watchClasses(val) {
    this.resetData(val, 2) 
  }

  created() {
    Object.assign(this.form, this.value);
    this.actionGetBrandList()
  }
}
</script>
<style lang="scss">
@import './index.scss';
</style>

