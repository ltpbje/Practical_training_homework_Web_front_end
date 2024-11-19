<template>
    <page-view class="flex-column">
        <div class="content-box flex-1">
            <router-view></router-view>
        </div>
        <ul class="tab-bar flex-row j-s-a a-c">
            <li>点餐</li>
            <li>订单</li>
            <li>分类</li>
            <li>我的</li>
        </ul>
    </page-view>
</template>

<script>
import { ref } from "vue";
export default {
    name: 'home',
    data() {
        return {
            userName: '张三'
        };
    },
    methods: {
        changeName() {
            this.userName = 'lisi';
        }
    },
};
</script>

<style lang="scss" scoped>
.tab-bar {
    height: 0.55rem;
    background-color: #ececec;
    border-top: 1px solid lightgray;

    li {
        font-size: .14rem;
    }
}
</style>