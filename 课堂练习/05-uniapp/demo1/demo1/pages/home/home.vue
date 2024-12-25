<template>
	<view>
		<view>
			姓名:{{indexData.userName}}
		</view>
		<button @click="handleClick">按钮</button>


	</view>
</template>

<script setup>
	const indexData = ref({});
	onReady(() => {
		uni.$on('fromIndex', data => {
			indexData.value = data
			console.log(indexData.value);
		})
		uni.$emit('fromHome')
	})
	onUnload(() => {
		uni.$off('fromHome')
	})
</script>

<style lang="scss" scoped></style>