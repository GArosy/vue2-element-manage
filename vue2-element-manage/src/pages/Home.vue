<template>
    <div class="home">
        <el-row class="home" :gutter="20">
            <!-- 第一列 -->
            <!-- 总高16+1+26=44rem -->
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
                <el-card shadow="hover" style="margin-top:1rem; height: 27rem;" :span="8">
                    <el-table :data="tableData">
                        <el-table-column v-for="(value, name) in tableLabel" :key="name" :prop="name" :label="value">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <!-- 第二列 -->
            <!-- 总高5+1+5+1+16+1+15=44rem -->
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
                <!-- 折线图 -->
                <el-card shadow="hover" class="graph-line">
                    <!-- vue中，在标签添加 ref Attribute，就可以在js中通过 this.$refs.name 访问到对应的dom元素 -->
                    <!-- echarts组件需要手动设置高度，否则无法显示 -->
                    <!-- <div ref="line" style="height: 16rem;"></div> -->
                    <echarts-template :chartData="echartsData.lineData" style="height: 16rem;"></echarts-template>
                </el-card>
                <div class="graph">
                    <!-- 柱状图 -->
                    <el-card shadow="hover" class="graph-col" :span="8">
                        <!-- <div ref="column" style="height: 15rem;"></div> -->
                        <echarts-template :chartData="echartsData.colData" style="height: 15rem;"></echarts-template>
                    </el-card>
                    <!-- 饼状图 -->
                    <el-card shadow="hover" class="graph-pie" :span="8">
                        <!-- <div ref="pie" style="height: 15rem;"></div> -->
                        <echarts-template :chartData="echartsData.pieData" :isAxisChart="false" style="height: 15rem;"></echarts-template>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getData } from '@/api/data';
// import * as echarts from 'echarts';
import EchartsTemplate from '@/components/EchartsTemplate.vue';

export default {
    name: 'home',
    data() {
        return {
            userImg: require('@/assets/logo.png'),
            tableData: [],
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
            ],
            // 图表数据
            echartsData: {
                lineData: {
                    xData: [],
                    series: []
                },
                colData: {
                    xData: [],
                    series: []
                },
                pieData: {
                    series: []
                }
            }
        }
    },
    components: {
        EchartsTemplate
    },
    mounted() {
        getData().then(res => {
            const { code, data } = res.data;
            if (code === 20000) {
                // 处理接口传来的数据

                // 折线图
                this.tableData = data.tableData;
                const order = data.orderData;
                // 取出data的keys
                const keyArray = Object.keys(order.data[0]);
                // 构建图表所需的series
                const orderSeries = [];
                const orderXData = order.date;
                keyArray.forEach((key) => {
                    orderSeries.push({
                        name: key,
                        data: order.data.map(item => item[key]),
                        type: 'line'
                    })
                })
                /*
                const lineOption = {
                    xAxis: {
                        data: order.date
                    },
                    yAxis: {},
                    // 图例
                    legend: {
                        data: keyArray
                    },
                    series,
                    // 配置提示框组件，实现悬停弹窗
                    tooltip: {
                        show: true,          // 是否显示提示框组件
                        trigger: 'axis',    // 触发类型:item/axis/none
                        axisPointer: {      // 配置坐标轴指示器
                            type: 'line'
                        }
                    }
                }
                */
                this.echartsData.lineData.xData = orderXData;
                this.echartsData.lineData.series = orderSeries;
                // // 基于准备好的dom，初始化echarts实例(使用svg渲染)
                // lineEcharts = echarts.init(this.$refs.line, null, { renderer: 'svg' });
                // // 绘制图表
                // lineEcharts.setOption(lineOption);

                // 柱状图
                /* const columnOption = {
                    xAxis: {
                        type: 'category',
                        data: data.userData.map(item => item.data),
                        axisLine: {
                            lineStyle: {
                                color: '#17b3c3'
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            color: '#333'
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#17b3c3'
                            }
                        }
                    },
                    legend: {
                        textStyle: {
                            color: '#333'
                        }
                    },
                    grid: {
                        left: '20%'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    color: ['#2ec7c9', '#b6a2de'],
                    series: [
                        {
                            name: '新增用户',
                            data: data.userData.map(item => item.new),
                            type: 'bar'
                        },
                        {
                            name: '活跃用户',
                            data: data.userData.map(item => item.active),
                            type: 'bar'
                        }
                    ]
                } */

                this.echartsData.colData.xData = data.userData.map(item => item.data);
                this.echartsData.colData.series = [
                    {
                        name: '新增用户',
                        data: data.userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: data.userData.map(item => item.active),
                        type: 'bar'
                    }
                ];
                // columnEcharts = echarts.init(this.$refs.column, null, { renderer: 'svg' });
                // columnEcharts.setOption(columnOption);

                // 饼状图
                /* const pieOption = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: '0%'
                    },
                    series: [
                        {
                            name: '市场占比',
                            data: data.videoData,
                            type: 'pie',
                            top: '-10px',
                            radius: ['30%', '60%'],
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '16px'
                                }
                            }
                        }
                    ]
                } */
                this.echartsData.pieData.series = [
                    {
                        name: '市场占比',
                        data: data.videoData,
                        type: 'pie',
                        top: '-10px',
                        radius: ['30%', '60%'],
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '16px'
                            }
                        }
                    }
                ];

                // pieEcharts = echarts.init(this.$refs.pie, null, { renderer: 'svg' });
                // pieEcharts.setOption(pieOption);
            }
            console.log(data);
        })
        // 图表随页面尺寸变化
        // window.addEventListener('resize', () => {
        //     lineEcharts.resize();
        //     columnEcharts.resize();
        //     pieEcharts.resize();
        // })
    },
}
</script>