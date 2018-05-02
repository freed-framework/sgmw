<template>
  <div>
    <el-tree
      ref="roleTree"
      :data="roles"
      node-key="path"
      :props="defaultProps"
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
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  $refs: any

  @Getter('auth/roleArray') roles: any

  defaultProps: any = {
    label: 'text',
    children: 'children'
  }

  form: any = {
  }

  onCheckChange(data, checked, indeterminate) {
    console.log(data, checked, indeterminate)
  }

  onGetCheckedKeys() {
    const keys = this.$refs.roleTree.getCheckedKeys()

    console.log(keys)
  }

  mounted() {}
}
</script>

<style style="scss">
</style>
