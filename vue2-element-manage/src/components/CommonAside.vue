<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
    :collapse-transition="false"
  >
    <h3>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
    <!-- 一级菜单 -->
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :key="item.path"
      :index="item.path + ''"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 二级菜单 -->
    <el-submenu
      v-for="item in hasChildren"
      :key="item.path"
      :index="item.path + ''"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          @click="clickMenu(subItem)"
          v-for="subItem in item.children"
          :key="subItem.path"
        >
          <i :class="`el-icon-${subItem.icon}`"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="scss" scoped>
// 折叠菜单宽度，将.el-menu--collapse排除，否则动画效果出现BUG
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  position: fixed;
  height: 100%;
  border: none;

  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    // 点击跳转
    clickMenu(item) {
      // console.log(this.$router);
      this.$router
        .push({
          name: item.name,
        })
        .catch((e) => {}); // 捕获 router.push 异常，解决重复点击报错问题
    },
  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.Tab.isCollapse;
    },
    asyncMenu() {
      return this.$store.state.Tab.menu;
    },
  },
};
</script>
