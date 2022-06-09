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

  - 概念：SPA（单页应用，可以实现更流畅的交互体验，缺点是SEO差）衍生出的需求，伴随MVVM出现。其本质是检测url变化，截获url地址后匹配路由规则，实现无需刷新即可跳转页面。在SPA项目中，不同功能之间的切换要通过前端路由解决。

  - 工作方式：