<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <div class="login-outer">
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
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              @click="handleLogin"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script lang="ts">
import { State, Getter, Action } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  $refs: any

  @Action('auth/login') login: any
  
  rules: any = {
    // name: [
    //   { required: true, message: '用户名不能为空'}
    // ],
    // password: [
    //   { required: true, message: '密码不能为空'}
    // ]
  }

  loading: boolean = false

  form: any = {
    name: '',
    password: '',
  }

  handleLogin() {
    this.$refs.form.validate((valid) => {
      if (valid) {
        // this.$message.success('登录成功')
        this.loading = true

        this.login(this.form).then(() => {
          this.loading = false
          this.$router.replace('/')
        }).catch(() => {
          this.loading = false
        })
      }
    })
  }

  mounted() {
  }
}
</script>

<style style="scss">
.el-header {
  border-bottom: 1px solid #ebebeb;
}
.login-outer {
  width: 400px;
  margin: 100px auto 0 auto;
  border: 1px solid #ebebeb;
  background: #fff;
  box-shadow: 0px 4px 12px -4px #ccc;
  padding: 60px 60px 30px 30px;
  border-radius: 6px;
}
.el-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  border-top: 1px solid #ebebeb;
}
</style>
