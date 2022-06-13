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

<script>
export default {
    name: 'home',
    data() {
        return {
            userImg: require('@/assets/logo.png')
        }
    }
}
</script>