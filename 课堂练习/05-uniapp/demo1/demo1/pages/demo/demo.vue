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
		getCurrentInstance,
		ref
	} from 'vue';
	const userName = ref('');
	const age = ref(20);
	onLoad(() => {
		const instance = getCurrentInstance().proxy;
		const eventChannel = instance.getOpenerEventChannel();

		eventChannel.emit('fromDemo', {
			age: age.value
		})
		eventChannel.on('fromIndex', data => {
			userName.value = data.userName;
		})

	})
</script>

<style lang="scss" scoped></style>