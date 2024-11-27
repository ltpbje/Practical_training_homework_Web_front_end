<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>1</van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
            <van-swipe-item>3</van-swipe-item>
            <van-swipe-item>4</van-swipe-item>
        </van-swipe>
    </div>
</template>

<script setup>
import { getSwiperData } from '@/utils/api/index';
import { onMounted, reactive } from 'vue';
const swiperData = reactive([]);
onMounted(async () => {
    const result = (await getSwiperData()).list;
    const arr1 = result.slice(0, 8);
    const arr2 = result.slice(8, 16);
    // console.log(arr1, arr2);
    swiperData.push(arr1);
    swiperData.push(arr2);
    console.log(swiperData);

});
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}
</style>