<template>
  <div>{{a}}</div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="线索响应率" name="first">线索响应率</el-tab-pane>
    <el-tab-pane label="线索有效率" name="second">线索有效率</el-tab-pane>
    <el-tab-pane label="线索成交率" name="third">线索成交率</el-tab-pane>
    <el-tab-pane label="线索战败率" name="fourth">线索战败率</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
 import Index from './index.ts'
 export default Index
</script>

<style lang="scss">
@import url('./index.scss');
</style>


