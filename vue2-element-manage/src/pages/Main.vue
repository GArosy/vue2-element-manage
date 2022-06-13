<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
export default {
  name: "Home",
  components: {
    CommonAside,
    CommonHeader
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