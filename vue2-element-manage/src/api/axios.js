import axios from 'axios';
import config from '@/config/index.js';

// 判断环境是否为开发环境
// 根据当前环境获取API根目录
const baseURL = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.prod;

class HttpRequest {
    // 属性
    constructor(baseURL = '') {
        this.baseURL = baseURL;
    }

    // 方法
    // 设置默认配置
    getInsideConfig() {
        const config = {
            baseURL: this.baseURL,
            header: {}
        }
        return config;
    }

    // 拦截器
    interceptors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // console.log(response, 'response');
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // console.log(error);
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    // 请求
    request(options) {
        const instance = axios.create();
        options = { ...this.getInsideConfig(), ...options };
        this.interceptors(instance);
        return instance(options);
    }
}

// 暴露类的实例
export default new HttpRequest(baseURL)