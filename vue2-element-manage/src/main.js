import Vue from 'vue'
import App from './App.vue'
import './style/index.scss';

// 全局引入element-ui
import ElementUI from 'element-ui';

// 按需引入element-ui
// import { Button } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// 引入vue-router
import router from './router';
// 引入vuex
import store from './store/index';
// 引入axios
import axios from 'axios';
// 引入mockjs
import '@/api/mock.js';

Vue.config.productionTip = false;

Vue.use(ElementUI);
// Vue.use(Button);

// axios不是插件，如果想要全局使用axios，需要写入Vue原型中
Vue.prototype.$http = axios;

// 创建全局路由守卫，监听页面
router.beforeEach((to, from, next) => {
  // 获取已保存的cookie，页面刷新后可以保留登录状态
  store.commit('getToken');
  const token = store.state.User.token;
  // 如果token不存在，且当前页不为登录页，则导航至登录页
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
