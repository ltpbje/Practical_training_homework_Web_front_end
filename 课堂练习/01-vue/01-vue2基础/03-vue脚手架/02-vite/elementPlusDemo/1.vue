<template>
    <div ref="chart" style="width:100%;height:700px;"></div>
</template>
<script setup>
import * as echarts from '../../node_modules/echarts';
import chinaMap from '../utils/chinaMap.json';
import { ref, onMounted } from 'vue';
const chart = ref(null);
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
                map: 'china'
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    });
};
onMounted(() => {
    init();
});
</script>