/**
 * 接口路径配置
 */

const base = {
  // 用户注册
  register: "/user/register",
  // 用户登录
  login: "/user/login",

  // 商品列表
  goodsList: "/mall/getGoods",
  // 添加商品
  createGoods: "/mall/createGoods",
  // 编辑商品
  editGoods: "/mall/editGoods",
  // 删除商品
  delGoods: "/mall/delGoods",
  // 上传图片
  uploadPics: "/mall/uploadGoodsPics",
  // 回显已上传的图片列表
  showGoodsPicsList: "/mall/showGoodsPicsList",
  // 移除已上传图片
  removeGoodsPics: "/mall/removeGoodsPics",
};

export default base;
