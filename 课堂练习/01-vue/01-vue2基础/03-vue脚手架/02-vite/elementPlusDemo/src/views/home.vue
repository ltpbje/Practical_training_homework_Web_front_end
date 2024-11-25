<script setup>
import LeftMenu from './home/LeftMenu.vue';
import BreadCrumb from '../components/BreadCrumb.vue';
import { ref } from 'vue';
import { userLoginInfo } from '../store/login';
import { useRouter } from 'vue-router';
const store = userLoginInfo();
const router = useRouter();
const dialogVisible = ref(false);
const goBack = () => {
    dialogVisible.value = false;
    store.$patch((state) => {
        state.userInfo = null;
        state.userToken = null;
    });
    localStorage.clear();
    dialogVisible.value = false;
    router.push({
        name: 'login'
    });

};
</script>

<template>
    <div class="common-layout">
        <el-container>

            <LeftMenu></LeftMenu>

            <el-container>
                <el-header class="flex-row a-c j-s-b">
                    <BreadCrumb></BreadCrumb>
                    <el-button type="primary" @click="dialogVisible = true">
                        退出登录
                    </el-button>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
    <el-dialog v-model="dialogVisible" title="提示" width="500" :before-close="handleClose">
        <span>确定要退出登陆吗</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="goBack">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped></style>
