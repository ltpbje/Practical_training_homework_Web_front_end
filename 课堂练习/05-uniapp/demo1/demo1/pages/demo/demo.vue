<template>
	<view>
		demo{{userName}}
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		ref
	} from 'vue';
	const userName = ref('');

	onLoad((e) => {
		userName.value = e.userName
	})
</script>

<style lang="scss" scoped></style>