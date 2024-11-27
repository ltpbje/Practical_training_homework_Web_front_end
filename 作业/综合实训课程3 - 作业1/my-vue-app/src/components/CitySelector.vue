<template>

    <label for="province">省份：</label>
    <select id="province" v-model="selectedProvince" @change="handleProvinceChange">
        <option value="">请选择省份</option>
        <option v-for="province in provinces" :key="province.value" :value="province.value">{{ province.label }}
        </option>
    </select>

    <label for="city">城市：</label>
    <select id="city" v-model="selectedCity" :disabled="!selectedProvince">
        <option value="">请选择城市</option>
        <option v-for="city in cities" :key="city.value" :value="city.value">{{ city.label }}</option>
    </select>

</template>

<script setup>
import data from '../assets/data.json';
console.log(data);

</script>