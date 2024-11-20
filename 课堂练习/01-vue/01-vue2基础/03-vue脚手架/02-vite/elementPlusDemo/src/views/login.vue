<script setup>
import PageView from './PageView.vue';
</script>
<template>
    <PageView class="flex-row j-c a-c">
        <div class="login">
            <el-form label-width="60px">
                <el-form-item label="用户名">
                    <el-input />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" />
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
    width: 350px;
    // display: flex;
}
</style>