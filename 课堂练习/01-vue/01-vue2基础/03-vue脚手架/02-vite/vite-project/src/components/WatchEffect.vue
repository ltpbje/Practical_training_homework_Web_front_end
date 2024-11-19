<template>
    <button @click="timeOut">开始</button>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
const count = ref(0);
// 监听count的值，当count的值发生变化时，执行回调函数
watchEffect(() => {
    // 打印count的值
    console.log(count.value);
});
const timeOut = () => {
    setTimeout(() => {
        count.value++;
        timeOut();
    }, 1000);
};
</script>

<style lang="scss" scoped></style>