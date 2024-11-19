<script setup>
import { reactive, ref, computed } from 'vue';
const state = reactive({
    count: 1
});
const num = ref(0);

// 创建一个只读的计算属性
const computedEvent1 = computed(() => state.count % 2);
</script>

<template>
    <h2>{{ computedEvent1 }}</h2>
</template>