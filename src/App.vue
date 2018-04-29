<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Action } from 'vuex-class'
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  @Action('common/getRegionList') actionGetRegionList: any
  @Action('common/getBrandList') actionGetBrandList: any

  created() {
    this.actionGetRegionList()
    this.actionGetBrandList()
  }
}
</script>
