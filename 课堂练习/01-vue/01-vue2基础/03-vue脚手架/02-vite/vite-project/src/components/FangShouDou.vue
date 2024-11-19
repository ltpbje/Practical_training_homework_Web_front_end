<template>
    <input type="text" v-model="keyword">
</template>

<script setup>
import { ref, watchEffect } from 'vue';
const keyword = ref('');
const asyncPrint = val => {
    return setTimeout(() => {
        console.log('userInput', val);
    }, 1000);
};
watchEffect((onInvaildate) => {
    // 用户输入的时间间隔小于1s  会立刻清除定时器 不会打印结果  如果用户输入的时间间隔大于1秒，才会打印
    //  因为这个小于1秒不打印的操作实现了防抖;
    const timer = asyncPrint(keyword.value);
    onInvaildate();
}); 
</script>

<style lang="scss" scoped></style>