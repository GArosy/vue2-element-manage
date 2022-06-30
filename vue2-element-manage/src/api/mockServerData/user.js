import { number } from "echarts";
import Mock from "mockjs";

const param2Obj = function (url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  // json转js，解码url
  return JSON.parse(
    `{"${decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .raplace(/&/g, '","')
      .raplace(/=/g, '":"')}}`
  );
};

let List = [];
const count = 200;

// 循环产生200个随机用户信息
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      // 随机生成GUID
      id: Mock.Random.guid(),
      // 随机生成一个常见的中文名
      name: Mock.Random.cname(),
      // 随机生成一个（中国）县，true表示生成所属的省、市
      addr: Mock.Random.county(true),
      // 生成一个大于等于 18、小于等于 60 的整数，属性值 number 只是用来确定类型
      "age|18-60": number,
      // 生成日期字符串，默认值为 yyyy-MM-dd
      birth: Mock.Random.date(),
      "sex|0-1": number,
    })
  );
}

export default {
  // 获取列表
  getUserList: (config) => {
    // 解构赋值经 param2Obj 解析后的 name page limit
    const { name, page = 1, limit = 20 } = param2Obj(config.url);
    console.log(`name:${name}`, `page:${page}`, `limit:${limit}`);
    const mockList = List.filter((user) => {
      if (
        name &&
        user.name.indexOf(name) === -1 &&
        user.addr.indexOf(name) === -1
      )
        return false;
      return true;
    });
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );
    return {
      code: 20000,
      count: mockList.length,
      list: pageList,
    };
  },
  // 增加用户
  createUser: (config) => {
    // console.log(config);
    const { name, addr, age, birth, sex } = JSON.parse(config.body);
    console.log(JSON.parse(config.body));
    List.unshift({
      id: Mock.Random.guid(),
      name,
      addr,
      age,
      birth,
      sex,
    });
    return {
      code: 20000,
      data: {
        message: "添加成功",
      },
    };
  },
  // 删除用户
  deleteUser: (config) => {
    const { id } = param2Obj(config.url);
    if (!id) {
      return {
        code: -999,
        message: "参数错误",
      };
    } else {
      List = List.filter((u) => u.id !== id);
      return {
        code: 20000,
        message: "删除成功",
      };
    }
  },
  // 编辑用户
  updateUser: (config) => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body);
    const sexNum = parseInt(sex);
    List.some((u) => {
      if (u.id === id) {
        u.name = name;
        u.addr = addr;
        u.age = age;
        u.birth = birth;
        u.sex = sexNum;
        return true;
      }
    });
    return {
      code: 20000,
      data: {
        message: "编辑成功",
      },
    };
  },
};
