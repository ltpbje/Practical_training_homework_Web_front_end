<template>
    <h2>index</h2>
    <Chart chartType="line" :chartData="[20, 50, 30, 50]" :categoryType="['1', '2', '3', '4']" />
    <Chart chartType="bar" :chart-data="[300, 230, 500, 400]" :category-type="['a', 'b', 'c', 'd']" />
    <Chart chart-type="pie" :chart-data="[50, 60, 20]" :category-type="['e', 'd', 'f']" />
</template>