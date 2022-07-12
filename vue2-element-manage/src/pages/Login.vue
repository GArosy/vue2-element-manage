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
        ></el-input>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-form-item class="login-submit">
        <el-button
          type="primary"
          @click="login"
          class="login-submit"
          style="margin: auto"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Mock from "mockjs";
import { getMenu } from "@/api/data";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      form: {},
      // 校验规则
      rules: {
        userName: [
          { require: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "用户名长度应在4-18位之间",
            trigger: "blur",
          },
        ],
        password: [
          { require: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
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
        if (res.code === 20000) {
          this.$store.commit('clearMenu');
          this.$store.commit('setMenu', res.data.menu);
          this.$store.commit('setToken', res.data.token);
          this.$store.commit('addMenu', this.$router);
          this.$router.push({name: 'home'})
        } else {
          this.$message.warning(res.data.message)
        }
      });
      // 点击登陆后，使用Mock模拟后台提供token
      // const token = Mock.Random.guid();
      // this.$store.commit("setToken", token);
      // this.$router.push({ name: "home" });
    },
  },
};
</script>
