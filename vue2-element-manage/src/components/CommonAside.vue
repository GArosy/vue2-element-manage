<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3>
        <!-- 一级菜单 -->
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.path" :index="item.path + ''">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <!-- 二级菜单 -->
        <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.path + ''">
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
    </el-menu>
</template>

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

<script>
export default {
    data() {
        return {
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
                            url: "Other/PageOne",
                        },
                        {
                            path: "/page2",
                            name: "page2",
                            label: "页面2",
                            icon: "setting",
                            url: "Other/PageTwo",
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu(item) {
            // console.log(this.$router);
            this.$router.push({
                name: item.name
            }).catch(e => { })
        }
    },
    computed: {
        noChildren() {
            return this.menu.filter((item) => !item.children);
        },
        hasChildren() {
            return this.menu.filter((item) => item.children);
        },
        isCollapse() {
            return this.$store.state.Tab.isCollapse
        }
    },
};
</script>
