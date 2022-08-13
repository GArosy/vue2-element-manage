<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <!-- 内容区域 -->
    <el-container :class="{ marginCollapse: isCollapse }">
      <el-header>
        <common-header></common-header>
      </el-header>
      <el-main>
        <!-- 路由入口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
export default {
  name: "Home",
  components: {
    CommonAside,
    CommonHeader,
  },
  data() {
    return {};
  },
  computed: {
    isCollapse() {
      return this.$store.state.Tab.isCollapse;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;

  .el-container {
    margin-left: 200px;
  }
  .marginCollapse {
    margin-left: 64px;
  }
}
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
</style>
