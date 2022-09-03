// 全局引入router
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

Vue.use(VueRouter);

// 定义一些路由，将以上组件映射到路由
const routes = [
  // 定义根目录下的路由，component为按需引入的组件页面home
  {
    path: "/",
    name: "layout",
    component: () => import("@/pages/Layout/index.vue"),
    // 路由元信息：是否需要登录
    meta: { requiresAuth: true },
    // 路由嵌套
    children: [
      {
        path: "/home",
        name: "home",
        label: "首页",
        component: () => import("@/pages/Home"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/user",
        name: "user",
        label: "用户管理",
        component: () => import("@/pages/User"),
        meta: {
          title: "用户管理",
        },
      },
      {
        path: "/mall",
        name: "mall",
        label: "商品管理",
        component: () => import("@/pages/Mall"),
        meta: {
          title: "商品管理",
        },
      },
      {
        path: "/usercenter",
        name: "usercenter",
        label: "个人中心",
        component: () => import("@/pages/UserCenter"),
        meta: {
          title: "个人中心",
        },
      },
      {
        path: "/introduction",
        name: "introduction",
        label: "项目说明",
        component: () => import("@/pages/Introduction"),
        meta: {
          title: "项目说明",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    label: "登录",
    component: () => import("@/pages/Login/Login.vue"),
  },
];

// 创建路由实例并传递 `routes` 配置
const router = new VueRouter({
  mode: "history",
  base: "/", // 配置 nginx 访问结构
  routes, // `routes: routes` 的缩写
});

// 创建全局路由守卫，监听页面
router.beforeEach((to, from, next) => {
  console.log("from", from, "\n", "to", to);
  // 获取已保存的cookie，页面刷新后可以保留登录状态
  // store.commit("getToken");
  // const token = store.state.User.token;
  // 1. 判断是否需要登录
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('需要登录');
    // 2. 判断是否需要登录
    let token = false;
    if (token == true) {
      console.log('token true');
      next()
    } else {
      next({name: 'login'})
    }
  } else {  // 不需要登录
    console.log('不需要登录');
    next()
  }
  // 如果token不存在，且跳转页为，则导航至登录页
  // if (!token && to.name !== "login") {
  //   next({ name: "login" });
  //   // 如果token存在，且当前页为登录页（已登录状态），则导航至首页
  // } else if (token && to.name === "login") {
  //   next({ name: "home" });
  // } else {
  //   next();
  // }
});

// 导出
export default router;
