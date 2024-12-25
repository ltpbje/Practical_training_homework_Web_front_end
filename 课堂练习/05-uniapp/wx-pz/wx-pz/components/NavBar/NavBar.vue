<template>
	<view class="nav-top">
		<view class="status-bar" :style="{
			height:statusHeight,
		backgroundColor:props.backgroundColor}">

		</view>
		<view class="title-bar" :style="{
			height:titHeight,
			backgroundColor:props.backgroundColor,
			color:props.fontcolor,
			fontSize:props.fontsize
		}">
			<view class="back-icon" @touchstart="navTo">
				<image v-if="navIcon >1" src="../../static/navbar/prev.png" alt="" />
				<image v-else src="../../static/navbar/home.png" alt="" />
			</view>
			<view class="title-txt">
				<slot></slot>

			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onBeforeMount,
		ref
	} from 'vue';
	const props = defineProps({
		backgroundColor: {
			type: String,
			default: "rgba(255,255,255,1)"
		},
		fontcolor: {
			type: String,
			default: "rgba(0,0,0,1)",
		},
		fontsize: {
			type: String,
			default: "32rpx"
		}
	});
	const statusHeight = ref(0);
	const titHeight = ref(0);
	const getNavData = () => {
		const {
			system
		} = uni.getDeviceInfo();
		const {
			statusBarHeight
		} = uni.getWindowInfo()
		console.log(system, statusBarHeight);
		// 如果希望胶囊按钮在title-bar中垂直居中，可以按照下面的写法来获取title-bar的高度
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
		titHeight.value = (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height + 'px';
		statusHeight.value = statusBarHeight + 'px'; //这里使用px而不是rpx，主要是从iphonex开始会有计算误差
		// if (system.includes("iOS")) {
		// 	titHeight.value = 88 + 'rpx';
		// } else {
		// 	titHeight.value = 96 + 'rpx';
		// }

	}
	const navIcon = getCurrentPages().length;
	const navTo = () => {
		if (navIcon > 1) {
			uni.navigateBack()
		} else {
			uni.switchTab({
				url: '/pages/index/index'
			})
		}
	}
	onBeforeMount(() => {
		getNavData();
		// uni.getSystemInfoAsync()
	})
</script>

<style lang="scss" scoped>
	.title-bar {
		position: relative;

		.back-icon {
			height: inherit;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			left: 15rpx;
			width: 66rpx;
			z-index: 2;

			image {
				width: 66rpx;
				height: 66rpx;
			}
		}

		.title-txt {
			position: absolute;
			z-index: 1;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			height: inherit;
			top: 0;
		}
	}
</style>