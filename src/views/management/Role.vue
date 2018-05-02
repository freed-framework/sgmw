<template>
  <div>
    <el-tree
      ref="roleTree"
      :data="roles"
      node-key="id"
      show-checkbox
      @check-change="onCheckChange"
    >
    </el-tree>

    <el-button @click="onGetCheckedKeys">保存</el-button>

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

  @Getter('role/list') roles: any
  @Getter('role/choosed') choosed: any

  // defaultProps: any = {
  //   label: 'label',
  //   children: 'children'
  // }

  form: any = {
  }

  onCheckChange(data, checked, indeterminate) {
    console.log(data, checked, indeterminate)
  }

  onGetCheckedKeys() {
    const keys = this.$refs.roleTree.getCheckedKeys()
    const nodes = this.$refs.roleTree.getCheckedNodes()

    console.log(keys)
    console.log(nodes)
  }

  @Watch('choosed', { deep: true })
  onChoosedChanged(value) {
    console.log(value)
    this.$refs.roleTree.setCheckedNodes(
      value
    )
  }

  mounted() {
    console.log(this.choosed)
    this.$refs.roleTree.setCheckedNodes(this.choosed)
  }
}
</script>

<style style="scss">
</style>
