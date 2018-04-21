<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <template v-for="(item) in level">
      <el-breadcrumb-item
        :key="item.path"
        :to="item.pageRoot ? '' : item.path"
        :class="item.pageRoot ? 'breadcrumb-page-root' : ''"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
import { State } from 'vuex-class'

@Component({
  components: {
    [Breadcrumb.name]: Breadcrumb,
    [BreadcrumbItem.name]: BreadcrumbItem
  }
})
export default class BreadcrumbLayer extends Vue {
  level: any = []

  @State('route') route: any
  @Watch('route')
  watchRoute() {
    this.getBreadcrumb()
  }

  created() {
    this.getBreadcrumb()
  }

  getBreadcrumb(): void {
    const routes = this.$route.matched.map(item => ({
      name: item.name,
      path: item.path,
      pageRoot: false,
    }))

    let matched: any = routes.filter((item, index) => {
      // 目前第一级节点都没有对应的页面，仅作为展示
      if (index === 0) {
        item.pageRoot = true
      }

      return item.name
    })

    const f = matched[0]

    if (f && f.path !== '') {
      this.level = [{ path: '/', name: '首页' }].concat(matched)
    } else {
      this.level = matched
    }
  }
}
</script>

<style lang="scss">
.breadcrumb {
  &-page-root {
    .el-breadcrumb__inner, .el-breadcrumb__inner a {
      color: #606266;
      font-weight: normal;
      cursor: text;
    }
  }
}
</style>

