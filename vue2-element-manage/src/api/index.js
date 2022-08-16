/**
 * 请求的方法
 */

import axios from "./axios";
import base from './base';

const api = {
  getGoods(params) {
    return axios.request({
      url: base.goodsList,
      method: "GET",
      params,
    });
  },
};

export default api;
