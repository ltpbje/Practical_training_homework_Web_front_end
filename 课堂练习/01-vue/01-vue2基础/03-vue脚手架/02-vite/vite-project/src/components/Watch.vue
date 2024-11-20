<template>
    <!-- <h2 @click="state.person.name = '李四'">{{ state.person.name }}</h2> -->
    <input type="text" v-model="keyword">
</template>

<script setup>
import { ref, watch, reactive } from 'vue';
const keyword = ref('');
const asyncPrint = (val) => {
    return setTimeout(() => {
        console.log('userInput', val.value);

    }, 1000);
};
watch(keyword, (newValue, oldValue, onCleanUp) => {
    // 监听keyword的变化
    const timer = asyncPrint(keyword);
    // 调用asyncPrint函数，传入keyword，返回一个定时器
    onCleanUp(() => { clearTimeout(timer); });
    // 在onCleanUp函数中清除定时器
}, {
    lazy: true
});
// const state = reactive({
//     person: {
//         name: '张三',
//         fav: [12, 3, 4]
//     }
// });
// watch(() => state.person, (newValue, oldValue) => {
//     console.log('新值', newValue);
//     console.log('老值', oldValue);

// }, {
//     deep: true,//开启监听多层嵌套对象
//     immediate: true //让watch变成非惰性
// });


</script>

<style lang="scss" scoped></style>