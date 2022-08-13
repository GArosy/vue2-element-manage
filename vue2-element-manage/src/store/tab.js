import Cookie from "js-cookie";

export default {
  state: {
    isCollapse: false,
    iconFold: "el-icon-s-fold",
    tabsList: [
      {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "home",
      },
    ],
    currentMenu: null,
    menu: [],
  },
  // 定义方法
  mutations: {
    // 侧边栏伸缩
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
      state.isCollapse
        ? (state.iconFold = "el-icon-s-unfold")
        : (state.iconFold = "el-icon-s-fold");
    },
    // 选择面包屑
    selectMenu(state, val) {
      if (val.name !== "home") {
        //
        state.currentMenu = val;
        // 查找tabsList中是否已存在传入的name
        const result = state.tabsList.findIndex(
          (item) => item.name === val.name
        );
        if (result === -1) {
          // 如果不存在val.name，则添加
          state.tabsList.push(val);
        }
      } else {
        state.currentMenu = null;
      }
    },
    // 菜单权限相关
    setMenu(state, value) {
      state.menu = value;
      Cookie.set("menu", JSON.stringify(value));
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove("menu");
    },
    addMenu(state, router) {
      // 如果cookie中没有menu则不做处理
      if (!Cookie.get("menu")) {
        return;
      }
      const menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      const manuArray = [];
      menu.forEach((item) => {
        // 二级菜单
        if (item.children) {
          // 为菜单中的路由添加路径
          item.children = item.children.map((item) => {
            item.component = () => import(`@/pages/${item.url}`);
            return item;
          });
          manuArray.push(...item.children);
        } else {
          // 一级菜单
          item.component = () => import(`@/pages/${item.url}`);
          manuArray.push(item);
        }
      });
      // 路由的动态添加
      manuArray.forEach((item) => {
        router.addRoute("main", item);
      });
    },
  },
};
