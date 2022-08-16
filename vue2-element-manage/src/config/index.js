export default {
    baseURL: {
        /**
         * - baseURL会拼接在每个axios请求之前，可触发devServer代理实现开发环境的跨域
         * - baseURL不能为绝对路径，会导致devServer.proxy失效
         * - 如果项目部署路径不在根目录下
         *      baseURL必须带 / 前缀
         *      例如项目部署在 https://example.com/licenses/ ，发送 axios.get('/licenses') 请求
         *      baseURL = '/api' => https://example.com/api/licenses
         *      baseURL = 'api' => https://example.com/licenses/api/licenses
         */
        // 开发环境
        dev: '/api',
        // 生产环境
        prod: '/api'
    }
}