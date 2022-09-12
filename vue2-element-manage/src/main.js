import Vue from "vue";
import App from "./App.vue";
import "./style/index.scss";

// 全局引入element-ui
import ElementUI from "element-ui";

// 按需引入element-ui
// import { Button } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// 引入vue-router
import router from "./router";
// 引入vuex
import store from "./store/index";
// 引入axios
import axios from "axios";
// 引入mockjs路由
import "@/api/mockServer/mock";
// 引入api
import api from "./api/index";

// 用户信息持久化
let user = localStorage.getItem('user')
if (user) {
  store.commit('User/setUserInfo', JSON.parse(user))
}

Vue.config.productionTip = false;

Vue.use(ElementUI);

// axios不是插件，如果想要全局使用axios，需要写入Vue原型中
Vue.prototype.$http = axios;
// 全局使用api
Vue.prototype.$api = api;

Vue.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  created() {
    store.commit("addMenu", router);
  },
}).$mount("#app");
