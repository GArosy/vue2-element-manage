<template>
  <div>
    <!-- 使用 router-link 导航 -->
    <router-link to="/">
      <el-button type="success" plain>Home页面</el-button>
    </router-link>
    <router-link to="/User">
      <el-button type="success" plain>User页面</el-button>
    </router-link>
    <router-link to="/Login">
      <el-button type="success" plain>Login页面</el-button>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "ElementUITest",
};
</script>