<template>
  <el-container>
    <el-header>
      <div class="header-inner">
        <span class="logo"><img src="https://www.sgmw.com.cn/images/pic_logo.jpg" /></span>
      </div>
    </el-header>
    <el-main>
      <div class="login-outer">
        <div class="login-title">
          <font-awesome-icon :icon="['fas', 'user-circle']" /><span>用户登录</span>
        </div>
        <div class="login-inner">
          <el-form
            ref="form"
            label-width="80px"
            :model="form"
            :rules="rules"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password" @keyup.native="handleQuickLogin"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :loading="loading"
                @click="handleLogin"
              >登录</el-button>
            </el-form-item>
          </el-form>
          <div class="download" v-show="!isChrome">
            为了您更好的使用本系统，推荐您使用Chrome浏览器，
            <br/>windows版本下载地址为：
            <a href="http://down-www.newasp.net/pcdown/soft/soft1/google_chrome_installer.zip">32为浏览器</a>，
            <a href="http://down-www.newasp.net/pcdown/soft/soft1/chrome64_installer.rar">64位浏览器</a>
            <br/>mac版本下载地址为：
            <a href="http://www.pc6.com/down.asp?id=110545">chrome浏览器</a>
          </div>
        </div>
      </div>
    </el-main>
    <!-- <el-footer></el-footer> -->

    <!--  -->
    <el-dialog
      title="提示"
      :visible.sync="dialogDelVisible"
      width="300px"
      :show-close="false"
      :close-on-click-modal="false"
      center
    >
      <div style="text-align: center">密码即将过期，请尽快修改密码</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handle2Login">继续登陆</el-button>
        <el-button :loading="dialogDelLoading" type="primary" @click="confirmDel">立即修改</el-button>
      </span>
    </el-dialog>

        <!-- 修改密码 -->
    <el-dialog title="修改密码" width="480px" :visible.sync="dialogPwdVisible" :close-on-click-modal="false">
      <el-form
        :model="formPwd"
        :rules="rulesPwd"
        ref="formPwd"
      >
        <el-form-item prop="old" label="原密码" :label-width="formLabelWidth">
          <el-input v-model="formPwd.old" style="width: 300px" type="password" auto-complete="off"></el-input>
        </el-form-item>
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
  </el-container>
</template>

<script lang="ts">
/* eslint-disable */
import { State, Getter, Action } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'

const userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
const isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器 
  

@Component
export default class Login extends Vue {
  $refs: any

  @Action('auth/login') login: any
  @Action('auth/changePwd') changePwd: any
  
  rules: any = {
    name: [
      { required: true, message: '用户名不能为空'}
    ],
    password: [
      { required: true, message: '密码不能为空'}
    ]
  }

  loading: boolean = false
  isChrome: boolean = isChrome

  form: any = {
    name: '',
    password: '',
  }

  handleLogin() {
    this.$refs.form.validate((valid) => {
      if (valid) {
        this.loading = true

        this.login(this.form).then((res) => {
          if (res.code === 200) {
            const { needUpdatePsw } = res.data
            
            if (!needUpdatePsw || needUpdatePsw === 0) {
              this.$message.success('登录成功')

              setTimeout(() => {
                this.$router.replace('/')
              }, 1000)
            }
            else if (needUpdatePsw === 1) {

              this.dialogDelVisible = true
              return
            }
          }
        }).catch(() => {
          this.loading = false
        })
      }
    })
  }

  handleQuickLogin(event) {
    if (event.keyCode === 13) {
      this.handleLogin()
    }
  }

  handle2Login() {
    this.$router.replace('/')
  }

  dialogDelLoading: boolean = false
  dialogDelVisible: boolean = false
  confirmDel() {
    this.loading = false

  // this.$message.success('密码即将过期')
  // this.$message.success('密码已过期，请重新修改密码')
  // setTimeout(() => {
    this.formPwd = {
      old: '',
      new: '',
      new2: ''
    }
    this.dialogDelVisible = false
    this.handleChangePwd()
  // }, 1000)
  }

  // IM PPPPPPPPassword
  formLabelWidth: any = '120px'
  dialogPwdVisible: boolean = false
  handleChangePwd() {
    this.dialogPwdVisible = true
  }

  formPwd: any = {
    old: '',
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
    old: [
      { required: true, message: '原密码必填', trigger: 'blur' }
    ],
    new: [
      { required: true, validator: this.validatePass, trigger: 'blur' }
    ],
    new2: [
      { required: true, validator: this.validatePass2, trigger: 'blur' }
    ]
  }

  pwdLoading: boolean = false
  pwdUpdateSubmit() {
    this.$refs.formPwd.validate((valid, msg) => {
      if (valid) {
        this.pwdLoading = true
        this.changePwd({
          oldPassword: this.formPwd.old,
          newPassword: this.formPwd.new,
        }).then(() => {
          this.$message.success('密码修改成功，请重新登录')
          this.form = {
            name: '',
            password: '',
          }
          this.$nextTick(() => {
            this.$refs.form.resetFields()
            this.$refs.form.clearValidate()
          })
          setTimeout(() => {
            this.dialogPwdVisible = false
            this.pwdLoading = false
          }, 1000)
        }).catch(() => {
          this.pwdLoading = false
        })
      } else {
        return false;
      }
    });
  }
  // END Pwd
}
</script>

<style lang="scss">
.download {
  text-align: center;
}
.el-header {
  border-bottom: 1px solid #ebebeb;
  background: #fff;
  box-shadow: 0 0 10px -4px #ccc;
  height: auto !important;

  .header-inner {
    width: 1000px;
    margin: 0 auto;
    .logo {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      padding: 10px 0;

      img {
        width: 100%;
        height: 100%;
      }
    }

    span {
      vertical-align: middle;
    }

    &__text {
      margin-left: 10px;
    }
  }
}
.login-outer {
  width: 400px;
  margin: 80px auto 0 auto;
  border: 1px solid #ebebeb;
  background: #fff;
  box-shadow: 0px 4px 12px -4px #ccc;
  padding: 10px 30px 30px 30px;
  border-radius: 6px;
}
.login-inner {
  padding-right: 30px;
}
.el-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  border-top: 1px solid #ebebeb;
  background: #fff;
}

.login-title {
  height: 60px;
  line-height: 60px;
  border-bottom: #ebebeb 1px solid;
  margin-bottom: 30px;
  
  span {
    font-size: 14px;
    padding-left: 10px;
  }

  svg {
    font-size: 18px;
  }

  span, svg {
    vertical-align: middle;
  }
}
</style>
