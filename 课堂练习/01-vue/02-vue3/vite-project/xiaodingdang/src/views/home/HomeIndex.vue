<template>
    <div>
        <van-swipe class="my-swipe" :autoplay indicator-color="aqua">
            <van-swipe-item class="flex-row" v-for="(item, index) in swiperData" :key="index">
                <div class="banner-item" v-for="(sub, subIndex) in item" :key="subIndex">
                    <img :src="'http://127.0.0.1:8900' + sub.image_url" alt="">
                    <p>{{ sub.title }}</p>
                </div>
            </van-swipe-item>
        </van-swipe>

        <div class="shop-list">
            <ShopItem></ShopItem>
        </div>

    </div>
</template>

<script setup>
import { getSwiperData } from '@/utils/api/index';
import { onMounted, reactive } from 'vue';
import ShopItem from '@/components/ShopItem.vue';
const swiperData = reactive([]);
const renderSwiperData = async () => {
    const results = (await getSwiperData()).list;
    let _length = Math.ceil(results.length / 8);
    for (let i = 0; i < _length; i++) {
        if (i < _length - 1) {
            swiperData.push(results.splice(0, 8));
        } else {
            swiperData.push(results);
        }

    }
    console.log(swiperData);
};
onMounted(() => {
    renderSwiperData();

});
</script>

<style lang="scss" scoped>
.flex-row {
    flex-wrap: wrap;

    .banner-item {
        width: 25%;
        text-align: center;

        img {
            width: 60%;
        }


    }
}

:deep(.van-swipe__indicator) {
    background-color: black;
}

:deep(.van-swipe__indicator--active) {
    background-color: aqua;
}
</style>