import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://www.softeem.xin:9544',
    timeout: 2000
});


// 请求拦截
axiosInstance.interceptors.request.use(config => {
    // ....
    return config;
});


// 响应拦截
axiosInstance.interceptors.response.use(resp => {
    return resp.data;
}, error => {
    return error;
}
);


export default axiosInstance;