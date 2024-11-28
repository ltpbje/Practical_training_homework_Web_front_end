<template>
    <div class="loading flex-row a-c j-c">
        <van-loading size="40px" vertical color="deepskyblue">加载中...</van-loading>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.loading {
    background-color: rgba(255, 255, 255, 0.9);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
</style>