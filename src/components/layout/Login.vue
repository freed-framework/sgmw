<template>
  <div><button @click="handleLogin">Login</button></div>
</template>

<script lang="ts">
import { Action } from 'vuex-class'
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Layout extends Vue {
  @Action('auth/login') login: any

  handleLogin() {
    this.login()
    this.$router.replace('/')
  }
}
</script>
<style lang="scss">
</style>
