import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://www.softeem.xin:9544',
    timeout: 2000
});