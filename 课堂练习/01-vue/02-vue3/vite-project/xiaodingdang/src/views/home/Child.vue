<template>
    <div>
        child
        <div>
            {{ message }}
        </div>
        <button @click=" emits('sendMessage', 'childMsg')">按钮</button>
    </div>
</template>

<script setup>
defineProps({
    message: {
        type: String,
        default: '1'
    }
});

const emits = defineEmits();
</script>

<style lang="scss" scoped></style>