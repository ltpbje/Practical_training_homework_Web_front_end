const props = defineProps({
    chartData: {
        type: Array,
        default: () => [10, 20, 30, 40, 50]
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
    const myChart = echarts.init(chart.value);
    let option = {
        xAxis: {
            type: 'category',
            data: props.categoryType
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: props.chartData,
                type: props.chartType
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => {
        myChart.resize();
    });
};