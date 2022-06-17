<template>
    <!-- vue中，在标签添加 ref Attribute，就可以在js中通过 this.$refs.name 访问到对应的dom元素 -->
    <div ref="echarts"></div>
</template>

<script>
import * as ECharts from 'echarts';
export default {
    props: {
        // 判断图表类型是否为坐标轴类型（折线图/柱状图）
        isAxisChart: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object,
            default() {
                return {
                    xData: [],
                    series
                }
            }
        }
    },
    data() {
        return {
            // 折线图/柱状图配置
            axisOption: {
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
            },
            // 饼状图配置
            pieOption: {
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
            },
            echartInstance: null
        }
    },
    watch: {
        // 监听charData数据
        charData: {
            handler() {
                this.initEcharts()
            },
            // 深度监听
            deep: true
        }
    },
    methods: {
        // 初始化echarts
        initEcharts() {
            this.initCharData()
            if (this.echartInstance) {
                this.echartInstance.setOption(this.options)
            } else {
                this.echartInstance = ECharts.init(this.$refs.echarts)
                this.echartInstance.setOption(this.options)
            }
        },
        // 传入echarts数据
        initCharData() {
            if (this.isAxisChart) {
                this.axisOption.xAxis = this.charData.xDate;
                this.axisOption.series = this.charData.series;
            } else {
                this.pieOption.series = this.charData.series;
            }
        }
    },
    computed: {
        options() {
            return this.isAxisChart ? this.axisOption : this.pieOption
        }
    }
}
</script>