let option = {
    title: {
        text: "中国地图"
    },
    series: [
        {
            type: 'map',
            map: 'china',
            data: [
                { name: "河南省", value: '30000' },
                { name: "西藏自治区", value: '10000' }
            ],
            label: {
                //对地图文字设置
                show: true, //是否显示地图文字
                color: '#f00', //字体颜色
                fontSize: 14
            },
            zoom: 1.2,
            itemStyle: {
                borderColor: '#0f0',
                borderWidth: 2,
                areaColor: '#00f'
            }
        }
    ],
    visualMap: { //虚拟地图热力分段设置
        min: 800,
        max: 30000,
        text: ['high', 'low'],
        realTime: false,
        inRange: {
            color: ['lightskyblue', 'yellow', 'red']
        }
    }
};