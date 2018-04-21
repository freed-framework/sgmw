<template>
  <el-menu
    class="side"
    @open="handleOpen"
    @close="handleClose"
    :router="true"
    :default-active="route.path"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <template v-for="item in routes">
      <!-- 菜单 hidden 属性不为 true 才显示 -->
      <template v-if="!item.hidden">
        <!-- 一级导航 -->
        <el-menu-item
          :key="item.path"
          :index="item.path"
          :route="{path: item.path}"
          v-if="isRootRoute(item)"
        >
          <i class="el-icon-location"></i>
          <span>{{ item.name }}</span>
        </el-menu-item>

        <!-- 多级导航 -->
        <el-submenu
          :index="item.path"
          :key="item.path"
          v-else
          :name="item.name"
        >
          <!-- 第一级 title -->
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ item.name }}</span>
          </template>

          <!-- 第二级菜单 -->
          <el-menu-item-group
            :key="sub.path"
            v-for="sub in item.children"
          >
            <el-menu-item
              :index="`${item.path}/${sub.path}`"
              :route="{path: `${item.path}/${sub.path}`}"
               v-if="!sub.hidden"
            >
              {{ sub.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { Getter, State } from 'vuex-class'
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Side extends Vue {
  @Getter('auth/routes') routes: Array<any>
  @State('route') route: any

  openeds: string[] = []

  created() {
    this.getOpeneds()
  }

  getOpeneds() {
    this.openeds = this.route.path.split('/')
  }

  /**
   * 判断路由是否是 root 节点
   * @param item 路由项
   */
  isRootRoute(item): boolean {
    const { children } = item

    // 1. 没有子菜单
    if (!children) {
      return true
    }

    // 2. 子菜单数量为 1 && path === ''
    if (children && children.length === 1 && children[0].path === '') {
      return true
    }

    return false
  }

  handleOpen() {}

  handleClose() {}
}
</script>

<style lang="scss">
.side {
  .el-submenu {
    overflow: hidden;
  }

  .el-menu-item-group__title {
    display: none;
  }

  .el-menu-logo {
    margin: 15px 0px 10px 12px;
  }
}
</style>

