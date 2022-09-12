import Cookie from "js-cookie";

export default {
  namespaced: true,
  state: {
    userinfo: {
      username: "",
      token: "",
    },
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

    setUserInfo(state, payload) {
      state.userinfo = payload;
    },
    clearUserInfo(state, payload) {
      state.userinfo = {
        username: "",
        token: "",
      };
    },
  },
};
