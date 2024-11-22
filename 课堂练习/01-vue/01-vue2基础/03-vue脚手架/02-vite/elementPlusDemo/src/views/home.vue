<script setup>
import LeftMenu from './home/LeftMenu.vue';
</script>

<template>
    <div class="common-layout">
        <el-container>

            <LeftMenu></LeftMenu>

            <el-container>
                <el-header>Header</el-header>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped></style>
