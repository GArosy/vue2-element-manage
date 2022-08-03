import axios from "./axios";

export const getData = () => {
  return axios.request({
    url: "/home/getData",
  });
};

export const getUser = (params) => {
  return axios.request({
    url: "/user/getUser",
    method: "GET",
    params,
  });
};

export const getGoods = (params) => {
  return axios.request({
    url: "/mall/getGoods",
    method: "GET",
    params,
  });
};

export const getMenu = (params) => {
  return axios.request({
    url: "/permission/getMenu",
    method: "post",
    data: params,
  });
};
