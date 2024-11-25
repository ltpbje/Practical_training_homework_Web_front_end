<script setup>
import Chart from '../../components/Chart.vue';
</script>

<template>
    <h2>
        homeIndex
    </h2>
    <Chart chartType="line" :chartData="[20, 50, 300, 100]" :categoryType="['Mon', 'Tue', 'Wed', 'Thu']"></Chart>
    <Chart chartType="bar" :chartData="[20, 50, 300, 100]" :categoryType="['a', 'b', 'c', 'd']"></Chart>
    <Chart chartType="pie" :chartData="[20, 50, 300, 100]" :categoryType="['a', 'b', 'c', 'd']"></Chart>

</template>

<style scoped></style>
