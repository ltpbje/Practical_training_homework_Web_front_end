// 将手动粘贴复制到本地的服务器数据，进行反序列化操作
// 
const data1 = {
    "reason": "查询成功!",
    "result": {
        "city": "北京",
        "realtime": {
            "temperature": "12",
            "humidity": "70",
            "info": "阴",
            "wid": "02",
            "direct": "东北风",
            "power": "2级",
            "aqi": "52"
        },
        "future": [
            {
                "date": "2024-10-30",
                "temperature": "10\/17℃",
                "weather": "多云转阴",
                "wid": {
                    "day": "01",
                    "night": "02"
                },
                "direct": "东北风转北风"
            },
            {
                "date": "2024-10-31",
                "temperature": "8\/16℃",
                "weather": "多云转晴",
                "wid": {
                    "day": "01",
                    "night": "00"
                },
                "direct": "西北风转北风"
            },
            {
                "date": "2024-11-01",
                "temperature": "7\/19℃",
                "weather": "晴转多云",
                "wid": {
                    "day": "00",
                    "night": "01"
                },
                "direct": "东北风转西南风"
            },
            {
                "date": "2024-11-02",
                "temperature": "7\/16℃",
                "weather": "多云转阴",
                "wid": {
                    "day": "01",
                    "night": "02"
                },
                "direct": "南风"
            },
            {
                "date": "2024-11-03",
                "temperature": "2\/16℃",
                "weather": "多云转晴",
                "wid": {
                    "day": "01",
                    "night": "00"
                },
                "direct": "北风"
            }
        ]
    },
    "error_code": 0
};

const checkWeather = () => {
    var result = JSON.parse(JSON.stringify(data1));
    return result;
};



