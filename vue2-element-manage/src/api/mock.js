import Mock from "mockjs";
import homeApi from './mockServerData/home';
import userApi from './mockServerData/user';
import permissionApi from './mockServerData/permission';

// mock请求：Mock.mock(url,function()) 当拦截到url时，function将被执行，并返回函数执行结果
// Mock.mock('/api/home/getData', homeApi.getStaticalData);
// url可以是正则表达式
Mock.mock(/getData/, homeApi.getStaticalData);
Mock.mock(/user\/add/,'post', userApi.createUser);
Mock.mock(/user\/edit/,'post', userApi.updateUser);
Mock.mock(/user\/getUser/,'get', userApi.getUserList);
Mock.mock(/user\/del/,'get', userApi.deleteUser);
Mock.mock(/permission\/getMenu/,'post', permissionApi.getMenu);