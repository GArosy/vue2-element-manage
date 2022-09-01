# vue2-element-manage 搭建日志
## 6-7

### 创建项目

- 建立github和本地库


- 安装 @vue/cli 脚手架


  - 从镜像安装cnpm

    ```
    npm install -g cnpm --registry=https://registry.npm.taobao.org
    ```
    
  - 安装yarn

    ```
    npm install yarn -g
    // 更换源
    yarn config set registry https://registry.npm.taobao.org/ 
    ```

    

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
    yarn run serve
    ```

    可在本地 http://localhost:8080/ 查看项目。

- ==注意== ：GitHub上传的项目会自动忽略node_module文件夹（在.gitignore中配置），切换运行环境时需要先根据package.json安装依赖

  ```
  npm install
  // 或
  yarn
  ```

  

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

  对于项目而言，每次都需要对异常进行捕获或者处理的话，代码会很繁重冗余。我们需要将其公共部分封装起来，比如异常处理，请求拦截等。

  将配置文件添加到axios请求中，通过对当前项目的配置环境做判断，来改变一个接口请求的地址，并对所有的接口进行监听，在请求前后拦截。
  

这里使用ES6中的Class特性来抽象出一个`HttpRequest`类，存放属性和方法。



  - 封装axios：新建@/api文件夹，新建axios.js。

  ```js
    import axios from 'axios';
  import config from '@/config/index.js';
    // 根据当前环境获取API根目录
    const baseURL = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.prod;
    
    
  ```

  - 配置文件：新建@/config文件夹，新建index.js。存放项目运行时所需要的配置 
  
    ```js
    export default {
    /**
     * - baseURL会拼接在每个axios请求之前，可触发devServer代理实现开发环境的跨域
     * - baseURL不能为绝对路径，会导致devServer.proxy失效
     * - 如果项目部署路径不在根目录下
     *      baseURL必须带 / 前缀
     *      例如项目部署在 https://example.com/licenses/ ，发送 axios.get('/licenses') 请求
     *      baseURL = '/api' => https://example.com/api/licenses
     *      baseURL = 'api' => https://example.com/licenses/api/licenses
      */
      baseURL: {
          // 开发环境
          dev: '/api/',
          // 生产环境
          prod: ''
      }
    }
    ```
  ```

  ```

  - 定义HttpRequest class，添加属性和方法
  
    ```js
    class HttpRequest {
        // 属性
        constructor(baseURL = '') {
            this.baseURL = baseURL;
        }
    
        // 方法
        // 设置默认配置
        getInsideConfig() {
            const config = {
                baseURL: this.baseURL,
                header: {}
            }
            return config;
        }
    
        // 拦截器
        interceptors(instance) {
            // 添加请求拦截器
            instance.interceptors.request.use(function (config) {
                // 在发送请求之前做些什么
                return config;
            }, function (error) {
                // 对请求错误做些什么
                return Promise.reject(error);
            });
    
            // 添加响应拦截器
            instance.interceptors.response.use(function (response) {
                // 对响应数据做点什么
                return response;
            }, function (error) {
                // 对响应错误做点什么
                return Promise.reject(error);
            });
        }
        // 请求
        request() {
            const instance = axios.create();
            options = { ...this.getInsideConfig(), ...options };
            this.interceptors(instance);
            return instance(options);
        }
    }
    
    // 暴露类的实例
    export default new HttpRequest(baseUrl)
    ```
  ```

  - /api新建一个接口文件data.js
  
    ```js
    import axios from './axios';
    export const getMenu = param => {
        return axios.request({
            url: '/permission/getMenu',
            method: 'POST',
            data: param
        })
    }
  ```

  - 在Home.vue中添加接口
  
    ```js
    mounted() {
        getMenu().then(res=> console.log(res))
    }
    ```
  
    刷新页面，可见post请求已发出
  
  - 使用响应拦截器
  
    ```
    // 添加响应拦截器
    ...
        instance.interceptors.response.use(function (response) {
            console.log(response, 'response');
            // 对响应数据做点什么
            return response;
        }, function (error) {
            console.log(error);
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    ...
    ```
  
    刷新页面，可见打印一个AxiosError {message: 'Request failed with status code 404'...}消息，说明拦截器部署成功！

## 6-15

### 使用mock模拟请求

 mock是一个模拟数据生成器，旨在帮助前端独立于后端进行开发，帮助编写单元测试。其可模拟 Ajax 并返回模拟数据，使前端不用去调用后端的接口，方便测试。 

- 安装引入

  ```
  yarn add mockjs
  
  // @/api下新建mock.js
  import Mock from "mockjs";
  
  // @/api下新建后台数据api文件 mockServerData/home.js
  import Mock from 'mockjs';
  
  // 将mock.js引入main.js
  import '@/api/mock.js';
  ```

- 后台Mock生成并返回数据

  ```
  // home.js
  let list = [];
  export default {
      getStaticalData: () => {
          const data = Mock.mock(Mock.Random.float(100, 8000, 0, 0));
          return {
          	code: 20000;
          	data
          }
      }
  ```

- 前台Mock拦截url并执行getStaticalData

  ```
  import homeApi from './mockServerData/home';
  
  // Mock.mock(url,function()) 当拦截到url时，function将被执行，并返回函数执行结果
  // url可以是正则表达式
  // Mock.mock(/getData/, homeApi.getStaticalData);
  
  Mock.mock('/api/home/getData', homeApi.getStaticalData);
  ```

- 在data.js中添加axios请求，访问指定url

  ```
  export const getData = () => {
      return axios.request({
          url: '/home/getData'
      })
  }
  ```

- 在Home.vue组件中添加getData接口，将从mock传来的数据传入tableData

  ```
  mounted() {
      getData().then(res => {
          const { code, data } = res.data;
          if (code === 20000) {
              this.tableData = data.tableData;
          }
          console.log(res);
      })
  }
  ```

  

### 阶段小总结

**表格中的数据从何而来？**

项目启动，网页加载，main.js执行-->

App.vue加载-->

路由匹配到Main.vue组件-->

Main.vue显示aside和header，此时点击home，url改变-->

路由匹配到Home.vue组件-->

Home.vue 执行它的 mounted() 接口，其中包含 `getData()`-->

异步执行`getData`，线程转至axios发送访问`/home/getData`的请求-->

main.js引入了mock.js，mock拦截到`Mock.mock(url, func)`匹配的url，执行func-->

func是`api/mockServerData/home.js`中的`getStaticalData`函数，它返回一组data到`getData`-->

线程回到 `getData` ，校验状态码并向Home.vue的tableData传入数据-->

表格组件遍历渲染数据...



## 6-16

### 使用echarts

一个基于 JavaScript 的开源可视化图表库 

- 安装引入

  ```
  yarn add echarts
  
  // Home.vue
  import * as echarts from 'echarts';
  ```

- 处理接口数据，拼凑要echarts配置项，绘图

  ```js
  // 折线图
  this.tableData = data.tableData;
  const order = data.orderData;
  // 取出data的keys
  const keyArray = Object.keys(order.data[0]);
  // 构建图表所需的series
  const series = [];
  keyArray.forEach((key) => {
      series.push({
          name: key,
          data: order.data.map(item => item[key]),
          type: 'line'
      })
  })
  const lineOption = {
      xAxis: {
          data: order.date
      },
      yAxis: {},
      // 图例
      legend: {
          data: keyArray
      },
      series,
      // 配置提示框组件，实现悬停弹窗
      tooltip: {
          show: true,          // 是否显示提示框组件
          trigger: 'axis',    // 触发类型:item/axis/none
          axisPointer: {      // 配置坐标轴指示器
              type: 'line'
          }
      }
  }
  // 基于准备好的dom，初始化echarts实例(使用svg渲染)
  lineEcharts = echarts.init(this.$refs.line, null, { renderer: 'svg' });
  // 绘制图表
  lineEcharts.setOption(lineOption);
  ```

  ==注意==：其中的dom操作需要在网页dom渲染完成之后才有效，否则接收不到数据。通常情况下echarts从后端获取数据需要异步执行。此项目已经使用了axios异步处理后台数据，无需再做处理。

- 柱状图、饼状图同理

## 6-17

### echarts组件化

页面内有多个echarts时，如果直接在组件内使用echarts会产生许多重复代码，不利于维护，应将echarts打包到一个独立组件内

- 新建@/components/ECharts.vue

  ```js
  <template>
      <div ref="echarts"></div>
  </template>
  <script>
  import * as ECharts from 'echarts';
  export default {
  	// 自定义attribute
      props: {
          // 判断图表类型的属性
          // 图表数据（父传子）
      },
      data() {
          return {
              // 各个图表的option配置
              // echarts实例
          }
      },
      // 监听器，判断父组件是否有数据传入子组件
      watch() {
          
      },
      // 方法
      methods: {
          // 实例化ecahrts
          // 判断图表类型，将父组件的数据传入option。饼图对应series，折线图柱状图对应xData和series
      },
      // 计算属性
      computed: {
          // 判断要使用的options类型
      }
  }
  </script>
  ```

- 在Home.vue中使用组件

  ```js
  <el-card shadow="hover" class="graph-line">
      <echarts-template :chartData=""></echarts-template>
  </el-card>
  ```

  这里通过子组件的props实现组件间的数据传递，chartData数据即是要传入子组件的图表数据。

  ```js
  <script>
  import EchartsTemplate from '@/components/EchartsTemplate.vue';
  // 改写数据处理方法
  export default {
      name: 'home',
      data() {
          return {
              ...
              // 图表数据
              echartsData: {
                  lineData: {
                      xData: [],
                      series: []
                  },
                  colData: {
                      xData: [],
                      series: []
                  },
                  pieData: {
                      series: []
                  }
              }
          }       
      },
      components: {
          EchartsTemplate
      },
      mounted() {
          getData().then(res => {
              const { code, data } = res.data;
              if (code === 20000) {
                  const order = data.orderData;
                  const keyArray = Object.keys(order.data[0]);
                  const orderSeries = [];
                  const orderXData = order.date;
                  keyArray.forEach((key) => {
                      orderSeries.push({
                          name: key,
                          data: order.data.map(item => item[key]),
                          type: 'line'
                      })
                  })
                  // 为折线图传入数据
                  this.echartsData.lineData.xData = orderXData;
                  this.echartsData.lineData.series = orderSeries;
                  // 为柱状图传入数据
                  this.echartsData.colData.xData = data.userData.map(
                      item => item.data
                  );
                  this.echartsData.colData.series = [
                      {
                          name: '新增用户',
                          data: data.userData.map(item => item.new),
                          type: 'bar'
                      },
                      {
                          name: '活跃用户',
                          data: data.userData.map(item => item.active),
                          type: 'bar'
                      }
                  ];
                  // 为饼图传入数据
                  this.echartsData.pieData.series = [
                      {
                          name: '市场占比',
                          data: data.videoData,
                          type: 'pie',
                          top: '-10px',
                          radius: ['30%', '60%'],
                          label: {
                              show: false,
                              position: 'center'
                          },
                          emphasis: {
                              label: {
                                  show: true,
                                  fontSize: '16px'
                              }
                          }
                      }
                  ];
              }
  }
  </script>
  ```
  
  最后要注意将图表随页面大小变化的事件处理函数添加至EchartsTemplate组件中。



