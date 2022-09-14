<template>
  <!-- 容器 -->
  <div class="container">
    <!-- 表单组件 -->
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="login-container"
      @submit.native.prevent
    >
      <!-- 标题 -->
      <h3 class="login-title">通用后台管理系统</h3>
      <!-- 输入框 -->
      <el-form-item
        label="用户名"
        label-width="60px"
        prop="userName"
        class="username"
      >
        <el-input
          type="input"
          v-model="form.userName"
          auto-complete="off"
          placeholder="请输入用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        label-width="60px"
        prop="password"
        class="password"
      >
        <el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <div class="login-submit">
        <!-- 按钮 -->
        <el-form-item>
          <el-button @click="register">注册</el-button>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
// import Mock from "mockjs";
import jwtDecode from "jwt-decode";
import { getMenu } from "@/api/mockServer/index";
import { mapMutations } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
      // 校验规则
      rules: {
        userName: [
          { require: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 18,
            message: "用户名长度应在4-18位之间",
            trigger: "blur",
          },
        ],
        password: [
          { require: true, message: "请输入密码", trigger: "blur" },
          {
            min: 4,
            max: 18,
            message: "密码长度应在4-18位之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 使用辅助函数引入vuex方法
    ...mapMutations("User", ["setToken"]),
    // login() {
    //   // 调用后台接口
    //   getMenu(this.form).then((res) => {
    //     if (res.data.code === 20000) {
    //       this.$store.commit("clearMenu");
    //       this.$store.commit("setMenu", res.data.data.menu);
    //       this.$store.commit("setToken", res.data.data.token);
    //       this.$store.commit("addMenu", this.$router);
    //       this.$router.push({ name: "home" });
    //       this.$message.success(res.data.data.message);
    //     } else {
    //       this.$message.error(res.data.data.message);
    //     }
    //   });
    // },
    register() {
      const { userName, password } = this.form;
      this.$api
        .register({ userName, password })
        .then((res) => {
          if (res.data.code === 1) {
            this.$message.success("注册成功");
          } else if (res.data.code === -1) {
            this.$message.error("注册失败");
          } else if (res.data.code === 0) {
            this.$message.error("用户名已存在");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login() {
      if (this.form.userName === "" || this.form.password === "") {
        this.$message.error("账号或密码不能为空");
      } else {
        const { userName, password } = this.form;
        this.$api
          .login({ userName, password })
          .then((res) => {
            // console.log(res);
            let token = res.data.data;
            // 向vuex储存登录信息
            this.setToken(token);
            // 储存到本地
            localStorage.setItem("token", token);
            // 跳转
            this.$router.push("/home");
            this.$store.commit("setMenu", JSON.stringify(res.data.menu));
            // this.$store.commit("addMenu", this.$router);
            this.$message.success("登录成功");
          })
          .catch((e) => {
            console.log(e);
            this.$message.error("账号或密码错误");
          });
      }
    },
  },
  /**
   *    实现回车提交
   * 1. 当表单中只有一个输入框时，按钮会默认为提交按钮，但会同时触发刷新页面
   *    需要在表单上添加 @submit.native.prevent，阻止表单默认提交事件
   * 2. 在登录按钮上面添加 native-type=“submit”
   * 3. 监听键盘来触发登录事件
   */
  created() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.login();
      } else return;
    });
  },
};
</script>

<style lang="scss" scoped></style>
