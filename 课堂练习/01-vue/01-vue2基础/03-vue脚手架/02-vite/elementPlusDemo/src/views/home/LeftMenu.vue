<script setup>
import { reactive } from 'vue';
import { Location } from '@element-plus/icons-vue';
const menuList = [
    {
        title: '首页',
        url: '/index'
    },
    {
        title: '列表管理',
        url: '/list'
    },
    {
        title: '数据管理',
        url: '/data'
    },

];
</script>

<template>
    <el-aside width="200px">
        <el-menu router>
            <el-menu-item v-for="(item, index) in menuList
            " default-active="'/index'" :key="item.url" :index="item.url">
                <el-icon>
                    <Location />
                </el-icon>
                {{ item.title }}
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<style scoped></style>
