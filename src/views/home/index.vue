<template>
  <div class="home-outer">
    <div class="home-inner">
      <font-awesome-icon :icon="['fas', 'home']" /> 欢迎进入系统
    </div>
  </div>
</template>


<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator'

@Component
export default class Home extends Vue {
}
</script>

<style lang="scss">
@import './home.scss';
</style>
