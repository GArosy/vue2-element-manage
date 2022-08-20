/**
 * 请求的方法
 */

import axios from "./axios";
import base from "./base";

const api = {
  getGoods(params) {
    return axios.request({
      url: base.goodsList,
      method: "GET",
      params,
    });
  },
  createGoods(params) {
    return axios.request({
      url: base.createGoods,
      method: "POST",
      params,
    });
  },
  editGoods(params) {
    return axios.request({
      url: base.editGoods,
      method: "POST",
      params,
    });
  },
  delGoods(params) {
    return axios.request({
      url: base.delGoods,
      method: "GET",
      params,
    });
  },
  uploadPics(params) {
    return axios.request({
      url: base.uploadPics,
      method: "POST",
      // 设置headers，到达后端时会自动转换为formdata格式
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: params,
    });
  },
  showGoodsPicsList(params) {
    return axios.request({
      url: base.showGoodsPicsList,
      method: "GET",
      params,
    });
  },
};

export default api;
