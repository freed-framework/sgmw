<template>
  <div class="sg-inspect-tabs">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="线索统计-年" name="first">
        <Index/>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        <Index/>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Index from './index.vue'
export default {  
  components: {  
    components: {Index}
  },  
}  
</script>

<style lang="scss">
@import './index.scss';
</style>


