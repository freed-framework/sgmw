<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Action, Getter } from 'vuex-class'
import { Vue, Component, Watch } from 'vue-property-decorator'
import authview from '@/mixins/authview'
// 安装 authview 指令
// authview.install(Vue, store.getters['auth/roles'])

@Component
export default class App extends Vue {
  // @Action('common/getRegionList') actionGetRegionList: any
  // @Action('common/getBrandList') actionGetBrandList: any

  @Getter('auth/roles') roles: any

  @Watch('roles')
  onRolesChanged(roles) {
    authview.install(Vue, roles)
  }

  created() {
    // this.actionGetRegionList()
    // this.actionGetBrandList()
  }
}
</script>
