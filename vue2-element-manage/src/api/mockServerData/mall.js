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

// 循环产生200个随机商品信息
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      // 随机生成GUID
      id: Mock.Random.guid(),
      // 随机生成商品名
      name: Mock.Random.cword(2, 6),
      // 随机生成价格
      price: Mock.Random.integer(10, 10000),
      // 随机生成数量
      amount: Mock.Random.integer(100,1000),
      // 随机生成类目
      type: Mock.Random.cword(2, 6),
      // 图片
      photo: '',
      
      "sex|0-1": 1,
    })
  );
}

export default {
  // 获取用户列表数据
  getGoodsList: (config) => {
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
  createGood: (config) => {
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
  deleteGood: (config) => {
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
  updateGood: (config) => {
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
