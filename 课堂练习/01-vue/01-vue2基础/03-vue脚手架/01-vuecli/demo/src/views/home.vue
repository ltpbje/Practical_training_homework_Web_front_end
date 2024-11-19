<template>
    <page-view class="flex-column">
        <div class="content-box flex-1">
            <router-view></router-view>
        </div>
        <ul class="tab-bar flex-row j-s-a a-c">
            <router-link custom :to="{ name: 'chooseFood' }" v-slot="{ navigate, isActive }">
                <li @click="navigate" :class="{ 'text-primary': isActive }">
                    <span class="iconfont icon-canju"></span>点餐
                </li>
            </router-link>
            <router-link custom :to="{ name: 'order' }" v-slot="{ navigate, isActive }">
                <li @click="navigate" :class="{ 'text-primary': isActive }">
                    <span class="iconfont icon-dingdan"></span>订单
                </li>
            </router-link>
            <router-link custom :to="{ name: 'category' }" v-slot="{ navigate, isActive }">
                <li @click="navigate" :class="{ 'text-primary': isActive }">
                    <span class="iconfont icon-fenlei"></span>分类
                </li>
            </router-link>
            <router-link custom :to="{ name: 'my' }" v-slot="{ navigate, isActive }">
                <li @click="navigate" :class="{ 'text-primary': isActive }">
                    <!-- 点击时调用navigate方法 -->
                    <!-- 根据isActive的值，动态添加class -->
                    <span class="iconfont icon-my"></span>我的
                </li>
            </router-link>

        </ul>
    </page-view>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
    name: 'home',

};
</script>

<style lang="scss" scoped>
.tab-bar {
    height: 0.55rem;
    background-color: #ececec;
    border-top: 1px solid lightgray;

    li {
        font-size: .14rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        .iconfont {
            margin-bottom: .03rem;
            font-size: .2rem;
        }
    }
}
</style>