<template>
  <header>
    <div class="l-content">
      <el-button
        @click="handleMenu()"
        :icon="icon"
        size="mini"
        plain
      ></el-button>
      <!-- 使用面包屑组件 -->
      <!-- 用 ‘>’ 分隔-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="item in routes"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.meta.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <!-- 下拉菜单 -->
    <div class="r-content">
      <el-dropdown trigger="click">
        <div>
          <span class="username">{{ username }}</span>
          <img class="user" :src="userImg" alt="用户头像" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="jumpTo">个人中心</el-dropdown-item>
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
    padding: 5px 12px;
    font-size: 18px;
  }
}

.r-content {
  .el-dropdown-selfdefine {
    height: auto;
    display: flex;
    align-items: center;
    .user {
      width: 40px;
      height: 40px;

      border: solid #fff 1px;
      border-radius: 50%;
    }
    .username {
      margin: 1rem;
      font-size: 1rem;
      color: #fff;
    }
  }
}
</style>

<script>
// 引入vuex辅助函数mapState生成计算属性
import { mapState } from "vuex";
import jwtDecode from "jwt-decode";
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
      // this.$store.commit("clearToken"); // 清除token
      // this.$store.commit("clearMenu"); // 清除menu
      this.$store.commit("User/clearToken"); // 清除token
      this.$router.push({ name: "login" }); // 跳转至登陆页面
    },
    jumpTo() {
      this.$router.push({ name: "usercenter" });
    },
  },
  computed: {
    // 使用对象展开运算符将mapState内的数据展开至计算属性中
    ...mapState({
      // 获取tabsList数组
      tags: (state) => state.Tab.tabsList,
      icon: (state) => state.Tab.iconFold,
    }),
    username() {
      return jwtDecode(localStorage.getItem("token")).username;
    },
    // 监听路由（除首页），供面包屑组件遍历渲染
    routes() {
      return this.$route.matched.filter((item) => {
        return item.name !== "layout" && item.name !== "home";
      });
    },
  },
};
</script>
