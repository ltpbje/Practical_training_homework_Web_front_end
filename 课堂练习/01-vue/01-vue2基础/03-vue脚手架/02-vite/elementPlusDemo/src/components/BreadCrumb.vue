<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';

const route = useRoute();
const list = ref([]);
const getBreadCrumb = (matched) => {
    if (matched.length && matched[1].name == 'index') {
        list.value = matched.slice(0, 1);
    } else {
        list.value = matched.slice(1, matched.length);
    }
};
onMounted(() => {
    getBreadCrumb(route.matched);
    // console.log(route.matched);

});
watch(route, (newVal) => {
    getBreadCrumb(newVal.matched);
    // list.value = newVal.matched;
    console.log(list.value);

});
</script>
<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in list" :key="index" :to="{ path: item.path }">{{ item.meta.title
            }}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item> -->

    </el-breadcrumb>
</template>

<style scoped></style>