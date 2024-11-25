<script setup>
import LeftMenu from './home/LeftMenu.vue';
import BreadCrumb from '../components/BreadCrumb.vue';
</script>

<template>
    <div class="common-layout">
        <el-container>

            <LeftMenu></LeftMenu>

            <el-container>
                <el-header>
                    <BreadCrumb></BreadCrumb>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped></style>
