<script setup>
import { reactive, shallowReactive } from 'vue';
import { Location, Link, Setting } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import NavItem from '../../components/NavItem.vue';
const route = useRoute();
const menuList = shallowReactive([
    {
        title: '首页',
        url: '/index',
        icon: Location
    },
    {
        title: '列表管理',
        url: '/list',
        icon: Link,
        children: [
            {
                title: '列表信息',
                url: '/list/info',
                icon: Location,
            },
            {
                title: '管理信息',
                url: '/list/manage',
                icon: Location,
            }
        ]
    },
    {
        title: '数据管理',
        url: '/data',
        icon: Setting
    },

]);
</script>

<template>
    <el-aside width="200px">
        <!--－route表示，当点击哪个导航项就把哪个路由单体对象的path作为default-active的值来保持激活项页 -->
        <!-- <el-menu-item v-for=" (item, index) in menuList " :key="item.url" :index="item.url">
            <el-icon>
                <component :is="item.icon" />
            </el-icon>
            {{ item.title }}
        </el-menu-item> -->

        <el-menu router :default-active="route.path" class="el-menu-vertical-demo">
            <NavItem v-for="item in menuList" :key="item.url" :item="item"></NavItem>
        </el-menu>
    </el-aside>
</template>

<style scoped></style>
