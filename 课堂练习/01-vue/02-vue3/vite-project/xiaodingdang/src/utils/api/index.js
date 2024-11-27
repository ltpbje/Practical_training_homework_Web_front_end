import axiosInstance from "../axiosInstance";
// 获取轮播数据

export const getSwiperData = () => axiosInstance.get('/category');