## 6-19

### 面包屑

点击其他页面时，header 的 `首页` 后跟随添加一个页面链接。可实现历史记录

- 创建所需页面，绑定点击跳转事件，修改路由

- 在vuex中声明数据源和方法：

  ```js
  // tab.js
  state: {
    tabsList: [
          {
              path: '/',
              name: 'home',
              label: '首页',
              icon: 'home'
          }
      ],
      currentMenu: null
  },
  mutation: {
      selectMenu (state, val) {
          if (val.name !== 'home') {
              state.currentMenu = val;
              // 查找tabsList中是否已存在传入的name
              const result = state.tabsList.findIndex(
                  item => item.name === val.name
              );
              if (result === -1) {
                  // 如果不存在val.name，则添加
                  state.tabsList.push(val);
              }
          } else {
              state.currentMenu = null;
          }
      }
  }
  ```
  
  
  


## 6-26

更换设备，重新搭建环境

- 安装node，下载依赖，遇到了一些包安装不成功的问题

  ```
  // 删除原有的所有依赖包
  cnpm install -g rimraf
  rimraf node_modules
  // 重新下载
  cnpm install
  yarn install
  ```

  结果报错 gyp ERR! build error，windows平台缺少编译环境

  ```
  // 安装node-gyp
  cnpm install -g node-gyp
  // 安装跨平台的编译器
  cnpm install --global --production windows-build-tools
  ```

  报错的原因是node.js的版本和node-sass版本不符，需要把node-sass版本号改为node对应的版本号

  | NodeJS  | Supported node-sass version | Node Module |
  | ------- | --------------------------- | ----------- |
  | Node 17 | 7.0+                        | 102         |
  | Node 16 | 6.0+                        | 93          |
  | Node 15 | 5.0+, <7.0                  | 88          |
  | Node 14 | 4.14+                       | 83          |
  | Node 13 | 4.13+, <5.0                 | 79          |
  | Node 12 | 4.12+                       | 72          |
  | Node 11 | 4.10+, <5.0                 | 67          |
  | Node 10 | 4.9+, <6.0                  | 64          |
  | Node 8  | 4.5.3+, <5.0                | 57          |
  | Node <8 | <5.0                        | <57         |

  ```
  // 请勿手动更改package.json和yarn.lock
  npm update node-sass@^6.0.1
  yarn upgrade node-sass@^6.0.1
  ```

- 更改脚本策略

  ```
  // 用管理员权限运行Windows Power Shell
  set-ExecutionPolicy RemoteSigned
  // 输入Y
  ```

- 要注意组件文件名称（大驼峰）与使用组件时的标签名对应，如`EchartsTemplate.vue` 对应 `<echarts-template>`

继续面包屑的实现

- 绑定侧边栏点击事件

  在点击事件中调用 Store 的实例方法 `commit` 提交 `mutation` 和它的载荷 `payload`

  ```
  clickMenu(item) {
  	...
      this.$store.commit('selectMenu', item)
  }
  
  ```

## 6-27

- 引入 el-breadcrumb 组件

- 当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。所以为获取state `tabsList`，需要在计算属性中引入vuex组件绑定的辅助函数 `mapState()` 帮助我们生成计算属性

  ```js
  // 在单独构建的版本中辅助函数为 Vuex.mapState
  import { mapState } from 'vuex'
  
  // ...
  computed: {
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState({
        // 获取tabsList数组,注意正确使用store中模块的名称
        tags: state => state.Tab.tabsList
      }),
    },
  ```

- 在模板中遍历渲染 tabsList 并设置路由，实现点击侧边栏时tabsList改变，实现响应式地渲染面包屑标签

  ```html
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in tags"
        :key="item.path"
        :to="{ path: item.path }"
        >{{ item.label }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  ```

  至此面包屑功能实现，但页面逻辑有一定问题，将在后续解决。

## 6-28

### 用户管理页面

- 引入elementui的`Form`组件

  `Form`组件由表单项 `form-item` 组成，封装表单也应由传入配置好的 `form-item` 开始。
  
- 编写`Form`组件

  新建组件 `CommonForm.vue`

  ```vue
  <template>
    <el-form ref="form" label-width="100px" :model="form" :inline="inline">
      <el-form-item
        v-for="item in formLabel"
        :key="item.label"
        :label="item.label"
      >
        <el-input
          v-if="item.type === 'input'"
          :placeholder="`请输入${item.label}`"
          v-model="form[item.model]"
        >
        </el-input>
        <el-switch v-if="item.type === 'switch'" v-model="form[item.model]">
        </el-switch>
        <el-date-picker
          v-if="item.type === 'date'"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          v-model="form[item.model]"
        ></el-date-picker>
        <el-select
          v-if="item.type === 'select'"
          placeholder="请选择"
          v-model="form[item.model]"
        >
          <el-option
            v-for="optItem in item.opts"
            :key="optItem.value"
            :label="optItem.label"
            :value="optItem.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 如果以上组件都不满足，使用自定义插槽 -->
      <el-form-item>
          <slot></slot>
      </el-form-item>
    </el-form>
  </template>
  
  <script>
  export default {
    name: "CommonForm",
    props: {
      formLabel: Array,
      form: Object,
      inline: Boolean,
    },
    data() {},
  };
  </script>
  ```

  

## 6-29

- 在用户管理页面使用`Form`组件

  ```vue
  <template>
    <div class="manage">
      <!-- 对话框组件 -->
      <el-dialog
        :title="operateType === 'add' ? '新增用户' : '更新用户'"
        :visible.sync="isShow"
      >
        <common-form
          :formLabel="operateFormLabel"
          :form="operateForm"
          :inline="true"
          ref="form"
        ></common-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShow">取消</el-button>
          <el-button @click="confirm" type="primary">确定</el-button>
        </div>
      </el-dialog>
        
      <!-- el-table组件 -->
      <div class="manage-header">
        <el-button type="primary" @click="addUser">+ 新增</el-button>
        <common-form
          :formLabel="formLabel"
          :form="searchForm"
          :inline="true"
          ref="searchForm"
        >
          <el-button type="primary" @click="getList">搜索</el-button>
        </common-form>
      </div>
    </div>
  </template>
  ```
  
  > `:visible.sync`：`visible` 是el-dialog标签控制显示/隐藏的property，.sync是vue的修饰符，用于对 prop `visible` 进行“双向绑定”（`.sync` 修饰符的 `v-bind` 不能和**表达式**一起使用）
  
  对话框部分
  
  1. 添加el-dialog组件用于存放common-form。其中el-dialog的title显示内容由operateType决定，并绑定isShow方法用于控制对话框弹出。
  2. 父传子：为common-form的props传入数据。
  3. 添加插槽，存放确定和取消按钮。
  
  图表部分
  
  1. 添加新增按钮
  2. 复用common-form组件，并在插槽中添加搜索按钮

## 6-30

