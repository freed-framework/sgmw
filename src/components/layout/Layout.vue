<template>
  <div
    class="container-main"
  >
    <div id="side">
      <side />
    </div>

    <div id="container">
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
      <div id="container-outer">
        <div id="container-inner">
          <router-view />
        </div>
      </div>
    </div>
  </div>
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

.container-main {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
#side {
  color: #333;
  width: 200px;
  position: absolute;
  top: 0;
  bottom: 0;

  .el-menu {
    height: 100%;
  }
}

#container {
  position: absolute;
  left: 200px;
  right: 0;
  top: 0;
  bottom: 0;
}

#container-outer {
  color: #333;
  overflow-y: auto;
  position: absolute;
  top: 60px;
  bottom: 0;
  width: 100%;
}

#container-inner {
  padding: 20px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
