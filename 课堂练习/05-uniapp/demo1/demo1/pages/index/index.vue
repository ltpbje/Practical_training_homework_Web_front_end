<template>
	<view class="content">
		<!-- <content-box></content-box> -->
		<!-- <view class="box" hover-class="box-hover" hover-start-time="0" hover-stay-time="0"> 
					我是内容1
		</view>
		<text selectable="true">我是内容2</text>		 -->
		<!-- <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item>
				<view class="swiper-item">1</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">2</view>
			</swiper-item>
		</swiper>
		<button type="primary">按钮</button>
		<navigator url="/pages/demo/demo" open-type="reLaunch">跳转</navigator> -->
		<!-- 	<scroll-view class="scroll-box" scroll-y="true">
			<view class="box">1</view>
			<view class="box">1</view>
			<view class="box">1</view>
			<view class="box">1</view>
			<view class="box">1</view>
			<view class="box">1</view>
			<view class="box">1</view>
			<view class="box">1</view>
			<view class="box">1</view>
		</scroll-view>			 -->

		<view class="">
			{{userName}}
		</view>
		<button @click="goTo">按钮</button>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const userName = ref('张三');

	const goTo = () => {
		uni.navigateTo({
			url: '/pages/demo/demo',

			success: res => {

				res.eventChannel.emit('fromIndex', {
					userName: userName.value
				})
			}
		})
	}
</script>

<style lang="scss" scoped>
	.scroll-box {
		width: 100vw;
		height: 100vh;

		.box {
			height: 100px;
			width: 100%;
			background-color: red;
			margin: 2px 0;
		}
	}

	.box {
		width: 200rpx;
		height: 200rpx;
		background-color: #ccc;
	}


	.box-hover {
		background-color: #f00;
	}
</style>