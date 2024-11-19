<template>
    <h2>{{ userName }}</h2>
    <button @click="userName = '李四'">按钮</button>
</template>
<!-- 
<script setup>
import { reactive, toRefs } from 'vue';
const obj = reactive({
    userName: '张三',
    age: 18
});
// 从obj对象中解构出userName和age属性，并将其转换为响应式数据
const { userName, age } = toRefs(obj);

</script> -->
<script>
import { reactive, toRefs } from 'vue';
export default {
    setup() {
        const obj = reactive({
            userName: '张三',
            age: 18
        });
        return {
            ...toRefs(obj)
        };
    }
};
</script>
<style lang="scss" scoped></style>