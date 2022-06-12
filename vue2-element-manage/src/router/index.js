// 全局引入router
import Vue from 'vue';
import VueRouter from 'vue-router';
// 导入要路由的组件
import Main from '../pages/Main.vue';
import Home from '../pages/Home.vue';
import User from '../pages/User.vue';
import Mall from '../pages/Mall.vue';

Vue.use(VueRouter);


// 定义一些路由，将以上组件映射到路由
const routes = [
    // 定义根目录下的路由，component为按需引入的组件页面home
    {
        path: '/',
        name: 'main',
        component: Main,
        // 路由嵌套
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home
            },
            {
                path: '/user',
                name: 'user',
                component: User
            }, 
            {
                path: '/mall',
                name: 'mall',
                component: Mall
            }
        ]
    },

]

// 创建路由实例并传递 `routes` 配置
const router = new VueRouter({
    mode: 'history',
    routes // `routes: routes` 的缩写
})

// 导出
export default router