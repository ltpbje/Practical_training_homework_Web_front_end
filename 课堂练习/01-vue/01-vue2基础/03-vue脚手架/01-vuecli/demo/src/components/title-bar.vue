<template>
    <div class="title-bar bg-primary flex-row a-c j-c">
        <div class="left-back" v-show="showBack">
            <span class="iconfont icon-prev">
            </span>
        </div>
        <slot></slot>
        <div class="right-menu">
            <slot name="right-menu"></slot>

        </div>
    </div>
</template>

<script>
export default {
    name: 'title-bar',
    props: {
        showBack: {
            type: Boolean,
            default: () => false
        }
    }
};
</script>

<style lang="scss" scoped>
.title-bar {
    height: .45rem;
    font-size: .18rem;
    color: #fff;

    .left-back {
        position: absolute;
        left: .1rem;
        display: flex;
        align-items: center;
        font-size: .20rem;
    }

    .right-menu {
        position: absolute;
        right: .1rem;
    }
}
</style>