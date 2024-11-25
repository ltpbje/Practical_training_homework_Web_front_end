<template>
    <h2>homelistInfo</h2>
    <HomeData></HomeData>
</template>


<script setup>
import { defineAsyncComponent } from 'vue';
import Loading from '../../components/Loading.vue';
import Error from '../../components/Error.vue';
const HomeData = defineAsyncComponent({
    loader: () => new Promise((reslove, reject) => {
        setTimeout(() => {
            if (true) {
                reslove(import('../home/HomeData.vue'));
            } else {
                reject();
            }
        }, 3000);
    }),
    errorComponent: Error,
    loadingComponent: Loading,
    delay: 0
});
</script>



<style lang="scss" scoped></style>