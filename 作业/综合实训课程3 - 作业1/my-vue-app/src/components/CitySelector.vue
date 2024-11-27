<template>

    <label for="province">省份：</label>
    <select id="province" v-model="selectedProvince" @change="provinceChange">
        <option value="">请选择省份</option>
        <option v-for="(item, index) in provinces" :key="item.provinceName" :value="index">
            {{ item.provinceName }}
        </option>
    </select>

    <label for="city">城市：</label>
    <select id="city" :disabled="!selectedProvince">
        <option value="">请选择城市</option>
        <option v-for="(item, index) in selectedCitys" :key="item.cityName" :value="item.cityName">{{ item.cityName }}
        </option>
    </select>

</template>

<script setup>
import { ref } from 'vue';
// 导入省市数据
import data from '../assets/data.json';
// console.log(data.provinces);
// 所有省份数据
const provinces = ref([]);
const selectedProvince = ref('');
provinces.value = data.provinces;
// console.log(provinces.value);

// 所选省下的所有城市数据
const selectedCitys = ref([]);
// 所选省份改变的时候
const provinceChange = () => {
    selectedCitys.value = provinces.value[selectedProvince.value].citys;
    // console.log(selectedCitys.value);

}

</script>