import axiosInstance from "../utils/axiosInstance";


const adminInfo = {
    checkLogin({ zh, password }) {
        return axiosInstance.post("/userInfo/checkLogin", {
            zh, password
        });
    }
};

export default adminInfo;