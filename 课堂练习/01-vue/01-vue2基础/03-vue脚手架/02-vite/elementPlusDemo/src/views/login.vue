<script setup>
import PageView from './PageView.vue';
import { reactive, ref } from 'vue';
import Api from '../api';
import { userLoginInfo } from '../store/login';

// 定义一个名为store的常量，其值为调用userLoginInfo()函数的返回值
const store = userLoginInfo();
const changeState = () => {
    // store.$patch({
    //     count: store.count + 1,
    //     age: 20
    // });
    // store.$patch((state) => {
    //     state.list.push(6);
    // });
    store.$state = { counter: 12, name: 'zhangsan' };

};
const formData = reactive({
    zh: '',
    password: ''
});
const checkName = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('必须输入用户名'));
    } else if (value.length <= 3) {
        return callback(new Error('用户名需要大于3位'));
    } else {
        //最后一定要在else里面执行一个callback，不然会卡验证状态
        return callback();
    }
};
const rules = reactive({
    zh: [
        {
            validator: checkName,
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '必须输入密码',
            trigger: 'blur'
        }
    ]
});

//获取整个form作为DoM对象，需要作为实参传入给发送按钮的点击方法
const ruleFormRef = ref();
//发送表单信息的方法
const submitForm = (formEl) => {
    //验证是否由form表单传入，如果没有直接return打断函数的后续执行
    if (!formEl) return;
    // form表单域中有一个validate方法用来验证整个表单中的数据是否通过校验，并且传入一个回调
    // 其中回调接收的第一个参数传入当前表单域中的所有表单数据是否通过校验，第二个参数传入的是没有通过验证的表单项数据
    formEl.validate(async (isValid, invalidFields) => {
        if (isValid) {
            console.log('登录成功');
            let results = await Api.adminInfo.checkLogin(formData);
            console.log(results);

            //将登录成功之后返回的登录信息和token保存到store当中
            store.userInfo = results.data.loginUserInfo;
            store.userToken = results.data.token;

        } else {
            console.log('登录失败', invalidFields);
            return false;
        }
    });
};
</script>
<template>
    <PageView class="flex-row j-c a-c">
        <button @click="changeState">demo</button>
        <div class="login">
            <el-form ref="ruleFormRef" :model="formData" label-width="80px" :rules="rules" status-icon>
                <el-form-item label="用户名" prop="zh">
                    <el-input v-model="formData.zh" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="formData.password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </PageView>

</template>




<style lang="scss" scoped>
.login {
    width: 380px;
    // display: flex;
}
</style>