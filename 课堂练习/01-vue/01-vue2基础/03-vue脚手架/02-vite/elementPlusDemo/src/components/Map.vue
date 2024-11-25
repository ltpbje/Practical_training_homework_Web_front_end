<template>
    <div ref="chart" style="width: 100%;height:700px;">

    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import chinaMap from '../utils/chinaMap.json';
import { ref, onMounted } from 'vue';
const chart = ref();
const init = () => {
    const myChart = echarts.init(chart.value);
    echarts.registerMap('china', chinaMap);
    let option = {
        title: {
            text: "中国地图"
        },
        series: [
            {
                type: 'map',
                map: 'china',
                data: [
                    { name: '河南省', value: '30000' },
                    { name: '西藏自治区', value: '10' },
                ],
                label: {
                    // // 对地图文字设置
                    // show: true,//是否显示地图文字
                    // color: '#f00',
                    // fontSize: 12
                },
                zoom: 1.2,
                itemStyle: {
                    borderColor: '#0f0',
                    borderwidth: 2,
                    // areaColor: '#00f'
                }
            }
        ],
        visualMap: {
            //虚拟地图热力分段设置
            min: 800,
            max: 30000,
            text: ['high', 'low'],
            realTime: false,
            inRange: {
                color: ['lightskyblue', 'yellow', 'red']
            }
        }
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => {
        myChart.resize();
    });
};
onMounted(() => {
    init();
});
</script>

<style scoped></style>