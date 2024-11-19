<script setup>
// setup语法糖简化语法
import { ref } from 'vue';
const msg = ref('hello');
// 定义一个名为getChild的事件
const emits = defineEmits(['getChild']);
const props = defineProps({
  title: {
    type: String,
    default: 'title'
  }
});

const toEmits = () => {
  emits('getChild', 'child value');
};
</script>

<template>
  <h2>{{ title }}</h2>
  <button @click="toEmits">按钮</button>
</template>

<style scoped></style>