- 为form组件编写接口

  1. 新建mockServerData/user.js，编写mock生成后台数据的方法

  2. 在mock.js中引入user.js，拦截url并指定运行user.js中的对应方法（P39）

  3. 为新增按钮绑定addUser方法，显示dialog

     ```js
     addUser() {
       this.isShow = true;
       this.operateType = "add";
       this.operateForm = {
         name: "",
         addr: "",
         age: "",
         birth: "",
         sex: "",
       };
     },
     ```

  4. 为确定按钮绑定confirm方法，向后台接口发送请求获得数据

     ```js
     confirm() {
       if (this.operateType === "edit") {
         this.$http.post("/user/edit", this.operateForm).then((res) => {
           console.log(res);
           this.isShow = false;
         });
       } else {
         this.$http.post("/user/add", this.operateForm).then((res) => {
           console.log(res);
           this.isShow = false;
         });
       }
     },
     ```

  DEBUG

  ==注意==：element-ui 2.15.9 版本在vue中会遇到针对 el-date-picker 的警告问题：

  > Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "placement"

  问题出在了element-ui的 PR [#21806](https://github.com/ElemeFE/element/pull/21806) 增加了 props placement 用来适应位置，但是之前的代码 created 时有给 placement 赋值,导致报错。可修改element-ui版本到 2.15.8解决：
  
  ```
yarn upgrade element-ui@2.15.8
  ```
  
  至此，点击新增按钮后填写表单并提交可在控制台看到打印的数据，表明接口已在正常运作。

## 7-1

- table组件编写

  - 新建CommonTable.vue

    ```vue
    <template>
      <div class="common-table">
        <el-table :data="tableData" height="90%" stripe>
          <el-table-column
            v-for="item in tableLabel"
            :key="item.prop"
            :lable="item.label"
            :width="item.width ? item.width : 125"
            show-overflow-tooltip
          >
            <!-- 作用域插槽 -->
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
          <!-- 操作列 -->
          <el-table-column label="操作" min-width="180">
            <el-button size="mini" @click="handleEdit">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete"
              >删除</el-button
            >
          </el-table-column>
          <!-- 分页组件 -->
          <!-- 
            通过 layout attribute 配置组件内容 
            通过 @current-change 事件和 :current-page.sync 属性来处理当前页变动
            :page-size 每页显示条目个数
          -->
          <el-pagination
            class="pager"
            layout="prev,pager,next"
            :total="config.total"
            :page-size="20"
            :current-page.sync="config.page"
            @current-change="changePage"
          ></el-pagination>
        </el-table>
      </div>
    </template>
    ```

  - 修改样式

    ```scss
    // user.scss
    .common-table {
        height: calc(100% - 62px);
        background-color: #fff;
        position: relative;
        .pager {
          position: absolute;
          bottom: 0;
          right: 20px;
        }
      }
    ```

## 7-2

- Table组件使用

  - 引入组件

    ```js
    // User.vue
    import CommonForm from "@/components/CommonForm.vue";
    import CommonTable from "@/components/CommonTable.vue";
    export default {
      name: "User",
      components: {
        CommonForm,
        CommonTable,
      },
        ...
    ```

  - 在模板中使用组件(添加自定义事件)

    ```vue
    <!-- 表格 -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @delete="deleteUser"
    >
    ```
  
    ==注意==：vue中事件处理函数的绑定是否加**括号**有一定区别：
  
    - **如果没有加括号**, 默认传递参数为 `MouseEvent`；
    - **如果加了括号**,则需要在括号中使用 `$event`, 才能获取到 `MouseEvent`；
  
  - 在data中添加子组件porps对应的数据
  
    ```js
    // Table数据
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    ```
  
  - 单向数据流决定了子组件无法修改父组件数据，因此需要在组件中添加自定义事件，由子组件触发一个在父组件上修改数据的事件：
  
    ```js
    // CommonTable.vue
    methods: {
        handleEdit(row) {
            this.@emit('edit', row)
        },
        handleDelete(row) {
            this.@emit('delete', row)
        },
        changePage(page) {
            this.@emit('changePage', page)
        },
    },
    ```
  
    

## 7-3

- 连接后台接口获取用户列表

  - 在mock.js监听url

    ```js
    Mock.mock(/user\/add/,'post', userApi.createUser);
    Mock.mock(/user\/edit/,'post', userApi.updateUser);
    Mock.mock(/user\/getUser/,'get', userApi.getUserList);
    Mock.mock(/user\/del/,'get', userApi.deleteUser);
    ```
  
  - 在data.js添加请求
  
    ```js
    export const getUser = (params) => {
        return axios.request({
            url: '/user/getUser',
            method: 'GET',
            params
        })
    }
    ```
  
  - 在User.vue页面中调用接口
  
    ```js
    // 添加方法
    methods: {
        // 获取用户列表
        getList(name = '') {
            this.config.loading = true;
            name ? (this.config.page = 1) : '';
            getUser({
                page: this.config.page,
                name
            }).then(res => {
                this.tableData = res.list.map(item => {
                    // 将性别从数字映射为汉字
                    item.sexLabel = item.sex === 0 ? '女' : '男';
                    return item
                })
                this.config.total = res.count
                this.config.loading = false
            })
        },
    },
    // 生命周期函数
    created() {
      // 页面加载时即调用
      this.getList()
    }
    ```
    
  - 不要忘记在提交新表单后更新列表，为`confirm`添加：
  
    ```js
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
        //...
    }
    ```
  
- 同上，从后台调用编辑与删除功能的接口：

  - 编辑

    ```js
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    ```

  - 删除

    ```js
    deleteUser(row) {
      // element-ui中封装的二次确认弹窗
      this.$confirm("此操作不可撤回，确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .get("user/del", {
            params: id,
          })
          .then(() => {
            this.$message({
                type:'success',
                message:'删除成功'
            });
            this.getList()
          });
      });
    },
    ```

    这里使用了element-ui的`MessageBox 弹框`和`Message 消息提示`，使用全局方法`$confirm`弹出确认消息框，`$message`弹出反馈提示。更多用法见 [MessageBox 弹框](https://element.eleme.cn/#/zh-CN/component/message-box) / [Message 消息提示](https://element.eleme.cn/#/zh-CN/component/message)

## 7-4

- 搜索功能

  ```html
  <common-form
      :formLabel="formLabel"
      :form="searchForm"
      :inline="true"
      ref="searchForm"
    >
      <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
    </common-form>
  ```

  将搜索框中的输入数据 `searchForm.keyword` 作为参数传入 `getList` 处理函数，即可实现在列表搜索条目。

## 7-8

- 编辑和删除功能实现

  在子组件ConmmonTable的操作列的模板中添加 `template` 标签，并使用**作用域插槽**获取当前行的数据

  ```html
  <el-table-column label="操作" min-width="180">
    <template v-slot:default="operate">
      <el-button size="mini"@click="handleEdit(operate.row)">
        编辑
      </el-button>
      <el-button
        size="mini"
        type="danger"
        @click="handleDelete(operate.row)">
        删除
      </el-button>
    </template>
  </el-table-column>
  ```

  将 `v-slot:default="operate"` 作为作用域插槽，其中 `operate` 即为 `插槽prop`，可通过它访问table的row, column, $index 和 store（table 内部的状态管理）数据。

## 7-11

### 权限管理-用户登录

- 新建Login页面，并添加至路由

- 编写登陆页面表单

  ```html
  // Login.vue
  <template>
    <!-- 容器 -->
    <div class="container">
    <!-- 表单组件 -->
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="login-container"
    >
        <!-- 标题 -->
        <h3 class="login-title">通用后台管理系统</h3>
        <!-- 输入框 -->
        <el-form-item
          label="用户名"
          label-width="60px"
          prop="userName"
          class="username"
        >
          <el-input
            type="input"
            v-model="form.userName"
            auto-complete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          label-width="60px"
          prop="password"
          class="password"
        >
          <el-input
            type="password"
            v-model="form.password"
            auto-complete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item class="login-submit">
          <el-button
            type="primary"
            @click="login"
            class="login-submit"
            style="margin: auto"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </template>
  ```
  
- 编写校验规则

  ```js
  // 校验规则
  rules: {
      userName: [
        { require: true, message: "请输入用户名", trigger: "blur" },
        {
          min: 6,
          max: 18,
          message: "用户名长度应在4-18位之间",
          trigger: "blur",
        },
      ],
      password: [
        { require: true, message: "请输入密码", trigger: "blur" },
        {
          min: 6,
          max: 18,
          message: "密码长度应在4-10位之间",
          trigger: "blur",
        },
      ],
  }
  ```

	>  elementui的 Form 组件提供了**表单验证**的功能。规则校验的核心为为async-validator插件，Element-UI使用了该插件，并进行了封装。
	>
	>  只需要通过 `rules` 属性传入约定的验证规则，并将 Form-Item 的 `prop` 属性设置为需校验的字段名即可。 
	>
	>  具体校验规则见：[校验规则](https://www.cnblogs.com/kuki/p/15190259.html)。

- 添加登录凭证

  > 使用token登录
  >
  > **token**是服务端生成的一串加密字符串、以作客户端进行请求的一个“令牌” 。 当用户第一次使用账号密码成功进行登录后，服务器便生成一个Token及Token失效时间并将此返回给客户端，若成功登陆，以后客户端只需在有效时间内带上这个Token前来请求数据即可，无需再次带上用户名和密码。 
  >
  > 使用流程：
  >
  > 1. 用户使用用户名和密码请求服务器
  > 2. 服务器进行验证用户信息
  > 3. 服务器通过验证发送给用户一个token
  > 4. 客户端存储token，并在每次请求时附上token
  > 5. 服务端验证token值，并返回数据

  - 在vuex的store中添加user.js文件

    此处需要缓存token，依赖第三方库 `js-cookie` 

    ```
    yarn add js-cookie
    ```

    ```js
    // user.js
    import Cookie from 'js-cookie'
    
    export default {
        state: {
            token: ''
        },
        mutations: {
            // 设置token
            setToken(state, value) {
                state.token = value;
                Cookie.set('token', value)
            },
            // 清除token
            clearToken(state) {
                state.token = '';
                Cookie.remove('token')
            },
            // 获取token
            getToken(state) {
                state.token = Cookie.get('token') || state.token
            }
        }
    }
    ```

    在vuex出口引入`user.js`

    ```js
    // @/store/index.js
    // ...
    import User from './user';
    export default new Vuex.Store({
        modules: {
            //...
            User
        }
    })
    ```

    

  - 使用导航守卫

    > 导航守卫是路由跳转过程中的一些钩子函数。路由跳转的过程分为跳转前中后等等细小的过程，在每一个过程中都有一函数，这些函数为我们提供了操作的时机。
    >
    > 导航守卫分为三类：
    >
    > - 全局路由钩子：所有路由配置的组件都会触发
    >
    >   beforeEach(to,from, next)、beforeResolve(to,from, next)、afterEach(to,from)；
    >
    > - 独享路由钩子：单个路由配置中设置的钩子函数
    >
    >   beforeEnter(to,from, next)；
    >
    > - 组件内路由钩子：在组件内执行的钩子函数
    >
    >   beforeRouteEnter(to,from, next)、beforeRouteUpdate(to,from, next)、beforeRouteLeave(to,from, next)
    >
    > 导航守卫的参数有：
    >
    > - to：目标路由对象；
    >
    > - from：即将要离开的路由对象；
    >
    > - next：回调函数，决定是否展示你要看到的路由页面

    ```js
    // main.js
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
    ```

    

  - 编写登录的点击事件

    使用Mock模拟后台提供token

    ```js
    // Login.vue
    import Mock from "mockjs";
    // ...
    methods: {
      login() {
        // 点击登陆后，使用Mock模拟后台提供token
        const token = Mock.Random.guid();
        this.$store.commit("setToken", token);
        this.$router.push({ name: "home" });
      },
    },
    ```

## 7-12

### 登录接口逻辑实现

在登录接口调用成功之后，我们得到了menu和token数据，从而提供了实现**根据权限渲染菜单**的可能性。

这里将menu数据传入store中存放和处理，并将menu中的路由信息动态传入router中

- 新建后端接口permission.js，编写验证用户的接口方法

  ```js
  import Mock from "mockjs";
  export default {
    getMenu: (config) => {
      const { userName, password } = JSON.parse(config.body);
      // 判断用户是否存在
      // 判断账号密码是否对应
      if (userName === "admin" && password === "admin") {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
              },
              {
                path: "/mall",
                name: "mall",
                label: "商品管理",
                icon: "video-play",
                url: "MallManage/MallManage",
              },
              {
                path: "/user",
                name: "user",
                label: "用户管理",
                icon: "user",
                url: "UserManage/UserManage",
              },
              {
                label: "其他",
                icon: "location",
                children: [
                  {
                    path: "/page1",
                    name: "page1",
                    label: "页面1",
                    icon: "setting",
                    url: "Other/Page1",
                  },
                  {
                    path: "/page2",
                    name: "page2",
                    label: "页面2",
                    icon: "setting",
                    url: "Other/Page2",
                  },
                ],
              },
            ],
            token: Mock.Random.guid(),
            message: "获取成功",
          },
        };
      } else if (userName === "user" && password === "user") {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
              },
              {
                path: "/mall",
                name: "mall",
                label: "商品管理",
                icon: "video-play",
                url: "MallManage/MallManage",
              },
            ],
            token: Mock.Random.guid(),
            message: "获取成功",
          },
        };
      } else {
        return {
          code: -999,
          data: {
            message: "密码错误",
          },
        };
      }
    },
  };
  
  ```

- 在mock.js中拦截接口

  ```js
  import permissionApi from './mockServerData/permission';
  
  Mock.mock(/permission\/getMenu/,'post', permissionApi.getMenu);
  ```

- 在data.js 中定义请求接口

  ```js
  export const getMenu = (params) => {
      return axios.request({
          url: '/permission/getMenu',
          method: 'POST',
          params
      })
  }
  ```

- 在store中添加menu相关的state和mutations

  ```js
  // tab.js
  // 引入js-cookie
  
  
  state: {
  	// ...
    menu: []
  },
  mutations: {
    // ...
    setMenu(state, value) {
      state.menu = value;
      Cookie.set("menu", JSON.stringify(value));
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove("menu");
    },
    addMenu(state, value) {
      // 如果cookie中没有menu则不做处理
      if (!Cookie.get("menu")) {
        return;
      }
      const menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      const manuArray = [];
      menu.forEach(item => {
        // 二级菜单
        if (item.children) {
          // 为菜单中的路由添加路径
          item.children = item.children.map((item) => {
            item.conponent = () => import(`@/pages/${item.url}`);
            return item
          })
          manuArray.push(...item.children)
        } else {
          // 一级菜单
          item.conponent = () => import(`@/pages/${item.url}`);
          manuArray.push(item)
        }
      });
      // 路由的动态添加
      manuArray.forEach(item => {
        router.addRoutes('main', item)
      });
    }
  }
  ```

  

- 在Login.vue页面中调用接口

  ```js
  import { getMenu } from "@/api/data";
  
  methods: {
      login() {
        // 调用后台接口
        getMenu(this.form).then((res) => {
          if (res.code === 20000) {
            this.$store.commit('clearMenu');
            this.$store.commit('setMenu', res.data.menu);
            this.$store.commit('setToken', res.data.token);
            this.$store.commit('addMenu', this.$router);
            this.$router.push({name: 'home'})
          } else {
            this.$message.warning(res.data.message)
          }
        });
      },
  ```




## 7-13

- 在组件ConmmonAside中重新动态获取menu

  ```js
  // CommonAside.vue
  // 初始化menu
  data() {
    return {
      menu: []
    };
  },
  // 重写computed：新增asyncMenu，将之前的计算属性中的menu改为asyncMenu
  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.Tab.isCollapse;
    },
    asyncMenu() {
      return this.$store.state.Tab.menu
    }
  },
  
  ```

- DEBUG：

  - 点击登录后axios发送含有用户名和密码的post请求，但后台`getMenu`接口获取不到请求体body

    原因：axios请求配置名称错误。**axios请求配置的名称是特定的！**

    ```js
    export const getMenu = (params) => {
      return axios.request({
        url: "/permission/getMenu",
        method: "post",
        params
      });
    };
    ```

    这里的`params`错误，应为`data: params`。

  - 后台接口`addMenu`动态添加路由时报错：`Uncaught (in promise) TypeError: router.addRoute is not a function`

    原因：**新版本`router.addRoutes`已废弃：使用 `router.addRoute()` 代替。**这里我尝试打印了$router，发现其原型中没有 `addRoute` 方法，原因可能是 vue-router 版本冲突。可通过重新安装3版本的 vue-router 解决

    ```
    yarn add vue-router@3
    ```



## 7-14

菜单权限功能初步实现，但存在页面刷新之后菜单内容消失的问题。因为动态获取菜单的过程是依靠点击登录按钮后调用`addMenu`实现的。

要实现页面刷新之后仍照常获取菜单，需要在main.js的created周期添加`addMenu`:

```js
new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
```

### 权限管理-登出功能

- 为CommonHeader组件的退出按键添加事件

  在组件内使用`v-on`只能监听自定义事件并需要使用`$emit` 提交。如需在组件根元素上绑定事件，需要添加`.native`修饰符：

  ```js
  // ...
  <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
  // ...
  
  methods: {
  	// ...
    logOut() {
      this.$store.commit('clearToken')  // 清除token
      this.$store.commit('clearMenu')   // 清除menu
      this.$router.push({name: 'login'})  // 跳转至登陆页面
    }
  },
  ```

权限管理功能结束

## 7-15

### 部署阿里云服务器

公网IP：47.100.121.250

域名解析： (http://garosy.top)

- 使用远程连接工具Xshell/Xftp
  - 下载安装
  - 新建会话，设置主机为公网IP，先通过远程连接密码（6位大小写）登录，用户名root，再输入实例密码（8位大小写）。出现Welcome字样表示连接成功。

## 7-16

### 安装Nginx

- 安装编译工具及库文件：

  ```
  # yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel
  ```

- 安装PCRE依赖， 让 Nginx 支持 Rewrite 功能：

  ```nginx
  进入本地依赖目录
  # cd /usr/local/src/
  
  下载源码
  # wget http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz
  
  解压包
  # tar zxvf pcre-8.35.tar.gz
  
  进入包目录
  # cd pcre-8.35
  
  配置
  # ./configure
  
  编译并安装
  # make && make install
  
  成功后查看版本
  # pcre-config --version
  显示8.35
  ```

- 安装nginx

  ```nginx
  进入本地依赖目录
  # cd /usr/local/src/
  
  下载源码
  # wget https://nginx.org/download/nginx-1.23.0.tar.gz
  
  解压
  # tar xf nginx-1.23.0.tar.gz
  此时目录下多出了`nginx-1.23.0`文件，其中有绿色的可执行文件`configure`
  
  进入包目录
  # cd nginx-1.23.0
  
  配置
  # ./configure --prefix=/usr/local/webserver/nginx
  
  编译
  # make
  
  安装
  # make install
  
  成功后查看版本
  # /usr/local/webserver/nginx/sbin/nginx -v
  nginx version: nginx/1.23.0
  ```

> 源码安装要经过 配置-->编译-->安装 三步
>
> - 配置 configure 
>
>   1. 检查环境是否满足安装条件
>
>   2. `--prefix=path` 指定安装路径
>
>   3. `--help` 配置参数，选择模块功能等等

> Nginx相关目录
>
> - 启动文件	/usr/local/webserver/nginx/sbin/nginx
> - 模块	/usr/local/webserver/nginx/sbin/nginx
> - 配置文件目录	/usr/local/webserver/nginx/conf
> - 配置文件	/usr/local/webserver/nginx/conf/nginx.conf
> - pid文件	/usr/local/webserver/nginx/logs/nginx.pid



- 启动nginx

  ```nginx
  # /usr/local/webserver/nginx/sbin/nginx
  ```

- 验证nginx

  ```
  netstat -ntpl
  lsof -i :80
  ```

   把服务器ip地址放到浏览器中，即可发现跳转到nginx的欢迎页面！

> 注意：
>
> 阿里云服务器默认只打开22端口用于Xshell连接，需要在安全组手动添加80端口以访问网页

Nginx成功安装之后，接下来只需要把网页放到服务器中的指定位置即可，再针对配置文件做修改。有域名的条件下，可以把域名和自己服务器关联起来做解析。 

### Nginx配置详解

nginx.conf的默认配置文件可以总体归纳为三个模块： 

```nginx
#全局模块
events {
    #events模块
}

http 
{

   #http全局模块
 
    server 
    {
    
        #server全局模块
     
        location [PATTERN]{
           #location模块
        }
    }

}  
```

1. 全局块：

   配置影响nginx全局的指令。一般有运行nginx服务器的用户组，nginx进程pid存放路径，日志存放路径，配置文件引入，允许生成worker process数等。

2. events块：

   配置影响nginx服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。

3. http块：

   可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。如文件引入，mime-type定义，日志自定义，是否使用sendfile传输文件，连接超时时间，单连接请求数等。

4. server块：

   配置虚拟主机的相关参数，一个http中可以有多个server。

5. location块：

   配置请求的路由，以及各种页面的处理情况。

### 配置SSL(https)证书

- 此操作的前提是编译安装Nginx时必须添加`–with-http_ssl_module`配置

  > 如需在已安装的情况下添加模块，详见：  https://blog.csdn.net/guo_qiangqiang/article/details/95622649

- 在/usr/local/webserver/nginx目录下创建cert目录用于存放证书

- 修改 nginx.conf 文件的 HTTPS server 部分。（这部分默认是被注释掉的）：

  ```nginx
  server {
      listen 443;
      server_name localhost;
      ssl on;
      root html;
      index index.html index.htm;
      ssl_certificate   cert/xxxxxxxxxx.pem;		#证书路径
      ssl_certificate_key  cert/xxxxxxxxxx.key;	#私钥路径
      ssl_session_timeout 5m;
      ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
      ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
      ssl_prefer_server_ciphers on;
      location / {
          root html;
          index index.html index.htm;
      }
  }
  ```

- 在阿里云控制台部署证书

- 重启nginx配置项

  ```
  ./nginx -s reload
  ```




## 7-17

### Nginx 部署 Vue 项目

- 项目打包
  - 配置 `vue.config.js` ：

    ```js
    module.exports = defineConfig({
      transpileDependencies: true,
      lintOnSave: false,
      publicPath: '/vue-manage/',  // 公共路径
      devServer: {  // 配置服务器
        port: 8080, // 端口号
        open: true, // 自动打开浏览器
      }
    })
    ```

  - 指定router `index.js` 的路由基本路径：

    ```js
    const router = new VueRouter({
      mode: "history",
      base: "/vue-manage/", // 配置 nginx 访问结构
      routes, // `routes: routes` 的缩写
    });
    ```

  - 打包

    ```
    yarn build
    ```

    

- 部署到服务端nginx

  - 复制dist至服务器目录 /usr/local/webserver/nginx/html ，将dist目录重命名为 `vue-manage` 

  - 更新nginx配置文件

    ```nginx
    // nginx.conf
    
    // ...
    
    server {
        #监听端口
        listen 80;
        #监听地址
        server_name localhost;
    
        #access_log  logs/host.access.log  main;
        location / {
          # 配置根目录的地址
          root html;
          index index.html index.htm;
        }
        
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
          root html;
        }
    
        # 配置前台服务 比如:8080/vue-manage/index.html
        location ^~ /vue-manage {
          # 处理 Vue 单页面应用
          try_files $uri $uri/ /vue-manage/index.html;
        }
      }
    
    // ...
    ```

  - 热重载nginx

    ```
    ./nginx -s reload
    ```

- 现在即可通过公网ip `http://47.100.121.250/vue-manage` 访问我的vue项目了！

## 7-28

### Nginx设置虚拟主机配置二级域名

使用基于域名的虚拟主机配置是比较流行的方式，可以在同一个IP上配置多个域名并且都通过80端口访问。这里使用二级域名来配置不同项目的访问：

- 在云服务器控制台解析二级域名

- **重要：更改 `vue.config.js` 的公共路径为根目录 `'/'`，重新打包至服务器，否则项目无法运行！**

- nginx配置

   为了配置文件的可拓展性和维护方便，这里将不同项目的配置文件独立存放至`nginx/conf.d`文件夹中，再将其引入至主配置 `nginx.conf` 内的http模块中：
   
   ```nginx
   http {
   	##
     # 引入子配置文件
     ##
     include /usr/local/webserver/nginx/conf.d/*.conf;
   }
   ```
   
    在 `conf.d` 文件夹中新建项目对应的配置文件，例如 `test.conf` ，部署监听地址、端口和对应目录：
   
   ```nginx
   # test
   server {
     listen 80;
     server_name test.garosy.top;
     location / {
       root html/test;
       index index.html;
     }
   }
   ```
   
   需要注意的是，如果项目使用了vue-router的history模式搭建，使用nginx的 `index` 指令配置页面会导致404。这是由于vue-router中使用的url仅仅是一系列路由，并不是文件的真实目录地址，所有的路由依赖于单页应用的 `index.html` 来加载。
   
   因此，我们需要使用nginx的 `try_files` 指令查找 `index.html`：
   
   ```nginx
   # vue-manage项目
   server {
     listen 80;
     server_name manage.garosy.top;
     location / {
       root html/vue-manage;
       index index.html index.htm;
       try_files 
     }
   }
   ```
   
   > try_files语法规则：
   >
   > - `try_files [file] ... [uri]`	按指定的`[file]`顺序查找存在的文件，并使用第一个找到的文件进行请求处理。查找路径是按照给定的root或alias为根路径来查找的。如果给出的file都没有匹配到，则重新请求最后一个参数给定的uri，就是新的location匹配。
   > - `try_files [file] ... = [code]` 	如果 `[code]` = 404 ，若给出的file都没有匹配到，则最后返回404响应码 
   > - `$uri`	代表请求的文件
   > - `$uri/`	代表请求的目录
   > - 可应用于 server/location 段 
   >
   > 例如：
   >
   > ```nginx
   > location /images/ {
   >     root /opt/html/;
   >     try_files $uri $uri/ /images/default.gif; 
   > }
   > ```
   >
   > 这段配置下，请求 `127.0.0.1/images/test.gif` 会依次查找
   >
   > 1. 文件 /opt/html/images/test.gif   
   >
   > 2. 文件夹 /opt/html/images/test.gif/下的index文件  
   >
   > 3. 请求 127.0.0.1/images/default.gif



## 8-3

- 为实现列表宽度自适应，引入 `v-fit-columns` 插件，在el-table标签后加`v-fit-columns`即可。

## 8-5

### 部署Express框架

- 在云服务器安装nodejs

  ```bash
  cd /usr/local/node
  
  wget https://nodejs.org/dist/v16.16.0/node-v16.16.0-linux-x64.tar.xz
  
  tar -xvf node-v16.16.0-linux-x64.tar.xz
  
  # 重命名为 nodejs
  mv node-v16.16.0-linux-x64 nodejs
  
  # 为node和npm命令建立软链接，让npm和node命令全局生效
  ln -s /usr/local/node/nodejs/bin/node /usr/local/bin/
  ln -s /usr/local/node/nodejs/bin/npm /usr/local/bin/
  
  ```

- 全局安装express框架和其生成器

  ```bash
  npm install -g express
  npm install -g express-generator
  
  ln -s /usr/local/node/nodejs/bin/express /usr/local/bin/
  
  express --version
  ```

- 验证：在xshell中新建js文件 `index.js` 

  ```js
  // 引入express
  const express = require("express");
  const app = express();
  
  // 新建一个简单的get请求接口
  app.get("/api/get", (rec, res) => {
    // 返回的是json数据
    res.send('Hello express')
    res.json({
      method: 'GET',
      data: [{
        name: 'gao arosy',
        age: 24
      }]
    })
  });
  
  const server = app.listen(8081, ()=> {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`应用实例，访问地址为 http://${host}:${port}`);
  })
  ```

  在xshell中输入

  ```bash
  node index.js
  ```

  在浏览器中输入公网ip：`47.100.121.250:8081/api/get` 访问，显示：`应用实例，访问地址为 http://:::8081` 即验证成功，ctrl+c退出即可。

- 使用express-generator生成express项目

  ```bash
  # 创建项目
  express node-manage
  # 安装依赖
  cnpm install
  #运行项目
  DEBUG=node-manage:* npm start
  ```

  创建完成后，使用 `node ./bin/www` 或 `npm start ./bin/www` 即可启动项目，但随bash关闭，项目也会停止。

  这时可使用pm2或forever等进程管理工具解决，这里使用pm2：
  
- 安装pm2进程管理工具

  ```bash
  cnpm install pm2 -g
  
  ln -s /usr/local/node/nodejs/lib/node_modules/pm2/bin/pm2 /usr/local/bin/
  
  pm2 -v
  ```

- 使用pm2启动node项目，**可以在xshell关闭后保持服务继续运行**

  ```bash
  cd /root/node-manage
  
  pm2 start ./bin/www
  ```

  此时的node进程甚至在kill之后也会自动重启，我们永远无法绕过pm2指令彻底关闭node进程，**3000端口永远会处于占用状态！**若要停止项目，输入：

  ```
  pm2 stop all
  ```

  > 附常用pm2指令：
  >
  > ```bash
  > $ pm2 start app.js # 启动app.js应用程序
  > 
  > $ pm2 start app.js –name=”api” # 启动应用程序并命名为 “api”
  > 
  > $ pm2 start app.js –watch # 当文件变化时自动重启应用
  > 
  > $ pm2 start script.sh # 启动 bash 脚本
  > 
  > $ pm2 list # 列表 PM2 启动的所有的应用程序
  > 
  > $ pm2 monit # 显示每个应用程序的CPU和内存占用情况
  > 
  > $ pm2 show [app-name] # 显示应用程序的所有信息
  > 
  > $ pm2 logs # 显示所有应用程序的日志
  > 
  > $ pm2 logs [app-name] # 显示指定应用程序的日志
  > 
  > $ pm2 stop all # 停止所有的应用程序
  > 
  > $ pm2 stop 0 # 停止 id为 0的指定应用程序
  > 
  > $ pm2 restart all # 重启所有应用
  > 
  > $ pm2 reload all # 重启 cluster mode下的所有应用
  > 
  > $ pm2 gracefulReload all # Graceful reload all apps in cluster mode
  > 
  > $ pm2 delete all # 关闭并删除所有应用
  > 
  > $ pm2 delete 0 # 删除指定应用 id 0
  > 
  > $ pm2 scale api 10 # 把名字叫api的应用扩展到10个实例
  > 
  > $ pm2 reset [app-name] # 重置重启数量
  > 
  > $ pm2 startup # 创建开机自启动命令
  > 
  > $ pm2 save # 保存当前应用列表
  > 
  > $ pm2 resurrect # 重新加载保存的应用列表
  > 
  > $ pm2 update # Save processes, kill PM2 and restore processes
  > 
  > $ pm2 generate # Generate a sample json configuration file
  > ```
  >
  > 

- 验证

  输入 `curl http://localhost:3000` ，或在浏览器输入公网ip：`47.100.121.250:3000` 访问即可看到返回的express的欢迎页：

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <title>Express</title>
      <link rel="stylesheet" href="/stylesheets/style.css">
    </head>
    <body>
      <h1>Express</h1>
      <p>Welcome to Express</p>
    </body>
  </html>
  ```

  在bash中输入 `netstat -n` 可见3000端口处于listen状态，输入 `lsof -i` 可查看进程PID。

## 8-8

### Express连接MySQL

- 安装mysql（YUM方式）

  - 检查是否已安装mysql

    ```
    rpm -qa | grep mysql
    ```

    返回为空，表示没有安装

    ```
    find / -name mysql
    ```

    使用 `rm -rf` 删除找出的文件

    > 从CentOS 7开始，MariaDB成为Yum源中默认的数据库安装包。也就是说在CentOS 7及以上的系统中使用yum安装MySQL默认安装的会是MariaDB（MySQL的一个分支）。如果想安装官方MySQL版本，需要使用MySQL提供的Yum源。
    >
    > ```
    > yum install mysql
    > ```
    >
    >  这里执行安装命令是无效的，因为centos-7默认是Mariadb，所以执行以下命令只是更新Mariadb数据库 

  - 下载安装包

    在mysql社区找到对应版本的yum源，下载安装包并安装

    >  [MySQL :: Download MySQL Yum Repository](https://dev.mysql.com/downloads/repo/yum/) 

    ```shell
    wget https://dev.mysql.com/get/mysql80-community-release-el8-4.noarch.rpm
    
    yum install mysql80-community-release-el8-4.noarch.rpm
    ```

    出现 Complete 字样表示安装成功

  - 安装mysql命令

    ```
    yum install mysql-community-server
    ```

    如果出现`No match for argument: mysql-community-server`，可先执行

    ```
    yum module disable mysql
    ```

    多次输入 Y 确认，直到出现complete字样

- 启动mysql

  ```bash
  service mysqld start
  ```

  查看mysql状态

  ```bash
  service mysqld status
  ```

  返回

  ```bash
  ● mysqld.service - MySQL Server
     Loaded: loaded (/usr/lib/systemd/system/mysqld.service; enabled; vendor preset: disabled)
     Active: active (running) since Mon 2022-08-08 16:58:50 CST; 2s ago
       Docs: man:mysqld(8)
             http://dev.mysql.com/doc/refman/en/using-systemd.html
    Process: 115810 ExecStartPre=/usr/bin/mysqld_pre_systemd (code=exited, status=0/SUCCESS)
   Main PID: 115837 (mysqld)
     Status: "Server is operational"
      Tasks: 39 (limit: 10882)
     Memory: 411.9M
     CGroup: /system.slice/mysqld.service
             └─115837 /usr/sbin/mysqld
  
  Aug 08 16:58:47 iZuf6dg5nxsd5q9qj3v7x8Z systemd[1]: Starting MySQL Server...
  Aug 08 16:58:50 iZuf6dg5nxsd5q9qj3v7x8Z systemd[1]: Started MySQL Server.
  ```

  启动成功。此时MySQL已经开始正常运行，不过要想进入MySQL还得先找出此时root用户的密码。

- 进入数据库

  显示mysql的随机密码：

  ```bash
  grep "password" /var/log/mysqld.log
  ```

  返回

  ```bash
  2022-08-08T08:52:04.606419Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: vhie:ynmf8_D
  
  ```

  `vhie:ynmf8_D` 即初始密码。可使用它进入数据库。

  ```
  mysql -u root -p
  ```

  粘贴密码，回车，返回 Welcome to the MySQL monitor 字样即成功进入

  - 修改密码

    - 方法一：

      `mysqladmin -u root -p [新密码]` 

    - 方法二：

      进入数据库，输入

      ```mysql
      ALTER USER 'root'@'localhost' IDENTIFIED BY '[newPassword]';
      ```

      注意在语句结束输入分号，新密码需要包含大小写字母、数字和特殊符号。

- 开放远程访问

  - mysql默认使用3306端口，需要在阿里云控制台开放3306端口。

  - 使用navicat连接

    >  [Navicat Premium 16 下载与安装破解教程](https://learnku.com/articles/67706) 

    这里出现1130错误，经查是无法给远程连接的用户权限问题。

    需要更改 “mysql” 数据库里的 “user” 表里的 “host” 项，将”localhost”改称'%'。

  - 查看库的用户权限表

    进入数据库，查看可进行连接访问的主机/IP名称 

    ```mysql
    use mysql;
    select host, user, authentication_string, plugin from user;
    ```

    可以看到，用户root对应的主机是localhost，而不是%，所以不能远程连接。

    这里以通配符%的内容增加主机/IP地址，使**任意ip**都可访问数据库：

    ```mysql
    update user set host = '%' where user ='root';
    ```

    再刷新MySQL的系统权限相关表：

    ```mysql
    flush privileges;
    ```

    再次查看用户权限表可见用户root对应的主机变成了%

  - navicat报2059错误

    MySQL新版本（8以上版本）的用户登录账户加密方式是【caching_sha2_password】，低版本的Navicat不支持这种用户登录账户加密方式。需要修改加密方式：

    ```mysql
    ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '[密码]';
    ```

    建议做法是使用新版本的Navicat工具。

    ==使用express连接数据库如出现1251错误，也可使用此方法==

  

- 将示例项目express-mysql与express连接

  - 使用navicat远程连接至数据库，新建库test

  - 创建express-mysql项目

    ```bash
    npm init
    
    npm install mysql
    npm install express
    ```

  - 新建express主文件app.js

    引入模块，创建express和mysql实例，监听3000端口

    ```js
    // app.js
    const mysql = require('mysql')
    const express = require('express')
    const app = express()
    const port = 3000
    
    // 创建一个sql实例，加入配置
    const connection = mysql.createConnection({      //创建mysql实例
    	host: '47.100.121.250',    // 连接的sql地址,外网地址
      user: 'root',  // 用户名
      password: 'xxxxxx', // 数据库密码
      database: 'test'  // 选择的库
    });
    // 连接数据库
    connection.connect();
    
    // 在接口中使用数据库的数据
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    
    app.get('/api/get', (req, res) => {
      /* 使用 connection.query 来执行 sql 语句 */
      // 第一个参数为 sql 语句，可以透过 js 自由组合
      // 第二个参数为回调函数，err 表示查询异常、第二个参数则为查询结果（这里的查询结果为多个用户行）
      connection.query('SELECT * FROM test', (err,result) => {
        if (err) {
          res.send('query error');
          return
        } else {
          // 将 MySQL 查询结果作为路由返回值，这里返回的是json类型的数据
          res.json({
          	method: 'GET',
            data: result
          })
        }
      })
    })
    
    // 监听3000端口
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
    
    ```

  - 启动项目

    ```bash
    node app.js
    ```

    使用浏览器访问 47.100.121.250:3000/api/get，返回json数据 `{"method":"GET","data":[{"1":"a","2":"b","3":"c"}]}`，express与mysql连接成功！

    

  > mysql常用语句
  >
  >  [MySQL语句详解 CSDN博客](https://blog.csdn.net/qq_44944641/article/details/116840432) 
  >
  > //访问整个表的信息
  > select  * from goods
  > //带查询条件访问表
  > select * from goods where name = '{name}'
  > //添加记录
  > insert into userinfo values('{****}','${***}','${***}')`
  > //删除整个表的数据
  > delete from goods
  > //带条件删除
  > delete from goods where id=4
> //修改语句
  > update 表名 set 字段名=‘新内容’ + where条件

  

  config.js -- 启动配置

  ```js
  // config.js
  module.exports = {
    port: 3000, // express 服务启动端口
    /* 数据库相关配置 */
    db: {
      host: "47.100.121.250", // 主机名
      port: 3306, // MySQL 默认端口为 3306
      user: "root", // 使用 root 用户登入 MySQL
      password: "xxx",  // MySQL 密码
      database: "test", // 指定使用的数据库
    }
};
  ```

   db.js -- 创建数据库实例连接

  ```js
  // db.js
  // 建立Mysql连接并导出
  const express = require('express'); // 引入express
  const config = require('./config'); // 获取配置信息
  const $mysql = require('mysql');    // 引入mysql 
module.exports = $mysql.createConnection(config);  // mysql.createConnection 方法创建连接实例
  ```

  



## 8-9

### 封装sql

为方便使用路由进行多模块开发，这里将配置项和连接数据库的方法独立封装起来：

- 新建db目录，新建config.js 和 mysql.js

- 新建config.js，用于存放数据库配置项

  ```js
  module.exports = {
    host: "47.100.121.250", // 连接的sql地址,外网地址
    user: "root", // 用户名
    password: "Wxr02070.", // 数据库密码
    database: "test", // 选择的库
  };
  ```

- 新建mysql.js，用于创建mysql实例，并暴露连接数据库的方法

  ```js
  const mysql = require("mysql");
  const config = require("./config");
  
  module.exports = {
    queryDB(sql, params, callback) {
      // 每次使用的时候需要创建链接，数据操作完成之后要关闭连接
      const connection = mysql.createConnection(config); // 创建mysql连接实例
      connection.connect((err) => {
        if (err) {
          console.log("数据库链接失败");
          throw err;
        }
  
        // 开始数据操作
        /* 使用 connection.query 来执行 sql 语句 */
        // 第一个参数为 sql 语句，可以透过 js 自由组合
        // 第二个参数为回调函数，err 表示查询异常、第二个参数则为查询结果（这里的查询结果为多个用户行）
        connection.query(sql, params, (err, results, fields) => {
          if (err) {
            console.log("数据操作失败");
            throw err;
          }
          callback && callback(results, fields); // results作为数据操作后的结果，fields作为数据库连接的一些字段
          // 停止链接数据库
          connection.end((err) => {
            if (err) {
              console.log("关闭数据库连接失败");
              throw err;
            }
          });
        });
      });
    },
  };
  ```

- 修改app.js

  这时就能够简化express的主文件，使它专注于路由接口和处理函数了：

  ```js
  // app.js
  const express = require('express');
  const db = require("./db/mysql");
  const app = express();
  const port = 3000;
  
  // 在接口中使用数据库的数据
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  
  app.get("/api/get", (req, res) => {
    db.queryDB("SELECT * FROM test", (err, result, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      // 将 MySQL 查询结果作为路由返回值，这里返回的是json类型的数据
      res.json({
        method: "GET",
        data: result,
      });
    });
  });
  
  // 监听3000端口
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  
  ```



## 8-10

- 安装nodemon，监控 node.js 源代码的任何变化和自动重启服务器

  ```
  cnpm install nodemon -g
  ```

  使用nodemon启动项目

  ```
  nodemon app.js
  ```

- 安装winston日志，打印日志文件

  > 参考 
  >
  >  [Node.js 日志之winston使用指南 - 掘金 (juejin.cn)](https://juejin.cn/post/7018169629176496158) 
  >
  >  [(21条消息) winston日志框架_kgduu的博客-CSDN博客_winston 日志](https://blog.csdn.net/xiexingshishu/article/details/117196560) 

  ```
  cnpm install winston
  ```

   在项目的utils目录添加一个配置打印日志格式的文件 logger.js，和存放日志的文件夹 logs

  ```js
  const { createLogger, format, transports } = require("winston");
  const fs = require("fs");
  const path = require("path");
  
  const env = process.env.NODE_ENV || "development";
  
  // 调用 winston 库中的 createLogger 函数来初始化记录器
  module.exports = createLogger({
    /**
     * 在 transports 文件传输器对象中，可以提供一个文件名 filename 将日志存储在文件中。
     * 默认情况下，日志记录未格式化，并打印为带有两个参数的 JSON 字符串、日志消息和等级。
     */
    format: format.combine(
      format.label({ label: path.basename(process.mainModule.filename) }),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" })
    ),
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.printf(
            (info) =>
              `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
          )
        ),
      }),
      new transports.File({
        filename: "logs/serverInfo.log",
        // 日志级别，只在 console.info 方式下使用 winston
        level: "info",
        format: format.combine(
          format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          format.align(),
          format.printf((info) =>
            info.level === "info"
              ? `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
              : ''
          )
        ),
      }),
      // winston 允许设置多种 transport
      new transports.File({
        filename: "logs/serverError.log",
        level: "error",
        format: format.combine(
          format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          format.align(),
          format.printf(
            (err) =>
              `${err.timestamp} ${err.level} [${err.label}]: ${err.message}`
          )
        ),
      }),
    ],
  });
  
  ```

  在express入口文件app.js中使用winston

  ```js
  // ...
  const logger = require("./utils/logger");
  
  app.get("/", (req, res) => {
    res.send("Hello World!");
    logger.info("Server Sent A Hello World!");
  });
  //...
  
  // 捕获 500 错误
  app.use((err, req, res, next) => {
    res.status(500).send("500 Server Error");
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip}`
    );
  });
  
  // 中间件捕获 404 错误，并定向到错误处理
  app.use((req, res, next) => {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.send("404 Not Found");
    logger.error(
      `${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip} : ${err.message}`
    );
  });
  
  // 监听3000端口
  app.listen(port, () => {
    // console.log(`Server started and running on http://${host}:${port}`);
    logger.info(`Server started and running on http://${host}:${port}`);
  });
  
  ```



- 使用postMan接口测试工具

  >  [Postman 汉化(Postman中文版) - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1814966) 





## 8-11

### 使用express路由

为方便模块化开发，利用 `express.Router()` 快速路由器将路由文件独立出来

- 新建routers文件夹，新建路由模块user.js

  ```js
  const express = require("express");
  // 使用快速路由器Router()
  const router = express.Router();
  const logger = require("../utils/logger");
  
  router.all("/", (req, res) => {
    res.send("User Background");
    logger.info(
      `[${req.method}-${res.statusMessage}-${req.originalUrl}-${req.ip}] Server Sent User-Background Response`
    );
  });
  
  // 导出路由
  module.exports = router;
  ```

- 在app.js中挂载路由模块

  ```js
  // ...
  const user = require("./routers/user");
  
  // ...
  app.use("/user", user);
  ```

- 以`/user`为前缀的url都会由此模块加载。访问 `http://127.0.0.1:3000/user`





## 8-12

### 优化项目

- **公共页面布局Layout**

  layout公共页面是使用频率非常高的页面，且直接通过路由配置。本项目把侧边栏和导航头作为layout。

  在pages文件夹新建Layout文件夹，新建index.vue路由出口



## 8-13

- 折叠菜单

  - 动态icon

  - 侧边栏添加粘性位置布局，随窗口滑动

  - 优化面包屑组件，由监听菜单点击事件改为监听当前页面路由

    配置路由，加入meta

    ```js
    // index.js
    // ...
    meta: {
            title: "首页"
          }
    ```

    ```js
    // CommonHeader.vue
    // ...
    <!-- 使用面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="item in routes"
        :key="item.path"
        :to="{ path: item.path }"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    
    // ...
    
    computed: {
    	// ...
      // 监听路由（除首页），供面包屑组件遍历渲染
      routes() {
        return this.$route.matched.filter((item) => {
          return (item.name !== "layout") && (item.name !== "home") 
        });
      },
    },
    ```

    移除vuex关于面包屑组件的state

## 8-15

### 从后端获取商品列表数据

- 前端项目

1. 修改api目录，将mock接口、路由和数据统一至mockServer文件夹；新建base.js(配置后台接口路径)，新建index.js(存放api请求方法)。移除原来mock对商品页面的路由监听

2. 在main.js引入api，并修改vue原型，将api注册全局使用

   ```js
   // 引入api
   import api from './api/index';
   
   // 全局使用api
   Vue.prototype.$api = api;
   ```

3. 在Mall.vue页面中修改原来的方法，使用后端数据库中的数据

4. 在vue.config.js中使用代理模式配置本地跨域

   devServer.proxy的作用实际上是**将前后端放到同一个域**里，从而消除了跨域的问题。 过程可以概括为：

   1. proxy检查我们的请求的url ： /api/todos有没有代理标识/api，如果有的话，在url前加上代理路径，即整个url为http://localhost:3000/api/api/todos
   
   2. pathRewrite中的^/api会把代理标识/api替换为空，即整个url变为：http://localhost:3000/api/todos
   
   ```js
   module.exports = defineConfig({
   	// ...
     devServer: {  // 配置服务器
       port: 8080, // 端口号
       proxy: {  // 前后端分离，需要配置跨域（代理方法）
         '/api': { // 如果请求地址以api开头，就触发代理机制
           target: 'http://localhost:3000',  // 要代理的接口地址
           ws: true,
           changeOrigin: true,
           pathRewrite: {  // 重写路径，将url中的前缀替换后再发送请求，如无必要可不加
             '^/api': ''
           }
         }
    }
     }
   })
   ```
   
   

- 后端项目

1. 在mall.js中编写商品增删改查的接口

2. 在app.js中配置跨域（CORS）

   此配置用于生产环境

   ```js
   // 设置CORS跨域
   app.use((req,res,next)=>{
     // 设置响应头
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
     res.setHeader('Access-Control-Allow-Methods', '*');
     next()
   })
   ```



### 使用nginx反向代理在生产环境配置跨域

>  [前后端分离项目实践--BaseURL与跨域 - 简书 (jianshu.com)](https://www.jianshu.com/p/27d61b548478) 

使用vue-cli的proxy跨域仅适用于本地开发环境，因为当Vue项目打包成静态文件时，他的代理也就失灵了，因为代理的前提是本地必须有service在运行。 

生产环境下要么把前端项目放在后端项目里，要么设置cors解决跨域问题，前者不利于前后端分离，后者需要后端配置，而使用nginx设置反向代理可以很好解决跨域问题。 

```nginx
# conf.d/manage.conf

server {
  listen 80;
  server_name manage.garosy.top;
  location / {
    root html/vue-manage;
    index index.html;
    try_files $uri $uri/ /index.html =404;
  }
  location /api/ {
    proxy_pass http://manage.garosy.top:3000;	# 此处不能在末尾添加 /，
  }
  error_page 405 =200 $uri;
}
```

## 8-17

添加商品类目选择器

```vue
<el-cascader
  v-if="item.type === 'cascader'"
  v-model="form[item.model]"
  :options="cascaderOptions"
  :show-all-levels='false'
>
</el-cascader>
```

==BUG==：elementui级联选择器有无法回显的问题，经查发现有几种办法处理：1、设置黑色placeholder；2、单独处理回显数组并绑定，等等，都难称优雅。暂不处理此问题

## 8-18

上传图片功能

- 后端

  - 安装multer，fs中间件并引入

    Multer 是一个 node.js 中间件，用于处理 `multipart/form-data` 类型的表单数据，它主要用于上传文件。 

    Multer 会添加一个 `body` 对象 以及 `file` 或 `files` 对象 到 express 的 `request` 对象中。 `body` 对象包含表单的文本域信息，`file` 或 `files` 对象包含对象表单上传的文件信息。 

    ```powershell
    cnpm i multer
    cnpm i fs
    ```

    ```js
    const fs = require('fs');
    const multer = require('multer');
    ```

  - 根目录下新建文件夹upload

  - 使用multer，编写接口

    ```js
    // 上传图片
    const storage = multer.diskStorage({
      // 要保存的文件夹
      destination: (req, file, cb) => {
        cb(null, "./upload");
      },
      // 在文件夹下的文件名
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });
    // 创建upload文件夹
    const createFolder = (folder) => {
      try {
        fs.accessSync(folder);
      } catch (e) {
        fs.mkdirSync(folder);
      }
    };
    const uploadFolder = "./upload/";
    createFolder(uploadFolder);
    // 实例化multer
    const upload = multer({
      storage: storage
    });
    ```

  - 编写接口

    ```js
    router.post("/uploadGoodsPics", upload.single("file"), (req, res) => {
      // 使用json解析FormData数据
      const { originalname, size, destination } = JSON.parse(
        JSON.stringify(req.file)
      );
    
      // 打印日志
      logger.info(
        `[${req.method}-${res.statusMessage}-${req.originalUrl}-${
          req.ip
        }]: 上传图片:${JSON.stringify(req.body.file)} `
      );
      
      // 返回数据
      return res.json({
        res_code: "1",
        name: originalname,
        size,
        destination
      });
    });
    ```

    





- 前端

  - 使用el-upload，新建组件CommonUpload.vue并引入CommonForm组件

    ```vue
    <template>
      <el-upload
        accept="image/jpeg,image/gif,image/png"
        class="upload-demo"
        ref="upload"
        :action="uploadURL"
        :on-change="onUploadChange"
        :on-success="onUploadSuccess"
        :file-list="fileList"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
          >上传图片</el-button
        >
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png/gif图片，且不超过1MB
        </div>
      </el-upload>
    </template>
    ```

    `:auto-upload="false"` 关闭自动上传

## 8-20

- 上传图片接口接入数据库，从Mall.vue页面将商品id传入commonupload组件，后将商品id传入数据库，对应此商品的图片

  ```js
  let formData = new FormData();
  formData.append("id", uuid()); // 生成唯一id作为图片名
  formData.append("goodsId", this.goodsId); // 商品id
  formData.append("file", file);
  
  this.$api
    .uploadPics(formData)
    .then((result) => {
      if (result.data.res_code === "1") {
        this.$message.success("上传成功！");
      } else {
        this.$message.error("上传失败！");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  ```

  

- 点击编辑商品时，商品图片列表会访问后端接口，进入数据库查找该商品对应的之前已上传的图片，并在页面中加载（将其放在created周期中）

  ```js
  getGoodsPicsList() {
    this.$api
      .showGoodsPicsList({
        goodsId: this.goodsId,
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          res.data.list.forEach((element) => {
            this.fileList.push({ ...element, name: element.originalname });	// 备注👇
          });
        } else {
          console.log("0");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  ```

  ==BUG==：这里的回显需要依靠elementUI上传组件中内置的fileList属性，经尝试发现它本身结构默认为数组，可渲染项必须是带有 `name` 字段的对象，否则会报错缺失 `uid` 属性（uid无需手动添加）

- 后端代码

  ```js
  router.post("/uploadGoodsPics", upload.single("file"), (req, res) => {
    // 使用json解析FormData数据
    const { originalname, size, destination } = JSON.parse(
      JSON.stringify(req.file)
    );
    const id = JSON.parse(JSON.stringify(req.body.id));
    const goodsId = JSON.parse(JSON.stringify(req.body.goodsId));
  
    // 图片信息储存至数据库
    let sql_code = "0";
    const sql = `insert into goodspic values ('${id}','${goodsId}','${req.file.filename}','${req.file.originalname}','${req.file.mimetype}','${req.file.size}')`;
    db.queryDB(sql, (err, data) => {
      if (err) {
        console.log(`query error: ${err}`);
        return;
      } else {
        sql_code = "1";
      }
    });
  
  /**
   * 回显已上传的图片列表
   */
  router.get("/showGoodsPicsList", (req, res) => {
    const sql = `select * from goodspic where goodsid='${req.query.goodsId}'`;
    db.queryDB(sql, (err, data) => {
      if (err) {
        console.log(`query error: ${err}`);
        return;
      } else {
        res.json({
          code: 1,
          method: "GET",
          list: data,
        });
      }
    });
  });
  ```

  

- ==BUG==：请求触发问题。页面加载后第一个点击的商品会触发请求后台接口，正确显示图片列表，但之后点击其他商品时，图片列表依然是第一个商品的内容。可能需要使用vuex触发一个公共方法，来即时更新上传图片列表。

## 8-22

- 使用VueX管理商品id数据

- 使用VueX管理上传图片列表数据 `fileList`，并使用action从后台异步获取列表数据，解决触发请求后台数据不及时的BUG

  ```js
  // mall.js
  import api from "@/api/index";
  
  export default {
    state: {
      goodsId: "",
      fileList: [],
    },
    mutations: {
      changeGoodsId(state, id) {
        state.goodsId = id;
        console.log(state.goodsId);
        console.log(state.fileList);
      },
      changeFileList(state, list) {
        state.fileList = list;
        console.log(state.fileList);
      },
    },
    actions: {
      asyncGetGoodsPicsList(context) {
        let result = [];
        // vuex中无法直接使用$api对象，此处手动引入api
        // this.$api. 
        api.showGoodsPicsList({
            goodsId: context.state.goodsId,
          })
          .then((res) => {
            // console.log(res);
            // 从后台数据库获取已上传的图片列表
            if (res.data.code === 1) {
              res.data.list.forEach((element) => {
                result.push({ ...element, name: element.originalname });
              });
              context.commit("changeFileList", result);
            } else {
              console.log("0");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      },
    },
  };
  ```

  ==注意==：

  1. vuex中无法直接使用$api对象，此处手动引入api。

  2. 包含异步请求的处理函数必须写在actions内，并使用 `context.commit` 来修改state（vuex第一原则：**state只能通过提交mutation修改！**）

     > Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。 

- 删除图片功能

  前端

  ```js
  // CommonUpload.vue
  // 移除文件列表文件时的钩子
  handleRemove(file, fileList) {
    console.log(file);
    this.$api
      .removeGoodsPics({ name: file.picname })
      .then((res) => {
        // console.log(res);
        if (res.data.code === 1) {
          this.$message.success("删除成功！");
        } else {
          this.$message.error("删除失败！");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  ```

  后端

  ```js
  // Mall.js
  /**
   * 删除已上传的图片
   */
  router.get("/removeGoodsPics", (req, res) => {
    const sql = `delete from goodspic where picname='${req.query.name}'`;
    console.log(req.query);
    db.queryDB(sql, (err, data) => {
      if (err) {
        console.log(`query error: ${err}`);
        return;
      } else {
        // 使用fs删除文件
        //    注意：nodejs中使用相对路径是不可靠的，尽量使用__dirname
        fs.unlink(path.join(__dirname, `../upload/${req.query.name}`), (e) => {});
        // 打印日志
        logger.info(
          `[${req.method}-${res.statusMessage}-${req.originalUrl}]: 删除图片:${req.query.name} `
        );
        return res.json({
          code: 1,
          method: "GET",
        });
      }
    });
  });
  ```

  ==注意==：nodejs中使用相对路径是不可靠的，尽量使用`__dirname`和`path.jion`组合成绝对路径

## 8-23

==BUG==：之前上传图片的请求中我使用了手动生成的uuid，这造成了一个问题：在添加商品弹窗中对刚刚上传的图片进行删除时，删除请求会失效。原因是删除接口需要获取fileList中图片的uuid，而它是后台存入数据库的，对于刚上传的图片来说并不存在这一属性！

我尝试新上传图片后点击删除图片，发现发送给后端的请求体file打印为：

```json
{
    "status": "ready",
    "name": "图片.jpg",
    "size": 83749,
    "percentage": 0,
    "uid": 1661328366444,
    "raw": File,
    "url": "blob:http://localhost:8080/6a627c78-a059-4b99-89b0-b0340b8549a3"
}
```

如果想实现检索到后端数据库中的图片并删除，只能依靠这些字段。但看起来其中有效的只有`name`和`uid`，`name`在转为FormData传给后端之后会被multer变为 `originalname` ，致命的是文件名包含中文会有乱码，暂时不考虑。

因此，我尝试了使用请求自带的uid作为图片的key并以此命名图片，但发现uid会随着请求变化，依赖后发送的请求uid并不能检索到后台的图片……



**新功能**

图片列表图片回显

- 上传图片时将图片url加入数据库，传回数据的url字段会被elementui自动渲染为图片

  ```
  http://${host}:3000/static/${req.file.filename}
  ```

- 在后台项目中挂载静态资源upload文件夹

  ```js
  // app.js
  app.use("/static", express.static("upload"));
  ```

  

富文本编译器

使用wangEditor：

>  [wangEditor](https://www.wangeditor.com/v5/getting-started.html) 

- 安装

  ```
  yarn add @wangeditor/editor
  yarn add @wangeditor/editor-for-vue
  ```

- 新建wangeditor组件作为CommonForm子组件

  - 使用模板

    ```vue
    <template>
        <div style="border: 1px solid #ccc;">
        <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :defaultConfig="toolbarConfig"
                :mode="mode"
            />
            <Editor
                style="height: 500px; overflow-y: hidden;"
                v-model="html"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="onCreated"
            />
        </div>
    </template>
    <script>
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    
    export default {
        components: { Editor, Toolbar },
        data() {
            return {
                editor: null,
                html: '<p>hello</p>',
                toolbarConfig: { },
                editorConfig: { placeholder: '请输入内容...' },
                mode: 'default', // or 'simple'
            }
        },
        methods: {
            onCreated(editor) {
                this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
            },
        },
        mounted() {
            // 模拟 ajax 请求，异步渲染编辑器
            setTimeout(() => {
                this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
            }, 1500)
        },
        beforeDestroy() {
            const editor = this.editor
            if (editor == null) return
            editordestroy() // 组件销毁时，及时销毁编辑器
        }
    }
    </script>
    
    <style src="@wangeditor/editor/dist/css/style.css"></style>
    ```
    
    

## 8-24

为解决昨天的bug，我只能尝试先解决乱码的问题。用了一整天时间排除了各个环节的问题之后，基本锁定这是multer中间件的问题：文件的`name`属性经过multer会转为`originalname`，而它的编码默认为`latin1`，这是乱码的根源所在。github上有不少国人提了issue（ [Wrong encoding in originalname containing unicode characters · Issue #962 · expressjs/multer (github.com)](https://github.com/expressjs/multer/issues/962) ）。

直到我在multer的github中发现今年6月有人提了一个PR [ Pull Request #1102 · expressjs/multer (github.com)](https://github.com/expressjs/multer/pull/1102) 提议修复此问题。在评论区PR提出者通过配置multer的`fileFilter`暂时修复了这个问题：

```js
function fileFilter(req, file, cb) {
  file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
  cb(null, true);
}
const upload = multer({ storage: storage, fileFilter });
```

`fileFilter`是multer的配置项之一（还包含 limits、preservePath 和 storage ），它本用于控制储存文件的条件。通过在其中操作Buffer对file的相应属性进行转码，巧妙实现了在储存之前处理文件名避免乱码的效果。 [expressjs/multer: Node.js middleware for handling `multipart/form-data`. (github.com)](https://github.com/expressjs/multer#multeropts) 

关于multer的编码问题，我还了解到，multer是基于busboy开发的，而考虑到浏览器并不总是支持utf8编码的header，busboy的维护者将默认编码从utf8改为latin7，但允许开发者更改此项设置。而multer的维护者并没有将默认编码改回utf8，甚至不允许开发者修改编码方式，直到现在这一PR依然没有被merge。信息来源 [Fix UTF-8 file name encoding for uploads (fixes #3013) by eliandoran · Pull Request #3058 · zadam/trilium (github.com)](https://github.com/zadam/trilium/pull/3058) 。



有了正确originalname的支持，之前的代码会变得很简单

```js
/**
 * 上传图片
 */
router.post("/uploadGoodsPics", upload.single("file"), (req, res) => {
  // 使用json解析FormData数据
  const { originalname, size } = JSON.parse(
    JSON.stringify(req.file)
  );
  const goodsId = JSON.parse(JSON.stringify(req.body.goodsId));

  // 图片信息储存至数据库
  let sql_code = "0";
  const sql = `insert into goodspic values ('${goodsId}','${req.file.originalname}','${req.file.mimetype}','${req.file.size}','http://${host}:3000/static/${req.file.filename}')`;
  db.queryDB(sql, (err, data) => {
    if (err) {
      console.log(`query error: ${err}`);
      return;
    } else {
      sql_code = "1";
    }
  });

  return res.json({
    res_code: "1",
    sql_code,
    originalname,
    size,
    url: `http://${host}:3000/static/${req.file.filename}`
  });
});

/**
 * 删除已上传的图片
 */
router.get("/removeGoodsPics", (req, res) => {
  const sql = `delete from goodspic where originalname='${req.query.name}'`;

  db.queryDB(sql, (err, data) => {
    if (err) {
      console.log(`query error: ${err}`);
      return;
    } else {
      // 使用fs删除文件
      fs.unlink(
        path.join(__dirname, `../upload/${req.query.name}`),
        (e) => {}
      );
      return res.json({
        code: 1,
        method: "GET",
        query: req.query,
      });
    }
  });
});
```

## 8-25

改变8-23富文本编译器版本

## 8-29

完善富文本编译器

- 配置菜单栏

  ```
  toolbarConfig: {
    // 菜单栏配置
    toolbarKeys: [
      "bold",
      "italic",
      "underline",
      "color",
      "headerSelect",
      "|",
      "justifyLeft",
      "justifyCenter",
      "justifyRight",
      "divider",
      "|",
      "clearStyle",
      "undo",
      "redo",
      "fullScreen",
    ],
  },
  ```

- 添加onchange处理函数，将编译器中的内容发送至父组件

  为使html代码和商品列表中显示的商品描述（纯文本）分离，原有的description属性更新为descText和descHtml两者独立显示。

  ```js
  onChange(editor) {
    this.text = editor.getText();
    this.$emit("sendHtml", { html: this.html, text: this.text });
  },
  ```

- 为使表格中的商品描述内容与编译器中显式的内容同步，需要将后台请求的商品描述数据传入wangeditor组件，并加入侦听属性中实现动态更新：

  ```js
  // WangEditor.vue
  props: { value: String },
  // ...
  watch: {
    value(newVal, oldVal) {
      this.html = newVal;
    },
  },
  ```

- 在父组件中使用组件

  ```vue
  // CommonForm.vue
  <wang-editor
    v-if="item.type === 'editor'"
    // 这里不使用v-model
    :value="form.descHtml"
    @send="send"
  >
  </wang-editor>
    // ...
  methods: {
    send(val) {
      this.form.descText = val.text;
      this.form.descHtml = val.html;
    },
  },
  ```


## 8-30

图片预览功能

- 在CommonTable组件中加入预览图片的列，并在其中使用elementui的弹出框popover。使用v-slot作用域插槽获取table当前行的信息

  ```html
  <!-- 图片预览 -->
  <el-table-column label="商品图片" width="80">
    <template v-slot:default="operate">
      <el-popover
        placement="bottom"
        width="200"
        trigger="click"
        content="暂无图片"
      >
        <el-button
          size="mini"
          slot="reference"
          @click="handlePreview(operate.row)"
          >预览</el-button
        >
      </el-popover>
    </template>
  </el-table-column>
  ```

- 在弹出框中使用轮播图

  ```html
  <el-carousel
    trigger="click"
    height="180px"
    :autoplay="false"
    :loop="false"
    indicator-position="outside"
  >
    <el-carousel-item v-for="(item, index) in urls" :key="index">
      <el-image :src="item" fit="contain"></el-image>
    </el-carousel-item>
  </el-carousel>
  ```

  其中urls为vuex的state `fileList` 中的内容，可直接为弹出框的点击事件绑定一个更新state `fileList` 的处理函数 `handlePreview()` ，传入当前table行的id数据，异步更新vuex中的fileList。

  ```js
  handlePreview(row) {
    // 清空urls
    this.urls = []
    this.$store.commit("changeGoodsId", row.id);
    this.$store.dispatch("asyncGetGoodsPicsList");
  },
  ```

  但直接这样做是不起作用的，原因在于vuex的更新请求是异步完成的，弹出框组件渲染完成之后fileList才会更新。这时 `$nextTick` `async await` 等异步处理方式都不起作用。我们可以用监听vuex state的方式，等fieList改变之后再对urls数据作处理：

  ```js
  // CommonTable.vue
  computed: {
    getfileList() {
      return this.$store.state.Mall.fileList;
    },
  },
  // fileList是由vuex异步加载的，组件渲染时state为空，需要额外监听vuex中的state
  watch: {
    getfileList(val) {
      val.forEach((element) => {
        this.urls.push(element.url);
      });
    },
  },
  ```

  这时点击预览按钮就会更新轮播图内容了。

  

==BUG==：遇到了数据库连接过多的问题

```
code: 'ER_CON_COUNT_ERROR',
errno: 1040,
sqlMessage: 'Too many connections', 
```

先登录数据库查看连接情况

>  [查看mysql连接数和状态 - 小白827 - 博客园 (cnblogs.com)](https://www.cnblogs.com/pegasus827/p/8692290.html) 

```
mysql -uroot -p
show status like 'Connections'
show status like 'Threads_connected'
```

发现有很多休眠的连接未释放！

MySQL 数据库有一个属性 wait_timeout 就是 sleep 连接最大存活时间，默认是 28800 s，换算成小时就是 8 小时，严重影响性能

查看休眠存活时间

```
show global variables like '%wait_timeout';

# 显示 wait_timeout             | 28800  
```

修改为600s

```
set GLOBAL  wait_timeout=600;
```

现在休眠超过10min的连接会自动被清理



## 9-1

商品无可预览图片加入暂无图片占位文字

- 模板中加入v-if-else判断

  ```html
  <!-- 轮播图 -->
  <el-carousel
    trigger="click"
    height="180px"
    :autoplay="false"
    :loop="false"
    indicator-position="outside"
    v-if="isShow"
  >
    <el-carousel-item v-for="(item, index) in urls" :key="index">
      <el-image :src="item" fit="contain"> </el-image>
    </el-carousel-item>
  </el-carousel>
  <!-- 占位 -->
  <div v-else class="popover-placeholder">
    <p>暂无图片</p>
  </div>
  ```

- 在侦听器中监听urls是否存在内容，决定显示内容

  ```js
  watch: {
    getfileList(val) {
      val.forEach((element) => {
        this.urls.push(element.url);
      });
      this.isShow = !(this.urls.length == 0);
    },
  },
  ```

  