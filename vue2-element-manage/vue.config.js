const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/vue-manage/',  // 公共路径
  devServer: {  // 配置服务器
    port: 8080, // 端口号
    open: true, // 自动打开浏览器
  }
})
