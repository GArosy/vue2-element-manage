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
      id: Mock.Random.id(),
      // 随机生成商品名
      name: Mock.Random.cword(2, 6),
      // 随机生成价格
      price: Mock.Random.integer(10, 2000),
      // 随机生成数量
      amount: Mock.Random.integer(100,1000),
      // 随机生成类目
      type: Mock.Random.cword(2, 6),
      // 图片
      photo: '',
      // 随机生成一段描述
      description: Mock.Random.csentence()
    })
  );
}

export default {
  // 获取商品列表数据
  getGoodsList: (config) => {
    // 解构赋值经 param2Obj 解析后的 name page limit
    // console.log(config);
    const { name, page = 1, limit = 20 } = param2Obj(config.url);
    // console.log(`name:${name}`, `page:${page}`, `limit:${limit}`);
    // 过滤空数据
    const mockList = List.filter((good) => {
      if (
        name &&
        good.name.indexOf(name) === -1 &&
        good.addr.indexOf(name) === -1
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
  // 增加商品
  createGood: (config) => {
    // console.log(config);
    const newItem = JSON.parse(config.body);
    newItem.id = Mock.Random.id();
    List.unshift(newItem);
    console.log("新增项:", newItem);
    return {
      code: 20000,
      data: {
        message: "添加成功",
      },
    };
  },
  // 删除商品
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
  // 编辑商品
  updateGood: (config) => {
    const { id, name, price, amount, type, photo, description } = JSON.parse(config.body);
    List.some((u) => {
      if (u.id === id) {
        u.id = id;
        u.name = name;
        u.price = price;
        u.amount = amount;
        u.type = type;
        u.photo = photo;
        u.description = description;
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
