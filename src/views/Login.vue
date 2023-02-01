<template>
  <div class="login-page">
    <div class="login-container">
      <el-form
        ref="form"
        :model="form"
        label-width="70px"
        :rules="rules"
        size="small"
      >
        <h3 class="login-title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-button
          @click="submit"
          style="background-color: #94618e; border: none; color: #fff"
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api/";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
        console.log(this.form)
          getMenu(this.form).then(({ data }) => {
            console.log(data)
            if (data.code === 20000) {
              Cookie.set("token", data.data.token);
              //获取菜单的数据存入store中
              this.$store.commit('setMenu',  data.data.menu)
              this.$store.commit('setRoute', this.$router)
            
              //跳转到首页
              this.$router.push("/home");
            }else{
                this.$message.error(data.data.message)
            }
          });
        }
      });
    },
  },
};
</script>


<style lang="less" scoped>
/deep/ .el-form-item__label {
  color: #fff;
}

/deep/ .el-input .el-input__inner:focus {
    border-color: #94618e !important;
    
}

.login-page {
  height: 100vh;
  .login-container {
    width: 300px;
    margin: 180px auto;
    background-color: #49274a;
    padding: 30px 30px 5px 30px;
    border-radius: 10px;
    .login-title {
      text-align: center;
      margin: 0 auto 20px auto;
    }
    .el-input {
      width: 220px;
    }
    .el-button {
      display: block;
      margin: 30px auto;
    }
    .el-button:hover{
          background-color: #fff !important;
          color:  #49274a !important;
    }
  }
}
</style>

<style lang="less">
body {
  background-color: #e7dfdd;
}
</style>