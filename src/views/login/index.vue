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
      </div>
    </el-main>
    <!-- <el-footer></el-footer> -->
  </el-container>
</template>

<script lang="ts">
/* eslint-disable */
import { State, Getter, Action } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  $refs: any

  @Action('auth/login') login: any
  
  rules: any = {
    name: [
      { required: true, message: '用户名不能为空'}
    ],
    password: [
      { required: true, message: '密码不能为空'}
    ]
  }

  loading: boolean = false

  form: any = {
    name: 'super@admin.com',
    password: '12345678',
  }

  handleLogin() {
    this.$refs.form.validate((valid) => {
      if (valid) {
        this.loading = true

        this.login(this.form).then(() => {
          this.$message.success('登录成功')

          setTimeout(() => {
            this.$router.replace('/')
          }, 1000)
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

<style lang="scss">
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
  padding: 10px 60px 30px 30px;
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
