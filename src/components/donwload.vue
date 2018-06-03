<template>
  <div class="el-button el-button--default el-button--small el-download">
    <a :href="href()" target="_blank">导出</a>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { download } from '../api'

@Component
export default class DonwLoad extends Vue {
  @Prop({ default: '' }) api: any
  @Prop({ default: () => ({}) }) params: any

  /**
   * 将对象格式化成get请求所需格式
   * @param params 
   */
  parse(params) {
    let result = '?'
    const keys = Object.keys(params)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = params[key]

      if (value) {
        result += `${key}=${value}&`
      }
    }
    return encodeURI(result.slice(0, result.length - 1))
  }

  // href: any = ''

  get path() {
    return download[this.api]
  }

  get query() {
    return this.parse(this.params)
  }

  href() {
    const _href = download[this.api] + '' + this.parse(this.params)
    return _href
  }
}
</script>

<style>
.el-download a {
  text-decoration-line: none;
  color: #333;
}
</style>

