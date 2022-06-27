<template>
  <header>
    <div class="l-content">
      <el-button
        @click="handleMenu()"
        icon="el-icon-menu"
        size="mini"
        plain
      ></el-button>
      <!-- <h3 style="color: #fff;">首页</h3> -->
      <!-- 使用面包屑组件 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <!-- 下拉菜单 -->
    <div class="r-content">
      <el-dropdown trigger="click">
        <span>
          <img class="user" :src="userImg" alt="用户头像" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.l-content {
  display: flex;
  flex-direction: row;
  align-items: center;

  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  display: flex;

  .user {
    width: 40px;
    height: 40px;
    border: solid #fff 1px;
    border-radius: 50%;
  }
}
</style>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/logo.png"),
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
      // 获取tabsList数组
      tags: (state) => state.Tab.tabsList,
    }),
  },
};
</script>
