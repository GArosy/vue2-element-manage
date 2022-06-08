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
  
  - 完整引入：写入main.js
  
    ```js
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    
    Vue.use(ElementUI);
    
    ```
  
  - 使用单文件组件