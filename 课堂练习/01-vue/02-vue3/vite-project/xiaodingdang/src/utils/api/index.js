import axiosInstance from "../axiosInstance";
// 获取轮播数据

export const getSwiperData = () => axiosInstance.get('/category');


// 请求商家列表数据的方法
export const shopList = () => axiosInstance.get('/shops');