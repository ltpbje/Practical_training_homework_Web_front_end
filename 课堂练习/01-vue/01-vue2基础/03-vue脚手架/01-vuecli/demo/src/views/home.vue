<template>
    <h2>我是Home---{{ userName }}</h2>
    <button @click="changeName">按钮</button>
</template>

<script>
import { ref } from "vue";
export default {
    name: 'home',
    data() {
        return {
            userName: '张三'
        };
    },
    methods: {
        changeName() {
            this.userName = 'lisi';
        }
    },
};
</script>

<style lang="scss" scoped></style>