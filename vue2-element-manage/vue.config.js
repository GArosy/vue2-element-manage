const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/',  // 公共路径
  devServer: {  // 配置服务器
    port: 8080, // 端口号
    proxy: {  // 前后端分离，需要配置跨域（代理方法）
      '/api': { // 如果请求地址以api开头，就触发代理机制
        target: 'http://localhost:3000',  // 要代理的接口地址
        ws: true,
        changeOrigin: true,
        // pathRewrite: {  // 重写路径，将url中的前缀替换后再发送请求
        //   '^/api': ''
        // }
      }
    }
  }
})
