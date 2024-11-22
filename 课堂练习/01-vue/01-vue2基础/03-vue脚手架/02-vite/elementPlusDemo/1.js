import { useRouter } from 'vue-router';
const store = userLoginInfo();
const submitForm = (formEl) => {
    if (!formEl) return;
    formEl.validate(async (isValid, invalidFields) => {
        if (isValid) {
            const loading = ElLoading.service({
                lock: true,
                text: '加载中......',
                background: 'rgba(0,0,0,0.7)'
            });
            let results = await
                Api.adminInfo.checkLogin(formData);
            loading.close();
            //将登录成功之后返回的登录信息和token保存到store当中
            if (results.status == "success") {
                ElMessage.success(results.msg);
                store.userInfo = results.data.loginUserInfo;
                store.userToken = results.data.token;
                router.push({ name: 'home' }); //添加push方法实现跳转
            } else if (results.status == "fail") {
                ElMessage({
                    message: results.msg,
                    type: "error"
                });
            } else {
                ElMessage.error('响应超时');
            }
        } else {
            console.log(invalidFields);
            return false;
        }
    });
};