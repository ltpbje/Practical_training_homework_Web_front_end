<template>
	<view class="content">
		<view class="tab">
			<view v-for="(item,index) in tab_item" :data-active="true" :key="index" @tap="changeTab(index)"
				:class="[{tab_item :true},{active: active == index}]">
				{{item.content}}
			</view>

		</view>
		<view class="tab_content">
			<view class="list">
				<view class="list_item" v-for="(item,index) in selectedData" :key="index">
					<image class="logo" src="/static/logo.png"></image>
					<view>{{item.content}}</view>
					<view class="type_text">
						{{item.type}}
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const active = ref(false);
	const tab_item = ref([{
			content: '全部'
		}, {
			content: '待支付'
		}, {
			content: '待服务'
		}, {
			content: '已完成'
		},
		{
			content: '已取消'
		},
	])
	const data = ref([{
			path: '/static/logo.png',
			content: '标题内容内容内容内容内容内容内容内容内容内容内容内容内容',
			type: '已取消'
		}, {
			path: '/static/logo.png',
			content: '标题内容内容内容内容内容内容内容内容内容内容内容内容内容',
			type: '已取消'
		},
		{
			path: '/static/logo.png',
			content: '标题内容内容内容内容内容内容内容内容内容内容内容内容内容',
			type: '已取消'
		},
		{
			path: '/static/logo.png',
			content: '标题内容内容内容内容内容内容内容内容内容内容内容内容内容',
			type: '已取消'
		},
		{
			path: '/static/logo.png',
			content: '标题内容内容内容内容内容内容内容内容内容内容内容内容内容',
			type: '待支付'
		},
		{
			path: '/static/logo.png',
			content: '标题内容内容内容内容内容内容内容内容内容内容内容内容内容',
			type: '待支付'
		},
		{
			path: '/static/logo.png',
			content: '标题内容内容内容内容内容内容内容内容内容内容内容内容内容',
			type: '已取消'
		},
	])
	const selectedData = ref([])
	const changeTab = (index) => {
		active.value = index;
		if (index == 0) {
			selectedData.value = data.value;
		}
		if (index == 1) {
			selectedData.value = data.value.filter(item => item.type == '待支付')
		}
		if (index == 2) {
			selectedData.value = data.value.filter(item => item.type == '待服务')
		}
	}
</script>

<style lang="scss" scoped>
	.tab {
		display: flex;
		justify-content: space-around;
	}

	.active {
		padding-bottom: 10px;
		border-bottom: 2px solid skyblue;
	}

	.logo {
		width: 30px;
		height: 30px;
	}

	.list_item {
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid blanchedalmond;
		margin: 20px 10px;
	}
</style>