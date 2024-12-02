import axiosInstance from "../axiosInstance";
// 获取轮播数据

export const getSwiperData = () => axiosInstance.get('/category');


// 请求商家列表数据的方法
export const shopList = () => axiosInstance.get('/shops');

export const yzm = () => axiosInstance.get('/get_tell_mark');



export const messageLogin = ({ tell, mark1 }) => axiosInstance.post('/login_tell', {
    tell,
    mark1
});


export const yzmCode = () => axiosInstance.get('/get_code');

export const pwdLogin = ({ username, password, mark2 }) => axiosInstance.post('/login_pwd', {
    username,
    password,
    mark2
});
