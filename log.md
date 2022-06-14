# vue2-element-manage 搭建日志
## 6-7

### 创建项目

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

    

### 配置前端路由

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

    


### 首页UI搭建

- 分区：顶部 header、内容 main、侧边栏 aside

- 使用elementUI Container容器

  ```html
  // Home.vue
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
  ```
```
  

## 6-12

- 引入Sass

  - 安装Sass

    >  [vue项目集成sass/scss_清虚桂意的博客-CSDN博客_vue3 安装scss](https://blog.csdn.net/weixin_45031595/article/details/99694829?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-3-99694829-blog-90475828.pc_relevant_paycolumn_v3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-3-99694829-blog-90475828.pc_relevant_paycolumn_v3&utm_relevant_index=5) 

```
    // 手动安装
    npm i node-sass sass-loader -D
    
    // Home.vue
    // 使用SCSS
    <style lang="scss" scoped>
    	$color = red;
    </style>
    ```
    
    ==scoped==：在vue中，App.vue相当于根容器，不设置scoped。所以一般在App.vue中引用公共样式。而在其它.vue页面中用scoped，代表当前样式只作用于当前.vue页面。不作用于其它.vue页面。

  - 自定义样式

    ```
    // Home.vue
    ...
    	<!-- width 是 elementUI 自带的 Attribute -->
        <el-aside width="auto">
          <common-aside></common-aside>
        </el-aside>
    ...
    <style lang="scss" scoped>
        .el-container {
        	height: 100%;
        }
        .el-header {
        	background-color: #333;
        }
        .el-main {
        	padding-top: 0;
        }
    </style>
    ```

    在App.vue中删除多余组件，至此首页ui搭建框架完成

- 侧边栏实现

  - 在 components 文件夹新建 CommonAside 组件，使用 elementUI 的 navmenu 模板代码

    - 在data中添加menu数组，存放数据

    - 添加computed计算属性，分情况渲染有无二级菜单的项目

      ```
      computed: {
          noChildren() {
            return this.menu.filter((item) => !item.children);
          },
          hasChildren() {
            return this.menu.filter((item) => item.children);
          }
        }
      ```

    - 遍历渲染菜单列表

      ```vue
      <!-- 一级菜单 -->
      <el-menu-item v-for="item in noChildren" :key="item.path" :index="item.path">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <!-- 二级菜单 -->
      <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.path">
          <template slot="title">
              <i :class="`el-icon-${item.icon}`"></i>
              <span slot="title">{{ item.label }}</span>
          </template>
          <el-menu-item-group>
              <el-menu-item v-for="subItem in item.children" :key="subItem.path">
                  <i :class="`el-icon-${subItem.icon}`"></i>
                  <span slot="title">{{ subItem.label }}</span>
              </el-menu-item>
          </el-menu-item-group>
      </el-submenu>
      ```

      ==注意：在elementUI的 el-submenu 中，`:index`字段要求为字符串格式，需要在其后添加`+''` 转化为字符串==

    - 修改样式

      ```vue
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose"
              :collapse="isCollapse">
          ...
      
      <style lang="scss" scoped>
      .el-menu-vertical-demo:not(.el-menu--collapse) {
          width: 200px;
          min-height: 400px;
      }
      
      .el-menu {
          height: 100%;
          border: none;
      
          h3 {
              color: #fff;
              text-align: center;
              line-height: 48px;
          }
      }
      </style>
      ```

  - 在 Home.vue 引入 CommonAside 

    ```
    import CommonAside from '../components/CommonAside.vue';
    export default {
      name: "Home",
      components: {
        CommonAside
      },
      data() {
        return {};
      },
    };
    ```

    ```
    <template>
    ...
        <el-aside width="200px">
          <common-aside></common-aside>
        </el-aside>
    ...
    </template>
    ```

  - 为侧边栏绑定点击跳转事件

    - 为 el-menu-item 标签触发click绑定clickMenu方法

      ```
      methods: {
      	...
          clickMenu(item) {
              this.$router.push({
                  name: item.name
              }).catch(e => { })
          }
      }
      ```

      > `$router.push()` 不同于传统的push方法，它会向 VueRouter `history` 栈添加一个新记录，所以，当用户点击浏览器后退按钮时，可以返回到之前的 `URL`。 也可以说，点击` <router-link :to="..."> ` 等同于调用 `router.push(...)`。  该方法的参数可以是一个字符串路径，或者一个描述地址的对象。 

      这里的`this.$router.push()`可以依据name匹配路由实现页面跳转。

      此外，重复点击相同路由会导致报错，`.catch(e => { })`可捕获异常并阻止报错。

    - 修改路由配置

      ==这里需要使用组件嵌套，防止命名混淆，将Home.vue重命名为Main.vue，Home.vue为新空白组件==

      ```js
      const routes = [
          // 定义根目录下的路由，component为按需引入的组件页面home
          {
              path: '/',
              name: 'Main',
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
      ```

    - 在Main.vue中添加 router-view 标签，在main区域显示匹配的路由组件

      ```
      <el-main>
          <router-view></router-view>
      </el-main>
      ```

      侧边栏实现完成



## 6-13

### 使用vuex

- header实现
  
  - 在conponents文件夹新建CommonHeader.vue，在Main.vue中引入 
  
  - 引入elementUI的下拉菜单组件Dropdown
  
  - 使用scss编写header样式
  
  - 实现aside展开收起功能——使用Vuex进行组件通信
  
    - 安装vuex：`yarn add vuex@3` （==默认安装的高版本 Vuex 4.x 和Vue2不兼容，需要指定安装 3.x 版本==）
  
    - 在src下新建store文件夹，新建index.js
  
      ```
      import Vue from 'vue';
      import Vuex from 'vuex';
      import Tab from './tab';
      
      Vue.use(Vuex);
      
      export default new Vuex.Store({
          modules: {
      
          }
      })
      ```
  
    - 在main.js引入vuex
  
      ```js
      import store from './store';
      new Vue({
        render: h => h(App),
        router,
        store
      }).$mount('#app')
      ```
  
    - 在store下新建tab.js
  
      ```js
      export default {
          state: {
              isCollapse: false
          },
          // 定义方法
          mutations: {
              collapseMenu (state) {
                  state.isCollapse = !state.isCollapse;
              }
          }
      }
      ```
  
    - 在CommonAside中的computed属性中添加状态管理器，并删除原默认isCollapse数据：
  
      ```vue
      computed: {
              ...
              isCollapse() {
                  return this.$store.state.Tab.isCollapse
              }
          }
      ```
  
    - 在CommonHeader中添加点击事件
  
      ```
      methods: {
              handleMenu() {
                  this.$store.commit('collapseMenu')
              }
          },
      ```
  
      展开收起功能实现，但收起之后标头文字会被拉长，需要在收起之后改变标头文字
  
    - aside收起改变标头文字
  
      ```
      // CommonAside.vue
      ...
      <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3>
      ...
      ```
  
      

## 6-14

### home组件布局

- 使用elementUI的 Layout 布局实现自适应栅格布局

  Layout 布局使用基础的 24 分栏，通过 row 和 col 组件，并通过 col 组件的 `span` 属性可以自由地组合布局。  Row 组件 提供 `gutter` 属性来指定每一栏之间的间隔，默认间隔为 0。 

  - 编写home组件页面布局

    -  使用elementUI card组件
  
        ```
        <template>
        <div>
            <el-row class="home" :gutter="20">
                <el-row style="margin-top: 20px;" :span="8">
                    <!-- 使用card组件 -->
                    <el-card shadow="hover">
                        <div class="user">
                            <img :src="userImg" alt="用户头像">
                            <div class="user-info">
                                <p class="name">Admin</p>
                                <p class="access">超级管理员</p>
                            </div>
                        </div>
                        <div class="login-info">
                            <p>上次登陆时间：<span>2022-6-14</span></p>
                            <p>上次登陆地点：<span>上海</span></p>
                        </div>
                    </el-card>
                </el-row>
            </el-row>
            <el-row class="home" :gutter="20">
                <el-col style="margin-top: 20px; background-color: #000;" :span="8"></el-col>
            </el-row>
        </div>
      </template>
      ```
  
    - 使用elementUI table组件实现图表
  
      ```html
    <el-table :data="tableData">
          <el-table-column 
        v-for="(value, name) in tableLabel" 
          :key="name" 
        :prop="name" 
          :label="value">
          </el-table-column>
      </el-table>
      ```
      
      当`el-table`元素中注入`data`对象数组后，在`el-table-column`中用`prop`属性来对应图表数据中的键名即可填入数据，用`label`属性来定义表格的列名。可以使用`width`属性来定义列宽。 
      
      这里使用了v-for遍历对象生成colomn，要注意v-for遍历数组与列表的区别。
      
    -  遍历el-card组件和grid布局实现订单组件
    
        ```html
        <div class="count">
            <el-card shadow="hover" v-for="item in countData" :key="item.name" style="padding: 0;">
                <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                <div class="detail">
                    <p class="num">￥{{item.value}}</p>
                    <p class="text">{{item.name}}</p>
                </div>
            </el-card>
        </div>
        
        // home.scss
        .count {
            display: grid;
            grid-template-columns: repeat(3, minmax(15rem, 1fr));
            grid-template-rows: repeat(2, auto);
            grid-row-gap: 1em;
            grid-gap: 1rem;
            ...
        }
        ```
    
    -  最后三个图表
    
        ```html
        <!-- card组件-图表 -->
        <el-card shadow="hover" class="graph-line"></el-card>
        <div class="graph">
            <el-card shadow="hover" class="graph-col" :span="8"></el-card>
            <el-card shadow="hover" class="graph-pie" :span="8"></el-card>
        </div>
        ```

### 使用axios异步库

- 下载

  ```
  yarn add axios
  ```

- 在main.js中配置

  ```js
  // 引入axios
  import axios from 'axios';
  
  // axios不是插件，如果想要全局使用axios，需要写入Vue原型中
  Vue.prototype.$http = axios;
  ```

- 在Home.vue中添加接口请求

  ```js
  // 接口请求一般写在mounted下
  mounted() {
      this.$http.get('/user?ID=12345')
          .then(function (response) {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          });
  },
  ```

  打开F12的Network可以看到名为user?ID=12345的GET请求，说明axios引入成功。

- axios二次封装

  将配置文件添加到axios请求中，通过对当前项目的配置环境做判断，来改变一个接口请求的地址，并对所有的接口进行监听，在请求前后拦截。

  - 新建@/api文件夹，新建axios.js
  - 配置文件：新建@/config文件夹，新建index.js

  - 创建axios实例

    ```
    
    ```

    

  