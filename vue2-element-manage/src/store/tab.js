export default {
    state: {
        isCollapse: false,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ]
    },
    // 定义方法
    mutations: {
        collapseMenu (state) {
            state.isCollapse = !state.isCollapse;
        }
    }
}