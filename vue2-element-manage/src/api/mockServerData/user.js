import Mock from "mockjs";

const param2Obj = function (url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  // json转js，解码url(使用字符串拼接，这里使用模板字符串会报错！)
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};

let List = [];
const count = 200;
const currentYear = new Date().getFullYear();

// 循环产生200个随机用户信息
for (let i = 0; i < count; i++) {
  // 生成日期字符串，默认值为 yyyy-MM-dd
  const birth = Mock.Random.date();
  const age = currentYear - birth.slice(0, 4);
  List.push(
    Mock.mock({
      // 随机生成GUID
      id: Mock.Random.guid(),
      // 随机生成一个常见的中文名
      name: Mock.Random.cname(),
      // 随机生成一个（中国）县，true表示生成所属的省、市
      addr: Mock.Random.county(true),
      // 生成一个大于等于 18、小于等于 60 的整数，属性值 number 只是用来确定类型
      age,
      birth,
      "sex|0-1": 1,
    })
  );
}

export default {
  // 获取用户列表数据
  getUserList: (config) => {
    // 解构赋值经 param2Obj 解析后的 name page limit
    // console.log(config);
    const { name, page = 1, limit = 20 } = param2Obj(config.url);
    // console.log(`name:${name}`, `page:${page}`, `limit:${limit}`);
    // 过滤空数据
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
    const newItem = JSON.parse(config.body);
    newItem.id = Mock.Random.guid();
    List.unshift(newItem);
    console.log("新增项:", newItem);
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
