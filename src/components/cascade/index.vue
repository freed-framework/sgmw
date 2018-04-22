<template>
  <el-row>
    <el-col :span="6">
      <el-form-item label="品牌">
        <el-select v-model="form.select1" placeholder="请选择品牌">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col  :span="6">
      <el-form-item label="品种">
        <el-select :disabled="!form.select1" v-model="form.select2" placeholder="请选择品种">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="车系">
        <el-select :disabled="!form.select2" v-model="form.select3" placeholder="请选择车系">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="车型">
        <el-select :disabled="!form.select3" v-model="form.select4" placeholder="请选择车型">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import emitter from 'element-ui/src/mixins/emitter';
import { mixins } from 'vue-class-component'
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

let cache = {
  select1: '',
  select2: '',
  select3: '',
  select4: ''
}

@Component({
  mixins: [emitter]
})
export default class Cascade extends Vue {
  @Prop() value: any

  form: any = {
    ...cache
  }

  created() {
    Object.assign(this.form, this.value);
  }

  @Watch('form.select1')
  watchSelct1(val) {
    const { select1, ...props } = cache;
    // const { dispatch: any } = this;
    Object.assign(this.form, props);
    this.dispatch('ElFormItem', 'el.form.change', [this.form]);
  }

  @Watch('form.select2')
  watchSelct2(val) {
    const { select3, select4 } = cache;
    Object.assign(this.form, {select3, select4});
  }

  @Watch('form.select3')
  watchSelct3(val) {
    const { select4 } = cache;
    Object.assign(this.form, { select4 });
  }
}
</script>
<style lang="scss">
@import './index.scss';
</style>

