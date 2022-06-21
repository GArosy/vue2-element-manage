import store from ".";

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
        ],
        currentMenu: null
    },
    // 定义方法
    mutations: {
        // 侧边栏伸缩
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        // 选择面包屑
        selectMenu(state, val) {
            if (val.name !== 'home') {
                // 
                store.currentMenu = val;
                // 查找tabsList中是否已存在传入的name
                const result = store.tabsList.findIndex(item => item.name === val.name);
                if (result !== -1) {
                    // 如果不存在val.name，则添加
                    state.tabsList.push(val);
                }
            } else {
                state.currentMenu = null;
            }
        }
    }
}