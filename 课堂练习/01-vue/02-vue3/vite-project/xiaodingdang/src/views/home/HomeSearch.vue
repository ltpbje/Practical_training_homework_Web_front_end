<template>
    <div class="box">
        <van-search v-model="searchValue" show-action placeholder="请输入搜索关键词">
            <template #action>
                <div @click="onClickButton">搜索</div>
            </template>
        </van-search>
        <div class="shop-list">
            <ShopItem v-for="(item, index) in shopListData" :key="index" :shopInfo="item"></ShopItem>
        </div>
    </div>
</template>

<script setup>
import ShopItem from '@/components/ShopItem.vue';
import { onMounted, ref } from 'vue';
import { shopList } from '@/utils/api';
// 商家列表数据
let shopListData = ref([]);
// 搜索值
let searchValue = ref('');
let listData = [];
const onClickButton = () => {
    // console.log(shopListData.value);
    const shopList = listData;
    let search = searchValue.value;
    const resultList = shopList.filter(item => item.name.search(search) != -1);
    shopListData.value = resultList;

};
const getShopList = async () => {
    listData = (await shopList()).list;
    shopListData.value = listData;
};
onMounted(() => {
    getShopList();
});
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .shop-list {
        // display: flex;
        flex: 1;
        overflow: auto;
    }
}
</style>