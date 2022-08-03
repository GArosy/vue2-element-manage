// 全局引入router
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 定义一些路由，将以上组件映射到路由
const routes = [
  // 定义根目录下的路由，component为按需引入的组件页面home
  {
    path: "/",
    name: "main",
    component: () => import("@/pages/Main"),
    // 路由嵌套
    children: [
      {
        path: "/home",
        name: "home",
        label: "首页",
        component: () => import("@/pages/Home"),
      },
      {
        path: "/user",
        name: "user",
        label: "用户管理",
        component: () => import("@/pages/User"),
      },
      {
        path: "/mall",
        name: "mall",
        label: "商品管理",
        component: () => import("@/pages/Mall"),
      },
      {
        path: "/usercenter",
        name: "usercenter",
        label: "个人中心",
        component: () => import("@/pages/UserCenter"),
      },
      {
        path: "/introduction",
        name: "introduction", 
        label: "项目说明",
        component: () => import("@/pages/Introduction"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    label: "登录",
    component: () => import("@/pages/Login"),
  },
];

// 创建路由实例并传递 `routes` 配置
const router = new VueRouter({
  mode: "history",
  base: "/", // 配置 nginx 访问结构
  routes, // `routes: routes` 的缩写
});

// 导出
export default router;
