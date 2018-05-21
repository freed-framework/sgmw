<template>
  <div>
    <!-- <div class="sg-top-button">
      <el-button @click="createUser">新建用户</el-button>
    </div> -->

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
              <el-dropdown>
                <span class="el-dropdown-link" style="font-size: 12px;">
                  更多操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button @click="handlePassword(scope.row)" type="text" size="small">修改密码</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button @click="handleOpenDel(scope.row)" type="text" size="small">删除</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
          <el-input style="width: 200px" v-model="form.name" auto-complete="off" :disabled="!isNew ? true : false"></el-input>
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


    <!-- 修改密码 -->
    <el-dialog title="修改密码" width="480px" :visible.sync="dialogPwdVisible">
      <el-form
        :model="formPwd"
        :rules="rulesPwd"
        ref="formPwd"
      >
        <el-form-item prop="new" label="新密码" :label-width="formLabelWidth">
          <el-input v-model="formPwd.new" style="width: 300px" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="new2" label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="formPwd.new2" style="width: 300px" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click="dialogPwdVisible = false">取 消</el-button>
        <el-button :loading="pwdLoading" type="primary" @click="pwdUpdateSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新建用户 -->

    <!-- 删除用户 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogDelVisible"
      width="300px"
      center
    >
      <div style="text-align: center">是否删除该用户</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelVisible = false">取 消</el-button>
        <el-button :loading="dialogDelLoading" type="primary" @click="confirmDel">确 定</el-button>
      </span>
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
  @Action('user/del') del: any
  @Action('user/resetPwd') resetPwd: any

  form: any = {
    ...this.detail
  }

  pageNumber: number = 1

  loading: boolean = false
  // 已选角色
  roleChoosed: Array<string|number> = []

  query: any = {

  }

  tabelHeader: any = []
  dialogDelVisible: boolean = false

  currentPermissions: any = []

  createUser() {
    this.dialogFormVisible = true
    this.isNew = true

    this.form = {}
    this.roleChoosed = []
  }

  isNew: boolean = false
  handleEdit(row) {
    const { id } = row
    this.loading = false
    this.isNew = false

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

  // DDDDDDDel
  openedDelId: any
  dialogDelLoading: boolean = false
  handleOpenDel(row) {
    const { id } = row
    this.openedDelId = id
    this.dialogDelVisible = true
  }

  confirmDel(done) {
    this.dialogDelLoading = true
    this.del(this.openedDelId).then(() => {
      this.submitQuery()
      this.dialogDelLoading = false
      this.dialogDelVisible = false
    }).catch(() => {
      this.dialogDelLoading = false
    })
  }
  // END DDDDDDDel

  // IM PPPPPPPPassword
  resetId: any
  formPwd: any = {
    new: '',
    new2: ''
  }
  validatePass(rule, value, callback) {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      if (this.formPwd.new2 !== '') {
        this.$refs.formPwd.validateField('new2');
      }
      callback();
    }
  }
  validatePass2(rule, value, callback) {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== this.formPwd.new) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  }
  rulesPwd: any = {
    new: [
      { validator: this.validatePass, trigger: 'blur' }
    ],
    new2: [
      { validator: this.validatePass2, trigger: 'blur' }
    ]
  }
  dialogPwdVisible: boolean = false
  pwdLoading: boolean = false
  pwdUpdateSubmit() {
    this.$refs.formPwd.validate((valid, msg) => {
      if (valid) {
        this.pwdLoading = true
        this.resetPwd({
          id: this.resetId,
          newPassword: this.formPwd.new,
        }).then(() => {
          this.dialogPwdVisible = false
          this.pwdLoading = false
        }).catch(() => {
          this.pwdLoading = false
        })
      } else {
        return false;
      }
    });
  }

  
  handlePassword(row) {
    this.dialogPwdVisible = true
    this.resetId = row.id
  }
  // END Pwd

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
    this.submitQuery(pageNumber)
  }

  submitQuery(pageNumber = null) {
    if (pageNumber != null) {
      this.pageNumber = pageNumber
    }
    this.getList({
      ...this.query,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    })
  }

  mounted() {
    const { userType } = this.user
    this.tabelHeader = tabelHeader[userType]

    this.getList({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    })
  }
}
</script>
