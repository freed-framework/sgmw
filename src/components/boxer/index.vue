<template>
  <div class="boxer">
    <!-- title -->
    <div v-if="hasTitle" class="boxer-title">
      <el-row>
        <el-col :span="18">
          <i v-if="iconType" :class="iconType" /><span>{{ title }}</span>
        </el-col>
        <el-col :span="6" align="right">
          <el-button
            class="boxer-action"
            v-if="actionType"
            size="mini"
            type="primary"
            :icon="`${actionType}`"
            @click="handleClick"
            circle
          ></el-button>
        </el-col>
      </el-row>
    </div>

    <!-- main -->
    <div class="boxer-main" :style="!padding ? 'padding: 0' : ''">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class PagTable extends Vue {
  @Prop({ default: false }) hasTitle: boolean
  @Prop({ default: '' }) title: string
  @Prop({ default: () => {} }) onAction: Function
  @Prop({ default: false }) padding: boolean
  @Prop({ default: '' }) actionType: string
  @Prop({ default: '' }) iconType: string

  handleClick() {
    this.onAction()
    // this.$emit('action')
  }
}
</script>

<style lang="scss">
.boxer {
  border: 1px solid #ebeef5;
  box-shadow: 0 0 10px -4px #999;

  &-title {
    border-bottom: 1px solid #ebeef5;
    padding: 15px;
    font-weight: 700;
    font-size: 14px;

    span {
      padding-left: 5px;
    }
  }

  &-main {
    padding: 15px;
  }

  .boxer-action {
    padding: 4px !important;
  }
}
</style>


