<template>
  <el-container
    class="container-main"
  >
    <el-aside width="200px">
      <side />
    </el-aside>

    <el-container>
      <el-header>
        <el-row>
          <el-col :span="14">
            <breadcrumb-layer />
          </el-col>
          <el-col :span="10" style="text-align: right">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      </el-container>
  </el-container>
</template>

<script lang="ts">
import { Getter, Action, namespace } from 'vuex-class'
import { Vue, Component } from 'vue-property-decorator'
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
// import ls from '@/util/localStorage'

const action = namespace('auth', Action)
const getter = namespace('auth', Getter)

@Component({
  components: {
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    'side': () => import('../side'),
    'breadcrumb-layer': () => import('../breadcrumb')
  }
})
export default class Layout extends Vue {
  @action('logout') handleLogout: void
  @getter('user') user: any

  created() {}
}
</script>
<style lang="scss">
.el-header {
  background-color: #eee;
  color: #333;
  padding: 0 20px;
  line-height: 60px;

  .breadcrumb {
    line-height: 60px;
  }
}
.el-aside {
  color: #333;

  .el-menu {
    height: 100%;
  }
}
.el-main {
  color: #333;
}
.container-main {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
