<template>
  <div>
    <div class="sg-top-button">
      <el-button @click="createRole">新建角色</el-button>
    </div>
    <!-- Header -->
    <div class="sg-header">
      <el-form ref="query" :model="query" label-width="84px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="query.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否可用" :label-width="formLabelWidth">
              <el-select :clearable="true" v-model="query.active" placeholder="全部">
                <el-option label="全部" value="" />
                <el-option label="禁用" :value="0" />
                <el-option label="可用" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="角色类型" :label-width="formLabelWidth">
              <el-select :clearable="true" v-model="query.type" placeholder="全部">
                <el-option label="全部" value="" />
                <el-option label="菜单权限" :value="1" />
                <el-option label="数据权限" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="query-buttons" :span="4">
            <el-button type="primary" @click="submitQuery">检索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- Main -->
    <div class="sg-main">
      <pag-table ref="xxx">
        <el-table
          :data="datas.list"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="序号"
          />
          <el-table-column
            prop="name"
            label="角色名称"
          />
          <el-table-column
            prop="typeName"
            label="角色类型"
          />
          <el-table-column
            prop="description"
            label="描述"
          />
          <el-table-column
            prop="activeText"
            label="状态"
          />

          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </pag-table>

      <div class="table-pagination">
        <el-pagination
          :page-size="datas.pagination.pageSize"
          :current-page="datas.pagination.pageNum"
          :pager-count="11"
          layout="prev, pager, next"
          :total="datas.pagination.total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>

    <!-- modal -->
    <el-dialog
      :title="`${isUpdateAction ? '修改' : '新建'}角色信息`"
      :visible.sync="dialogFormVisible"
      center
    >
      <el-row>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
        >
          <el-form-item
            label="角色名称*"
            prop="name"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否可用" :label-width="formLabelWidth">
            <el-radio-group v-model="form.active">
              <el-radio :label="1">可用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 编辑不可修改 -->
          <el-form-item
            v-show="!isUpdateAction"
            label="角色类型"
            :label-width="formLabelWidth"
          >
            <el-radio-group v-model="form.type">
              <el-radio :label="1">菜单权限</el-radio>
              <el-radio :label="2">数据权限</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="菜单权限" :label-width="formLabelWidth">
            <!-- 菜单权限列表 -->
            <div v-show="form.type === 1">
              <permissions
                ref="permissions"
                :current="currentPermissions"
              />
            </div>
            <!-- 数据权限 -->
            <div v-show="form.type === 2">
              <el-input v-model="form.includeNo" auto-complete="off"></el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-row>
      <!-- buttons -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="handleUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { State, Getter, Action } from 'vuex-class'
import { Component, Vue, Watch } from 'vue-property-decorator'
import Permissions from './Permissions'
import { mixins } from 'vue-class-component'
import TableColor from '@/mixins/table-color/index.vue'
import DownloadMixin from '@/mixins/downloadMixin'

@Component({
  components: {
    Permissions
  }
})
export default class App extends mixins(TableColor, DownloadMixin) {
  $refs: any
  dialogFormVisible: boolean = false
  formLabelWidth: string = '120px'

  @Action('role/getList') getList: any
  @Getter('role/list') datas: any
  @Action('role/getDetail') getDetail: any
  @Getter('role/detail') detail: any

  @Action('role/update') update: any
  @Action('role/add') add: any

  query: any = {
    name: '',
    active: '',
    type: '',
  }

  pageSize: number = 10
  pageNumber: number = 1

  form: any = {
    ...this.detail
  }

  rules: any = {
    name: [
      { required: true, message: '角色名称必填', trigger: 'blur' },
    ]
  }

  currentPermissions: any = []
  dataPermissions: any = ''

  loading: boolean = false

  // 编辑情况下，角色类型不能编辑
  isUpdateAction = false

  @Watch('detail', { deep: true })
  onDetailChanged(data)  {
    // this.form = { ...data }
    console.log(this.form, data)
  }

  handleEdit(row) {
    const { id } = row
    this.isUpdateAction = true
    this.dialogFormVisible = true

    this.getDetail(id).then(res => {
      const { data = {} } = res
      this.form = { ...data }
      this.currentPermissions = data.privileges || []
      // setTimeout(() => {
      // }, 0)
    })
  }

  createRole() {
    this.isUpdateAction = false
    this.dialogFormVisible = true
    
    this.form = {
      active: 1,
      type: 1,
    }
  }

  handleUpdate() {
    this.$refs.form.validate((vali) => {
      if (!vali) {
        return
      }
      const $action = this.isUpdateAction ? this.update : this.add
      const checked = this.$refs.permissions.getChecked()

      // 菜单
      if (this.form.type === 1) {
        this.form.privileges = checked
      }

      this.loading = true

      $action(this.form).then(() => {
        // this.loading = false
        this.dialogFormVisible = false

        // 刷新列表
        this.getList({
          ...this.query,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        })
      }).catch(() => {
        this.loading = false
      })
    })
  }

  @Watch('dialogFormVisible')
  onDialogFormVisibleChanged(visible) {
    if (visible) {
      this.loading = false
    }
  }

  @Watch('form.type')
  onTypeChanged(val) {
    // console.log(val)
  }

  /**
   * 查询
   */
  submitQuery() {
    // const { name } = this.query
    this.pageNumber = 1
    this.getList({
      ...this.query,
      pageNumber: 1,
      pageSize: this.pageSize,
    })
  }

  handleCurrentChange(pageNumber) {
    this.pageNumber = pageNumber
    this.getList({
      ...this.query,
      pageNumber,
      pageSize: this.pageSize,
    })
  }

  mounted() {
    this.pageNumber = 1
    this.getList({
      pageNumber: 1,
      pageSize: this.pageSize,
    })
  }
}
</script>

<style style="scss">
.table-pagination {
  margin-top: 10px;
  text-align: right;
}
.query-buttons {
  /* padding-bottom: 10px; */
  text-align: right;
}
.sg-top-button {
  margin-bottom: 10px;
  text-align: right;
}
</style>
