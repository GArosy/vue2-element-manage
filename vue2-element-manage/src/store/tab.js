import Cookie from "js-cookie";

export default {
  state: {
    isCollapse: false,
    iconFold: "el-icon-s-fold",
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
    // 菜单权限相关
    setMenu(state, value) {
      state.menu = JSON.parse(value);
      Cookie.set("menu", value);
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
