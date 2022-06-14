<template>
    <div class="home">
        <el-row class="home" :gutter="20">
            <!-- 第一列 -->
            <!-- 总高16+1+24=41rem -->
            <el-col style="margin-top: 20px;" :span="8">
                <!-- card组件-用户信息 -->
                <el-card shadow="hover" style="height: 16rem;">
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
                <!-- card组件-表格 -->
                <el-card shadow="hover" style="margin-top:1rem; height: 24rem;" :span="8">
                    <el-table :data="tableData">
                        <el-table-column v-for="(value, name) in tableLabel" :key="name" :prop="name" :label="value">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <!-- 第二列 -->
            <!-- 总高5+1+5+1+16+1+12=41rem -->
            <el-col style="margin-top: 20px;" :span="16">
                <!-- card组件-订单 -->
                <div class="count">
                    <el-card shadow="hover" v-for="item in countData" :key="item.name" style="padding: 0;">
                        <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                        <div class="detail">
                            <p class="num">￥{{ item.value }}</p>
                            <p class="text">{{ item.name }}</p>
                        </div>
                    </el-card>
                </div>
                <!-- card组件-图表 -->
                <el-card shadow="hover" class="graph-line"></el-card>
                <div class="graph">
                    <el-card shadow="hover" class="graph-col" :span="8"></el-card>
                    <el-card shadow="hover" class="graph-pie" :span="8"></el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            userImg: require('@/assets/logo.png'),
            tableData: [
                {
                    name: 'oppo',
                    todayBuy: 100,
                    monthBuy: 200,
                    totalBuy: 800
                },
                {
                    name: 'vivo',
                    todayBuy: 100,
                    monthBuy: 200,
                    totalBuy: 800
                },
                {
                    name: '苹果',
                    todayBuy: 100,
                    monthBuy: 200,
                    totalBuy: 800
                },
                {
                    name: '小米',
                    todayBuy: 100,
                    monthBuy: 200,
                    totalBuy: 800
                },
                {
                    name: '华为',
                    todayBuy: 100,
                    monthBuy: 200,
                    totalBuy: 800
                },
                {
                    name: '三星',
                    todayBuy: 100,
                    monthBuy: 200,
                    totalBuy: 800
                }
            ],
            tableLabel: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总计购买'
            },
            countData: [
                {
                    name: '今日支付订单',
                    value: 700,
                    icon: 'success',
                    color: '#2ec7c9'
                },
                {
                    name: '今日未支付订单',
                    value: 500,
                    icon: 's-goods',
                    color: '#ffb980'
                },
                {
                    name: '今日收藏订单',
                    value: 800,
                    icon: 'star-on',
                    color: '#5ab1ef'
                },
                {
                    name: '本月支付订单',
                    value: 1700,
                    icon: 'success',
                    color: '#2ec7c9'
                },
                {
                    name: '本月未支付订单',
                    value: 1500,
                    icon: 's-goods',
                    color: '#ffb980'
                },
                {
                    name: '本月收藏订单',
                    value: 1800,
                    icon: 'star-on',
                    color: '#5ab1ef'
                },
            ]
        }
    },
    mounted() {
        this.$http.get('/user?ID=12345')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    },
}
</script>