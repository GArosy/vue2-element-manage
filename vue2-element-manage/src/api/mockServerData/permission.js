import Mock from "mockjs";
export default {
  getMenu: (config) => {
    const { userName, password } = JSON.parse(config.body);
    // 判断用户是否存在
    // 判断账号密码是否对应
    if (userName === "admin" && password === "admin") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "Home/Home",
            },
            {
              path: "/mall",
              name: "mall",
              label: "商品管理",
              icon: "video-play",
              url: "MallManage/MallManage",
            },
            {
              path: "/user",
              name: "user",
              label: "用户管理",
              icon: "user",
              url: "UserManage/UserManage",
            },
            {
              label: "其他",
              icon: "location",
              children: [
                {
                  path: "/page1",
                  name: "page1",
                  label: "页面1",
                  icon: "setting",
                  url: "Other/Page1",
                },
                {
                  path: "/page2",
                  name: "page2",
                  label: "页面2",
                  icon: "setting",
                  url: "Other/Page2",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (userName === "user" && password === "user") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "Home/Home",
            },
            {
              path: "/mall",
              name: "mall",
              label: "商品管理",
              icon: "video-play",
              url: "MallManage/MallManage",
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message: "密码错误",
        },
      };
    }
  },
};
