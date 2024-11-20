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
// 监听器，当响应式数据发生变化时，会自动执行传入的回调函数
watchEffect((onInvaildate) => {
    // 用户输入的时间间隔小于1s  会立刻清除定时器 不会打印结果  如果用户输入的时间间隔大于1秒，才会打印
    //  因为这个小于1秒不打印的操作实现了防抖;
    const timer = asyncPrint(keyword.value);
    // 监听keyword变化，清除定时器
    onInvaildate(() => clearTimeout(timer));
    // 打印keyword的值
    // console.log("keywordChange", keyword.value);
}, {
    // 定义一个flush属性，其值为post
    flush: 'post'
}); 
</script>

<style lang="scss" scoped></style>