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
import { getMenu } from "@/api/mockServer/index";

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
            message: "密码长度应在4-10位之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      // 调用后台接口
      getMenu(this.form).then((res) => {
        if (res.data.code === 20000) {
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.data.menu);
          this.$store.commit("setToken", res.data.data.token);
          this.$store.commit("addMenu", this.$router);
          this.$router.push({ name: "home" });
          this.$message.success(res.data.data.message);
        } else {
          this.$message.error(res.data.data.message);
        }
      });
      // 点击登陆后，使用Mock模拟后台提供token
      // const token = Mock.Random.guid();
      // this.$store.commit("setToken", token);
      // this.$router.push({ name: "home" });
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
        console.log(e);
        this.login();
      } else return;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
