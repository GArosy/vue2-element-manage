import Mock from "mockjs";
import homeApi from './mockServerData/home';

// mock请求：Mock.mock(url,function()) 当拦截到url时，function将被执行，并返回函数执行结果
// url可以是正则表达式
// Mock.mock(/getData/, homeApi.getStaticalData);
Mock.mock('/api/home/getData', homeApi.getStaticalData);