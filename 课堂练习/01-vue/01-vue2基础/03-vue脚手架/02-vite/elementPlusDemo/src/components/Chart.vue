<template>
    <div ref="chart" style="width: 100%;min-height: 300px;"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
const chart = ref();
const props = defineProps({
    chartData: {
        type: Array,
        default: () => [10, 20, 30]
    },
    chartType: {
        type: String,
        default: () => 'line'
    },
    categoryType: {
        type: Array,
        default: () => ['a', 'b', 'c']
    }


});
const init = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(chart.value);
    let option = {
        title: {
            text: ''
        },
        xAxis: {
            data: props.categoryType
        },
        tooltip: {},
        yAxis: {

        },
        series: [
            {
                name: '销量',
                type: props.chartType,
                data: props.chartData,
                smooth: true
            },
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize();
    });
    // 绘制图表
    // myChart.setOption({
    //     title: {
    //         text: ''
    //     },
    //     tooltip: {},
    //     xAxis: {
    //         type: 'category',
    //         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    //     },
    //     yAxis: {},
    //     series: [
    //         {
    //             name: '销量',
    //             type: 'bar',
    //             data: [5, 20, 36, 10, 10, 20]
    //         }
    //     ]
    // });
};
onMounted(() => {
    init();
});
</script>

<style scoped></style>