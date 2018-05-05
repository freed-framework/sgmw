<template>
  <div>
    <el-tree
      ref="roleTree"
      :data="roles"
      :default-expanded-keys="expandedKeys"
      check-strictly
      auto-expand-parent
      node-key="id"
      show-checkbox
      @check-change="onCheckChange"
    >
    </el-tree>

    <el-button @click="onGetChecked">保存</el-button>

    <!-- <el-button v-authview="'save_kpi'" @click="onGetCheckedKeys">保存 kpi</el-button>
    <el-button v-authview="['save_kpi', 'kpi_del', 'admin']" @click="onGetCheckedKeys">删除</el-button>     -->
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { State, Getter, Action } from 'vuex-class'
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  $refs: any
  expandedKeys: string[] = []
  form: any = {}

  @Getter('role/list') roles: any
  @Getter('role/choosed') choosed: any

  onGetChecked() {
    const keys = this.$refs.roleTree.getCheckedKeys()
    const nodes = this.$refs.roleTree.getCheckedNodes()
    const half =  this.$refs.roleTree.getHalfCheckedNodes()

    console.log(keys)
    console.log(nodes)
    console.log(half)
  }

  @Watch('choosed', { deep: true })
  onChoosedChanged(value) {
    // this.$refs.roleTree.setCheckedNodes(
    //   value
    // )
  }

  onCheckChange() {
    
  }

  mounted() {
    this.choosed.forEach((item) => {
      this.expandedKeys.push(item.id)
    })
  
    this.$refs.roleTree.setCheckedNodes(this.choosed)
  }
}
</script>

<style style="scss">
</style>
