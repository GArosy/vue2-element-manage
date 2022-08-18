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
      params,
    });
  },
};

export default api;
