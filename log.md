# vue2-element-manage 搭建日志
## 6-7

- 创建项目

  - 选型

  - 建立github和本地库

    

- 安装 @vue/cli 脚手架

  - 安装yarn

  - 卸载旧版vue-cli，安装 @vue/cli：

    ```
    npm uninstall vue-cli -g
    npm install -g @vue/cli
    ```

  - 创建一个新项目

    ```
    vue create vue2-element-manage
    ```

  - 运行项目

    ```
    cd vue2-element-manage
    yarn serve
    ```

    可在本地 http://localhost:8080/ 查看项目。
    
    

- 引入 element-ui 
  
  - npm/yarn安装element-ui依赖
  
    ```
    npm i element-ui -S
    yarn add element-ui
    ```
  
  - 完整引入：
  
    ```js
    // 写入main.js
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    
    Vue.use(ElementUI);
    ```
  
  - 按需引入：
  
    借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的
  
    ```js
    // 安装babel-plugin-component
    yarn add babel-plugin-component -D
    ```
  
    ```js
    // 配置babel.config.js
    {
      "presets": [["es2015", { "modules": false }]],
      "plugins": [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    }
    ```
  
    ```js
    // 改写main.js
    import { Button } from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    
    Vue.use(Button);
    ```
  
  - 打包之后对比大小：
  
    ```
    // 终端内
    // ctrl+C 终止项目
    yarn run build
    ```
  
    全局安装8M，局部安装1.6M
  
  ## 6-9
  
- 使用单文件组件

  - 单文件组件必须在vue-cli下运行

  - /components下新建组件`ElementUITest.vue`（命名必须为大驼峰，且包含多个单词）

  - 在`App.vue`中引入、使用组件

    

- 前端路由：

  - 概念：前端不同页面的状态管理器，可以不向后台发送请求而直接通过前端技术实现多个页面的效果。SPA（单页应用，可以实现更流畅的交互体验，缺点是SEO差）衍生出的需求，伴随MVVM出现。其本质是检测url变化，截获url地址后匹配路由规则，实现无需刷新即可跳转页面。在SPA项目中，不同功能之间的切换要通过前端路由解决。
- 工作方式：
    - 用户点击路由链接
    - url地址栏Hash值变化
    - 前端路由监听到Hash地址变化
    - 前端路由将当前Hash地址对应的组件渲染到浏览器中
  - 实现模式：
    - hash 路由：监听 url 中 hash 的变化（#后），然后渲染不同的内容，这种路由不向服务器发送请求，不需要服务端的支持；
    - history 路由：监听 url 中的路径变化，需要客户端和服务端共同的支持；
  
  ## 6-10

- 引入vue-router

  - ```
    yarn add vue-router@3.2.0
    ```

  - 建立src/router文件夹，新建index.js

    ```js
    import Vue from 'vue'
    import Router from 'vue-router'
    
    Vue.use(Router);
    
    // 1.定义要路由的组件
    // 通常导入单文件组件
    import Home from '../pages/Home.vue';
    
    // 2.定义一些路由
    // 将以上组件映射到路由
    const routes = [
        { path: '/', name: 'Home', component: Home}
    ]
    // 3.创建路由实例并传递routes配置
    const router = new VueRouter({
        mode: 'history',
        routes // `routes: routes` 的缩写
    })
    // 4. 导出
    export default {
        router
    }
    ```

  - 在main.js中配置router

    ```js
    import router from './router';
    
    new Vue({
      render: h => h(App),
      router
    }).$mount('#app')
    ```

  - 在App.vue中使用router

    ```html
    <template>
      <div id="app">
        <!-- ... -->
        <router-view></router-view>
        <!-- ... -->
      </div>
    </template>
    ```

    刷新页面，至此在默认url下路由组件已经可以显示

  - 使用router-link标签创建路由链接

    ```html
    <router-link to="/">
      <el-button type="success" plain>Home页面</el-button>
    </router-link>
    
    <router-link to="/Login">
      <el-button type="success" plain>Login页面</el-button>
    </router-link>
    ```

    点击不同的路由链接可以在不重新加载页面的情况下更改 URL；

    

- 首页UI搭建

  - 分区：顶部 header、内容 main、侧边栏 aside

  - 使用elementUI Container容器

    