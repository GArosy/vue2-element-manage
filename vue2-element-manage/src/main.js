import Vue from 'vue'
import App from './App.vue'

// 全局引入element-ui
import ElementUI from 'element-ui';

// 按需引入element-ui
// import { Button } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// 引入vue-router
import router from './router';

Vue.config.productionTip = false;

Vue.use(ElementUI);
// Vue.use(Button);


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
