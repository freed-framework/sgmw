<template>
  <div>
    <el-tree
      ref="roleTree"
      :data="allPermissions"
      :default-expanded-keys="expandedKeys"
      auto-expand-parent
      node-key="id"
      show-checkbox
    >
    </el-tree>

    <!-- <el-button @click="onGetChecked">保存</el-button> -->

    <!-- <el-button v-authview="'save_kpi'" @click="onGetCheckedKeys">保存 kpi</el-button>
    <el-button v-authview="['save_kpi', 'kpi_del', 'admin']" @click="onGetCheckedKeys">删除</el-button>     -->
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { State, Getter, Action } from 'vuex-class'
import { Component, Vue, Watch, Prop, Model } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  $refs: any
  expandedKeys: string[] = []
  form: any = {}
  choosed: any = []

  @Getter('role/permissions') allPermissions: any
  // 需要过滤的一级菜单
  @Getter('role/filters') filters: any
  @Action('role/getCheckedPermissions') getCheckedPermissions: any
  @Prop({ default: () => ([]) }) current: any
  @Model('input') value: any

  getChecked() {
    const keys = this.$refs.roleTree.getCheckedKeys()

    // 过滤一级勾选
    return keys.filter(k => this.filters.indexOf(k) === -1)
  }

  @Watch('value')
  onValueChanged(val) {
    // console.log('value: ', val)
  }

  @Watch('current')
  onCurrentChanged(val) {
    this.getCheckedPermissions(this.current).then(choosed => {
      // 设置展开
      choosed.forEach((item) => {
        this.expandedKeys.push(item.id)
      })

      // 设置选中
      this.$refs.roleTree.setCheckedNodes(choosed)
    })
  }
}
</script>

<style style="scss">
</style>
