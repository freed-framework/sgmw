<template>
  <div>
    <!-- Header -->
    <div class="sg-header">
      <el-form ref="query" :model="query" label-width="50px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="query.userName" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="登录名" :label-width="formLabelWidth">
              <el-input v-model="query.loginName" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态" :label-width="formLabelWidth">
              <el-select :clearable="true" v-model="query.active" placeholder="全部">
                <el-option label="全部" value="" />
                <el-option label="禁用" :value="0" />
                <el-option label="可用" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="用户类型" :label-width="formLabelWidth">
              <el-select :clearable="true" v-model="query.userType" placeholder="全部">
                <el-option label="全部" value="" />
                <el-option label="厂家用户" :value="1" />
                <el-option label="经销商" :value="2" />
                <el-option label="物流商" :value="3" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="query-buttons" :span="2">
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
            v-for="(item, i) in tabelHeader"
            :key="i"
            :prop="item.key"
            :label="item.title"
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
      title="修改用户信息"
      center
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="form"
      >
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input style="width: 200px" v-model="form.name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio-group v-model="form.active">
            <el-radio :label="1">已启用</el-radio>
            <el-radio :label="0">已禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select
            v-model="roleChoosed"
            multiple
            placeholder="请选择"
            style="width: 400px;"
          >
            <el-option
              v-for="item in roleSelect"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
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
import { tabelHeader } from './helper'
import { mixins } from 'vue-class-component'
import TableColor from '@/mixins/table-color/index.vue'
import DownloadMixin from '@/mixins/downloadMixin'

@Component
export default class App extends mixins(TableColor, DownloadMixin) {
  $refs: any
  dialogFormVisible: boolean = false
  formLabelWidth: string = '120px'
  pageSize: number = 10

  @Action('user/getList') getList: any
  @Getter('user/list') datas: any
  @Action('user/getDetail') getDetail: any
  @Getter('user/detail') detail: any
  @Getter('auth/user') user: any
  @Getter('auth/roleSelect') roleSelect: any
  @Action('user/update') update: any

  form: any = {
    ...this.detail
  }

  loading: boolean = false
  // 已选角色
  roleChoosed: Array<string|number> = []

  query: any = {

  }

  tabelHeader: any = []

  currentPermissions: any = []

  // @Watch('detail', { deep: true })
  // onDetailChanged(data)  {
  //   // this.form = { ...data }
  //   // console.log(this.form, data)

  //   // this.tabelHeader = tabelHeader[data.userType]
  // }

  // @Watch('roleChoosed', { deep: true })
  // onRoleChoosedChanged(val) {
  //   console.log(val)
  // }

  handleEdit(row) {
    const { id } = row
    this.loading = false

    this.getDetail(id).then(res => {
      this.dialogFormVisible = true

      const { data = {} } = res
      this.form = { ...data }

      // find choosed
      if (data.roles) {
        this.roleChoosed = data.roles.map(item => item.id)
      }
    })
  }

  // show() {
  //   console.log(this.$refs.permissions)
  // }

  formatRoleSelect() {
    return this.roleChoosed.map(item => ({
      id: item
    }))
  }

  handleUpdate() {
    const { id, active } = this.form

    const postData = {
      id,
      active,
      roles: this.formatRoleSelect()
    }

    this.update(postData).then(() => {
      this.dialogFormVisible = false
      this.loading = true
    }).catch(() => {
      this.loading = false
    })
  }

  handleCurrentChange(pageNumber) {
    this.getList({
      ...this.query,
      pageNumber,
      pageSize: this.pageSize,
    })
  }

  submitQuery() {
    this.getList({
      ...this.query,
      pageNumber: 1,
      pageSize: this.pageSize,
    })
  }

  mounted() {
    const { userType } = this.user
    this.tabelHeader = tabelHeader[userType]

    this.getList({
      pageNumber: 1,
      pageSize: this.pageSize,
    })
  }
}
</script>
