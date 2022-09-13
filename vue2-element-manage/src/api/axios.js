import axios from "axios";
import config from "@/config/index.js";
import router from "../router";

// 判断环境是否为开发环境
// 根据当前环境获取API根目录
const baseURL =
  process.env.NODE_ENV === "development"
    ? config.baseURL.dev
    : config.baseURL.prod;

class HttpRequest {
  // 属性
  constructor(baseURL = "") {
    this.baseURL = baseURL;
  }

  // 方法
  // 设置默认配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseURL,
      header: {},
    };
    return config;
  }

  // 拦截器
  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      function (config) {
        const token = JSON.parse(localStorage.getItem("user")).token;
        // console.log(token);
        // 在发送请求之前做些什么
        if (token) {
          config.headers.Authorization = token;
        }
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
      function (response) {
        // console.log(response, 'response');
        // 对响应数据做点什么
        return response;
      },
      function (error) {
        // console.log(error);
        // 对响应错误做点什么
        // 拦截token错误导致的401错误
        if (error.response) {
          switch (error.response.status) {
            case 401:
              router.replace({
                path: "login",
                query: { redirect: router.currentRoute.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
              });
              break;
            default:
              break;
          }
        }
        return Promise.reject(error);
      }
    );
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
export default new HttpRequest(baseURL);
