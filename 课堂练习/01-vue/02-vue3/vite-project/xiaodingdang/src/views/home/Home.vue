<template>
    <PageView class="flex-column">

        <div class="title-bar">1</div>
        <div class="content-box flex-1">
            <router-view></router-view>
        </div>
        <ul class="tab-bar flex-row j-s-a">
            <router-link :to="{ name: 'index' }" custom #default='{ navigate, isActive }'>
                <li @click="navigate" :class="{ 'text-primary': isActive }">
                    <img src="../../assets/icon/home.png" alt="" v-show="!isActive">
                    <img src="../../assets/icon/home_action.png" alt="" v-show="isActive">
                    <span>外卖</span>
                </li>
            </router-link>
            <router-link :to="{ name: 'search' }" custom #default='{ navigate, isActive }'>
                <li @click="navigate" :class="{ 'text-primary': isActive }">
                    <img src="../../assets/icon/search.png" alt="" v-show="!isActive">
                    <img src="../../assets/icon/search_action.png" alt="" v-show="isActive">
                    <span>搜索</span>
                </li>
            </router-link>
            <router-link :to="{ name: 'news' }" custom #default='{ navigate, isActive }'>

                <li @click="navigate" :class="{ 'text-primary': isActive }">
                    <img src="../../assets/icon/list.png" alt="" v-show="!isActive">
                    <img src="../../assets/icon/list_action.png" alt="" v-show="isActive">
                    <span>新闻</span>
                </li>
            </router-link>
            <router-link :to="{ name: 'my' }" custom #default='{ navigate, isActive }'>

                <li @click="navigate" :class="{ 'text-primary': isActive }">
                    <img src="../../assets/icon/list.png" alt="" v-show="!isActive">
                    <img src="../../assets/icon/list_action.png" alt="" v-show="isActive">
                    <span>我的</span>
                </li>
            </router-link>

        </ul>
    </PageView>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.tab-bar {
    border-top: 1px solid #ccc;
    height: .55rem;
    color: #666;

    li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: .12rem;

        img {
            width: .24rem;
            margin-bottom: .05rem;
        }
    }
}
</style>