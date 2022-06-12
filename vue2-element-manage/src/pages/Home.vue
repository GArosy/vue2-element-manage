<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header></el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
export default {
  name: "Home",
  components: {
    CommonAside,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
</style>