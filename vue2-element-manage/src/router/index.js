// 全局引入router
import Vue from 'vue';
import VueRouter from 'vue-router';
// 导入要路由的组件
import Main from '../pages/Main.vue';
import Home from '../pages/Home.vue';
import User from '../pages/User.vue';
import Mall from '../pages/Mall.vue';
import Other1 from '../pages/OtherPage1.vue';
import Other2 from '../pages/OtherPage2.vue';

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
                label: '首页', 
                component: Home
            },
            {
                path: '/user',
                name: 'user',
                label: '用户管理',
                component: User
            }, 
            {
                path: '/mall',
                name: 'mall',
                label: '商品管理',
                component: Mall
            },
            {
                path: '/page1',
                name: 'page1',
                label: '其它1',
                component: Other1
            },
            {
                path: '/page2',
                name: 'page2',
                label: '其它2',
                component: Other2
            },
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