<script setup>
import PageView from './PageView.vue';
import { reactive } from 'vue';
const formData = reactive({
    zh: '',
    password: ''
});
const rules = reactive({
    zh: [
        {
            required: true,
            message: '必须输入用户名',
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

</script>
<template>
    <PageView class="flex-row j-c a-c">
        <div class="login">
            <el-form :model="formData" label-width="80px" :rules="rules" status-icon>
                <el-form-item label="用户名" prop="zh">
                    <el-input v-model="formData.zh" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="formData.password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">登录</el-button>
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