import Mock from "mockjs";
import homeApi from '../mockServer/data/home';
import userApi from '../mockServer/data/user';
import mallApi from '../mockServer/data/mall';
import permissionApi from '../mockServer/data/permission';

// mock请求：Mock.mock(url,function()) 当拦截到url时，function将被执行，并返回函数执行结果
// Mock.mock('/api/home/getData', homeApi.getStaticalData);
// url可以是正则表达式
Mock.mock(/getData/, homeApi.getStaticalData);
// 用户api
Mock.mock(/user\/add/,'post', userApi.createUser);
Mock.mock(/user\/edit/,'post', userApi.updateUser);
Mock.mock(/user\/getUser/,'get', userApi.getUserList);
Mock.mock(/user\/del/,'get', userApi.deleteUser);
// 商品api
Mock.mock(/mall\/add/,'post', mallApi.createGood);
Mock.mock(/mall\/edit/,'post', mallApi.updateGood);
// Mock.mock(/mall\/getGoods/,'get', mallApi.getGoodsList);
Mock.mock(/mall\/del/,'get', mallApi.deleteGood);
// 获取菜单
Mock.mock(/permission\/getMenu/,'post', permissionApi.getMenu);