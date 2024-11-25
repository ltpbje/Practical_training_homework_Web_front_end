<script setup>
const props = defineProps({
    item: {
        type: Object
    },

});
</script>
<template>
    <el-menu-item v-if="!props.item.children" :index="props.item.url">
        <el-icon>
            <component :is="props.item.icon" />
        </el-icon>
        {{ props.item.title }}
    </el-menu-item>
    <el-sub-menu v-else>
        <template #title>
            <el-icon>
                <component :is="props.item.icon" />
            </el-icon>
            <span> {{ props.item.title }}</span>
        </template>
        <!-- 这里是关键，在自己组件内部调用自己，形成递归 -->
        <nav-item v-for="sub in props.item.children" :key="sub.url" :item="sub"></nav-item>
    </el-sub-menu>
</template>

<style scoped></style>