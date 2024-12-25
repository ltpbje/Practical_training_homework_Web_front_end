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
		<!-- 
		<view class=""> 
			{{userName}}---{{age}}
		</view>
		<button @click="goTo">按钮</button> -->
		<!-- <navigator url="/pages/demo/demo" open-type="reLaunch">跳转demo</navigator> -->
		<!-- <view v-for="(item,index) in 10">
			{{item}}
		</view> -->
		<button @click="getData">发送请求</button>
		{{arr}}
	</view>
</template>

<script setup>
	// import {
	// 	reactive
	// } from 'vue';
	// const obj = reactive({
	// 	userName: "zhangsan",
	// 	age: 18
	// })
	const arr = ref('')
	const getData = async () => {
		const arrData = await uni.request({
			url: 'https://jsonplaceholder.typicode.com/posts',
			success: res => {
				console.log(res);
			}
		})
		console.log(arrData);
		arr.value = arrData
	}
	// const fromIndex = () => {
	// 	uni.navigateTo({
	// 		url: '/pages/home/home',

	// 	})
	// 	uni.$on('fromHome', () => {
	// 		uni.$emit('fromIndex', obj)
	// 	})
	// }
	// onShow(() => {
	// 	uni.$off('fromIndex');
	// })
	// uni.showToast({
	// 	title: '成功',
	// 	icon: 'success',
	// 	mask: true,
	// 	duration: 3000,

	// })


	// const getData = () => {
	// 	uni.showLoading({
	// 		title: '加载中'
	// 	})

	// 	setTimeout(() => {
	// 		uni.hideLoading();
	// 	}, 3000)
	// }

	// const getData = () => {
	// 	uni.showModal({
	// 		title: '标题',
	// 		content: '你确定吗',
	// 		editable: true,
	// 		placeholderText: '哈哈哈哈',
	// 		success: res => {
	// 			console.log(res);
	// 		},
	// 		fail: (err) => {
	// 			console.log(err);
	// 		}
	// 	})
	// }
	// import {
	// 	ref,

	// } from 'vue';
	// import {
	// 	onLoad,
	// 	onReady,
	// 	onShow,
	// 	onUnload,
	// 	onPullDownRefresh
	// } from '@dcloudio/uni-app';
	// onPullDownRefresh(() => {
	// 	console.log('下拉刷新');
	// 	uni.stopPullDownRefresh()
	// })
	// onUnload(() => {
	// 	console.log('onUnload');
	// })
	// const userName = ref('张三');
	// const age = ref(0)
	// const goTo = () => {
	// 	uni.navigateTo({
	// 		url: '/pages/demo/demo',
	// 		// event配置项中，可以监听由返回页面触发的自定义事件
	// 		events: {

	// 			fromDemo: data => {
	// 				age.value = data.age;
	// 			}
	// 		},
	// 		success: res => {

	// 			res.eventChannel.emit('fromIndex', {
	// 				userName: userName.value
	// 			})
	// 		}
	// 	})
	// }
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