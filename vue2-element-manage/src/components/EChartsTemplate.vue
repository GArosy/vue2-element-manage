<template>
    <!-- vue中，在标签添加 ref Attribute，就可以在js中通过 this.$refs.name 访问到对应的dom元素 -->
    <div ref="echart" style="height: 15rem;"></div>
</template>

<script>

import * as echarts from 'echarts';
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
                    series: []
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
                    data: [],
                    axisLine: {
                        lineStyle: {
                            color: '#17b3a3'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        color: '#333'
                    }
                },
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#17b3c3'
                            }
                        }
                    }
                ],
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
                series: []
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
                        data: [],
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
        chartData: {
            handler() {
                this.initEcharts();
                // console.log(this.chartData);
            },
            // 深度监听
            deep: true
        }
    },
    methods: {
        // 初始化echarts
        initEcharts() {
            this.initChartData()
            if (this.echartInstance) {
                this.echartInstance.setOption(this.options)
            } else {
                this.echartInstance = echarts.init(this.$refs.echart)
                this.echartInstance.setOption(this.options)
            }
            // console.log(this.axisOption);
            // 图表随页面大小变化
            window.addEventListener('resize', () => {
                // console.log(this.echartInstance);
                if (this.echartInstance) {
                    this.echartInstance.resize();
                    // console.log('window resized');
                }
            })
        },
        // 判断图表类型，为options传入数据
        initChartData() {
            if (this.isAxisChart) {
                this.axisOption.xAxis.data = this.chartData.xData;
                this.axisOption.series = this.chartData.series;
            } else {
                this.pieOption.series = this.chartData.series;
            }
        }
    },
    computed: {
        options() {
            return this.isAxisChart ? this.axisOption : this.pieOption;
        }
    },
}
</script>