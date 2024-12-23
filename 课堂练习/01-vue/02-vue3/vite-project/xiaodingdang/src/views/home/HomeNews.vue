<template>
    <div>
        HomeNews
        <Child message="father" @sendMessage="getMsg"></Child>
    </div>
</template>

<script setup>
import Child from './Child.vue';
const getMsg = (msg) => {
    console.log(msg);

}

</script>

<style lang="scss" scoped></style>