import Mock from 'mockjs';

let list = [];
export default {
    getStaticalData: () => {
        for (let index = 0; index < 7; index++) {
            list.push(
                Mock.mock({
                    苹果: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    oppo: Mock.Random.float(100, 8000, 0, 0),
                    华为: Mock.Random.float(100, 8000, 0, 0),
                    小米: Mock.Random.float(100, 8000, 0, 0),
                    三星: Mock.Random.float(100, 8000, 0, 0),
                })
            )
        }
        return {
            code: 20000,
            data: {
                // 饼图
                videoData: [
                    {
                        name: '苹果',
                        value: 6999
                    },
                    {
                        name: 'vivo',
                        value: 1500
                    },
                    {
                        name: 'oppo',
                        value: 1999
                    },
                    {
                        name: '华为',
                        value: 4999
                    },
                    {
                        name: '小米',
                        value: 2999
                    },
                    {
                        name: '三星',
                        value: 5999
                    }
                ],
                // 柱状图
                userData: [
                    {
                        data: '周一',
                        new: 40,
                        active: 200
                    },
                    {
                        data: '周二',
                        new: 70,
                        active: 300
                    },
                    {
                        data: '周三',
                        new: 60,
                        active: 550
                    },
                    {
                        data: '周四',
                        new: 120,
                        active: 600
                    },
                    {
                        data: '周五',
                        new: 180,
                        active: 750
                    },
                    {
                        data: '周六',
                        new: 160,
                        active: 700
                    },
                    {
                        data: '周日',
                        new: 150,
                        active: 800
                    },
                ],
                // 折线图
                orderData: {
                    date: ['20221001', '20221002','20221003', '20221004','20221005', '20221006','2022107'],
                    data: list
                },
                // 表格
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
                ]
            }
        }

    }
}