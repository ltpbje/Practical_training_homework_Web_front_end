<script setup>
import { inject } from 'vue';
const articleList = inject('list', []);
</script>
<template>
    {{ articleList[0].title }}
</template>