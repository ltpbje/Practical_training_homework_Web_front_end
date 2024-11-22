<script setup>
import { reactive } from 'vue';
import { Location, Notification, Setting } from '@elementplus/icons-vue';
const menuList = reactive([
    {
        title: "首页",
        url: "/index",
        icon: Location
    },
    {
        title: "列表管理",
        url: "/list",
        icon: Notification
    },
    {
        title: "数据管理",
        url: "/data",
        icon: Setting
    }
]);
</script>

<template>
    <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo" default-active="1" router>
            <el-menu-item v-for="item in menuList" :key="item.url" :index="item.url">
                <el-icon>
                    <component :is="item.icon"></component>
                </el-icon>
                {{ item.title }}
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>