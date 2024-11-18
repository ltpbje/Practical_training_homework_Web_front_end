<template>
    <div class="page-view-box">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'page-view'
};
</script>

<style lang="scss" scoped>
.page-view-box {
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
}
</style>
