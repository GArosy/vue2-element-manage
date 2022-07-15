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
      <!-- 用 ‘>’ 分隔-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
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
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
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
// 引入vuex辅助函数mapState生成计算属性
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
    logOut() {
      this.$store.commit('clearToken')  // 清除token
      this.$store.commit('clearMenu')   // 清除menu
      this.$router.push({name: 'login'})  // 跳转至登陆页面
    }
  },
  computed: {
    // 使用对象展开运算符将mapState内的数据展开至计算属性中
    ...mapState({
      // 获取tabsList数组
      tags: (state) => state.Tab.tabsList,
    }),
  },
};
</script>
