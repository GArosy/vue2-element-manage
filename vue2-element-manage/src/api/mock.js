import Mock from "mockjs";
import homeApi from './mockServerData/home';
import userApi from './mockServerData/user';

// mock请求：Mock.mock(url,function()) 当拦截到url时，function将被执行，并返回函数执行结果
// Mock.mock('/api/home/getData', homeApi.getStaticalData);
// url可以是正则表达式
Mock.mock(/getData/, homeApi.getStaticalData);
Mock.mock(/user\/add/,'post', userApi.createUser);
Mock.mock(/user\/edit/,'post', userApi.updateUser);