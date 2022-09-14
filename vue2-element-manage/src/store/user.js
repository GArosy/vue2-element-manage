import Cookie from "js-cookie";

export default {
  namespaced: true,
  state: {
      token: "",
  },
  mutations: {
    // 设置token
    // setToken(state, value) {
    //     state.token = value;
    //     Cookie.set('token', value)
    // },
    // // 清除token
    // clearToken(state) {
    //     state.token = '';
    //     Cookie.remove('token')
    // },
    // // 获取token
    // getToken(state) {
    //     state.token = state.token || Cookie.get('token')
    // }

    setToken(state, payload) {
      state.token = payload;
    },
    clearToken(state, payload) {
      state.token="";
      localStorage.clear('token')
    },
  },
};
