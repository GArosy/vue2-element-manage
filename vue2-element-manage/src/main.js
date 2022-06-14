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
import store from './store';
// 引入axios
import axios from 'axios';

Vue.config.productionTip = false;

Vue.use(ElementUI);
// Vue.use(Button);

// axios不是插件，如果想要全局使用axios，需要写入Vue原型中
Vue.prototype.$http = axios;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
