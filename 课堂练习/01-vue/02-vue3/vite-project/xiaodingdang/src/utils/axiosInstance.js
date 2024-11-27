import axios from "axios";

// 创建一个axios拦截对象
// //创建一个axios拦截器进行配置
const axiosInstance = axios.create({
    timeout: 5000, //响应时长
    baseURL: 'http://127.0.0.1:8900/'//配置服务器地址
});


axiosInstance.interceptors.response.use((resp) => {
    //通过响应拦截其把响应对象中的data作为实际响应结果返回
    return resp.data;
},
    error => {
        console.log('请求失败', error);

    }
);

export default axiosInstance;