<script setup>
import { ref } from 'vue';
const msg1 = ref('我是主动暴露的');
let num = ref(123);
defineExpose({
    msg1,
    num
});
</script>

<template>

</template>
<style scoped lang="scss"></style>