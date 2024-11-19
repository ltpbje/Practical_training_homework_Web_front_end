<template>
    <div class="title-bar bg-primary flex-row a-c j-c">
        <div class="left-back" v-show="showBack">
            <span>
                < </span>
        </div>
        <slot></slot>
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
}
</style>