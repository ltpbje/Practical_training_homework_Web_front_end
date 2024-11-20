<template>
    {{ articleList[0].title }}
</template>

<script setup>
import { inject } from 'vue';
const articleList = inject('list', []);
</script>

<style lang="scss" scoped></style>