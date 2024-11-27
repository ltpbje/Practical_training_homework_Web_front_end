<template>
    <div class="title-bar bg-primary">
        <div class="left-icon" v-show="props.showIcon">
            <Search style="width: .18rem;  margin-top:0.11rem;"></Search>
        </div>
        <div class="center-title">
            <slot></slot>
        </div>
        <div class="right-icon" v-show="props.showIcon">
            <User style="width:.18rem;   margin-top:0.11rem;"></User>
        </div>
    </div>
</template>

<script setup>
import { Search, User } from '@element-plus/icons-vue';
const props = defineProps({
    showIcon: {
        type: Boolean,
        default: () => true
    }
});
</script>

<style lang="scss" scoped>
.title-bar {
    height: .4rem;
    text-align: center;
    color: #fff;
    line-height: .4rem;

    .left-icon {
        position: absolute;
        top: 0;
        left: .1rem;
    }


    .right-icon {
        position: absolute;
        top: 0;
        right: .1rem;
    }
}
</style>