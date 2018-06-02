<template>
  <div>
    <div class="sg-top-button">
      <el-button @click="createUser">新建用户</el-button>
      <el-button @click="exportList">导出</el-button>
    </div>

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
                <el-option label="锁定" :value="2" />
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
          layout="prev, pager, next, jumper"
          :total="datas.pagination.total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>

    <!-- modal -->
    <el-dialog
      :title="isNew ? '新增用户' : '修改用户信息'"
      center
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="form"
        :rules="formRules"
        ref="form"
      >
        <el-form-item label="登录名" prop="loginName" :label-width="formLabelWidth">
          <el-input :disabled="!isNew" style="width: 200px" v-model="form.loginName" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="name" :label-width="formLabelWidth">
          <el-input style="width: 200px" v-model="form.name" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item
          v-if="isNew"
          label="用户密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input type="password" style="width: 200px" v-model="form.password" auto-complete="off" ></el-input>
        </el-form-item>

        <el-form-item
          v-if="isNew"
          label="确认密码"
          prop="password1"
          :label-width="formLabelWidth"
        >
          <el-input type="password" style="width: 200px" v-model="form.password1" auto-complete="off" ></el-input>
        </el-form-item>

        <el-form-item label="用户类型" prop="userType" :label-width="formLabelWidth">
          <el-select :clearable="true" v-model="form.userType" :disabled="!isNew" placeholder="请选择用户类型">
            <el-option label="厂家用户" :value="1" />
            <el-option label="经销商" :value="2" />
            <el-option label="物流商" :value="3" />
          </el-select>
        </el-form-item>

        <el-form-item :label="deptNoName" prop="deptNo" :label-width="formLabelWidth">
          <el-input style="width: 200px" v-model="form.deptNo" auto-complete="off" ></el-input>
        </el-form-item>

        <el-form-item label="职务" :label-width="formLabelWidth">
          <el-input style="width: 200px" v-model="form.position" auto-complete="off" ></el-input>
        </el-form-item>

        <el-form-item label="所属区域" :label-width="formLabelWidth">
          <el-input style="width: 200px" v-model="form.region" auto-complete="off" ></el-input>
        </el-form-item>

        <el-form-item label="品牌" :label-width="formLabelWidth">
          <el-select :clearable="true" v-model="form.brand" placeholder="请选择品牌">
            <el-option label="五菱" :value="1" />
            <el-option label="宝骏" :value="2" />
          </el-select>
        </el-form-item>

        <el-form-item label="用户编码" :label-width="formLabelWidth">
          <el-input style="width: 200px" v-model="form.code" auto-complete="off" ></el-input>
        </el-form-item>

        <el-form-item label="电话号码" prop="phone" :label-width="formLabelWidth">
          <el-input style="width: 200px" v-model="form.phone" auto-complete="off" ></el-input>
        </el-form-item>

        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input style="width: 200px" v-model="form.email" auto-complete="off" ></el-input>
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

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio-group v-model="form.active">
            <el-radio :label="1">已启用</el-radio>
            <el-radio :label="0">已禁用</el-radio>
            <el-radio :label="2">已锁定</el-radio>
          </el-radio-group>
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
import getHeader, { tabelHeader } from './helper'
import { mixins } from 'vue-class-component'
import TableColor from '@/mixins/table-color/index.vue'
import DownloadMixin from '@/mixins/downloadMixin'
import { download } from '../../api'

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
  @Action('user/create') create: any
  @Action('user/del') del: any
  @Action('user/resetPwd') resetPwd: any

  defaultForm: any = {
    loginName: '',
    name: '',
    password: '',
    email: '',
    phone: '',
    deptNo: '',
    position: '',
    code: '',
    brand: '',
    userType: '',
    active: '',
  }

  formRules: any = {
    loginName: [
      { required: true, message: '登录名必填', trigger: 'blur' }
    ],
    name: [
      { required: true, message: '用户姓名必填', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '密码必填', trigger: 'blur' },
      { validator: this.validateAddPass, trigger: 'blur' }
    ],
    password1: [
      { required: true, message: '密码必填', trigger: 'blur' },
      { validator: this.validateAddPass1, trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '电话号码必填', trigger: 'blur' }
    ],
    deptNo: [
      { required: true, message: '编号必填', trigger: 'blur' }
    ],
    userType: [
      { required: true, message: '用户类型必填', trigger: 'blur' }
    ]
  }
  form: any = {
    ...this.detail
  }

  pageNumber: number = 1

  loading: boolean = false
  // 已选角色
  roleChoosed: Array<string|number> = []

  query: any = {

  }

  deptNoName: string = '部门编号'

  @Watch('form.userType')
  watchTypeChange(val) {
    if (val == 2) {
      this.deptNoName = '经销商号'
    } else if (val == 3) {
      this.deptNoName = '物流商号'
    } else {
      this.deptNoName = '部门编号'
    }
  }

  tabelHeader: any = []
  dialogDelVisible: boolean = false

  currentPermissions: any = []

  createUser() {
    this.dialogFormVisible = true
    this.isNew = true
    this.loading = false

    this.form = {
      active: 1
    }
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

  validateAddPass(rule, value, callback) {
    if (!/^.*(?=.{8,20})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(value)) {
      callback('密码必须包含大小写字母、数字、特殊字符，长度8至20位')
    } else {
      if (this.form.password1 !== '') {
        this.$refs.form.validateField('password1');
      }
      callback();
    }
  }

  validateAddPass1(rule, value, callback) {
    if (!/^.*(?=.{8,20})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(value)) {
      callback('密码必须包含大小写字母、数字、特殊字符，长度8至20位')
    } else if (value !== this.form.password) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  }

  // IM PPPPPPPPassword
  resetId: any
  formPwd: any = {
    new: '',
    new2: ''
  }
  validatePass(rule, value, callback) {
    if (!/^.*(?=.{8,20})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(value)) {
      callback('密码必须包含大小写字母、数字、特殊字符，长度8至20位')
    } else {
      if (this.formPwd.new2 !== '') {
        this.$refs.formPwd.validateField('new2');
      }
      callback();
    }
  }
  validatePass2(rule, value, callback) {
    if (!/^.*(?=.{8,20})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(value)) {
      callback('密码必须包含大小写字母、数字、特殊字符，长度8至20位')
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
  
  handlePassword(row) {
    this.dialogPwdVisible = true
    this.resetId = row.id

    this.formPwd = {}
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
  // END Pwd

  // show() {
  //   console.log(this.$refs.permissions)
  // }

  formatRoleSelect() {
    return this.roleChoosed.map(item => ({
      id: item
    }))
  }

  // create and update
  handleUpdate() {
    const { id, active } = this.form
    const { password1, ...props } = this.form

    const postData = {
      // id,
      // active,
      ...props,
      roles: this.formatRoleSelect()
    }

    this.$refs.form.validate((valid, msg) => {
      if (valid) {
        this.loading = true

        let action: any

        if (this.isNew) {
          action = this.create
        } else {
          action = this.update
        }

        action(postData).then(() => {
          this.dialogFormVisible = false
          this.loading = true
          this.submitQuery()
          this.$refs.form.clearValidate()
        }).catch(() => {
          this.loading = false
        })
      } else {
        return false;
      }
    });
  }

  handleCurrentChange(pageNumber) {
    this.submitQuery(pageNumber)
  }

  submitQuery(pageNumber = null) {
    if (typeof pageNumber !== 'number') {
      pageNumber = 1
    }
    if (pageNumber != null) {
      this.pageNumber = pageNumber
    }

    this.getList({
      ...this.query,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    })
  }

  exportList() {
    const query = { ...this.query }

    this.download(download.user, query)
  }

  mounted() {
    const { userType } = this.user
    // this.tabelHeader = tabelHeader[userType]
    // 目前需求仅仅使用 userType 1 的
    this.tabelHeader = getHeader(userType)

    this.getList({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    })
  }
}
</script>
