import Mock from "mockjs";
export default {
  getMenu: (config) => {
    // 解析传入的json字符串，解构为用户名和密码
    const { userName, password } = JSON.parse(config.body);
    // 判断用户是否存在
    // 判断账号密码是否对应
    // console.log(userName, password);
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
              url: "Home",
            },
            {
              path: "/mall",
              name: "mall",
              label: "商品管理",
              icon: "s-goods",
              url: "Mall",
            },
            {
              path: "/user",
              name: "user",
              label: "用户管理",
              icon: "user-solid",
              url: "User",
            },
            {
              label: "其他",
              icon: "info",
              children: [
                {
                  path: "/usercenter",
                  name: "usercenter",
                  label: "个人中心",
                  icon: "s-custom",
                  url: "UserCenter",
                },
                {
                  path: "/introduction",
                  name: "introduction",
                  label: "项目说明",
                  icon: "question",
                  url: "Information",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "管理员登录成功",
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
              url: "Home",
            },
            {
              path: "/mall",
              name: "mall",
              label: "商品管理",
              icon: "s-goods",
              url: "Mall",
            },
            {
              label: "其他",
              icon: "info",
              children: [
                {
                  path: "/usercenter",
                  name: "usercenter",
                  label: "个人中心",
                  icon: "s-custom",
                  url: "UserCenter",
                },
                {
                  path: "/introduction",
                  name: "introduction",
                  label: "项目说明",
                  icon: "question",
                  url: "Information",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "用户登录成功",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message: "用户名或密码错误",
        },
      };
    }
  },
};
