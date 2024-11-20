<script setup>
import { ref, onMounted, provide } from 'vue';
import Inject from './components/Inject.vue';
const articleList = ref([
  { id: 1, title: 'vue3学习', author: '张三' },
  {
    id: 2, title: '组合式API', author: 'lisi'
  },
  { id: 3, title: 'router', author: 'wangwu' },
]);
// 向子组件提供名为list的属性，值为articleList
provide('list', articleList);
</script>

<template>

  <!-- <HelloWorld :title="msg" @getChild="getChild" />
  <Expose ref="child"></Expose>
  <ToRefs></ToRefs>
  <Computed></Computed>
  <WatchEffect></WatchEffect>
  <FangShouDou></FangShouDou> -->
  <!-- <hr>
  <Watch></Watch> -->
  <Inject></Inject>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
