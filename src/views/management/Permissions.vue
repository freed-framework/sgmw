<template>
  <div>
    <el-tree
      ref="roleTree"
      :data="allPermissions"
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
import { Component, Vue, Watch, Prop, Model } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  $refs: any
  expandedKeys: string[] = []
  form: any = {}
  choosed: any = []

  @Getter('role/permissions') allPermissions: any
  // @Getter('role/choosedPermissions') choosed: any
  @Action('role/getCheckedPermissions') getCheckedPermissions: any
  @Prop({ default: () => ([]) }) current: any
  @Model('input') value: any

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

  @Watch('value')
  onValueChanged(val) {
    console.log('value: ', val)
  }

  @Watch('current')
  onCurrentChanged(val) {
    console.log('current: ', val)
    this.getCheckedPermissions(this.current).then((res) => {
      this.choosed = res
      console.log('getCheckedPermissions: ', res)
      // 设置展开
      this.choosed.forEach((item) => {
        this.expandedKeys.push(item.id)
      })

      // 设置选中
      this.$refs.roleTree.setCheckedNodes(this.choosed)
    })
  }

  change(cur) {
    console.log(cur)
  }

  onCheckChange() {
    
  }

  mounted() {
console.log('mounted per')
    // this.choosed.forEach((item) => {
    //   this.expandedKeys.push(item.id)
    // })
  
    // this.$refs.roleTree.setCheckedNodes(this.choosed)
  }
}
</script>

<style style="scss">
</style>
