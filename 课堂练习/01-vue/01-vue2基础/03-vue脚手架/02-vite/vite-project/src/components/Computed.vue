<script setup>
import { reactive, ref, computed } from 'vue';
const state = reactive({
    count: 1
});
const num = ref(0);

// 创建一个只读的计算属性
const computedEvent1 = computed(() => state.count % 2);
//创建一个可读可写的计算属性
const computedEvent2 = computed({
    get: () => {
        return state.count % 2;
    },
    set: newVal => {
        state.count = newVal;
    }
});

const add = () => {
    state.count++;
};
const handleClick = () => {
    computedEvent2.value = 10;
};
</script>

<template>
    <h2>{{ computedEvent1 }}</h2>
    <h2>{{ computedEvent2 }}</h2>
    <button @click='add'>add</button>
    <button @click='handleClick'>handleClick</button>
</template>