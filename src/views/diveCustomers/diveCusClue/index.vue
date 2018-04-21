<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for = "data in tabs" :label="data.text" :name="data.key" :key= "data.key">
      111
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script lang="ts">
 import Index from './index.ts'
 export default Index
</script>

<style lang="scss">
@import url('./index.scss');
</style>


