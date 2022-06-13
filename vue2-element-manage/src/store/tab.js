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