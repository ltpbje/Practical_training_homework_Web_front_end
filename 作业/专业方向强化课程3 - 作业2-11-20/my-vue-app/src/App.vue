<script setup>
import { ref, watch, reactive } from "vue";
const inpVal = ref('');
const todoListData = reactive([]);
const sendData = () => {
  const item = {
    value: inpVal.value,
    isCompleted: false
  };
  todoListData.push(item);
};
// 已完成状态
const isCompleted = ref(true);
</script>

<template>
  <div class="box">
    <div class="title">This is a Todolist</div>
    <input type="text" class="inpEl" v-model="inpVal" @keyup.enter="sendData">
    <ul v-if="todoListData.length > 0">
      <li v-for="(item, index) in todoListData" :key="index" :class="{ complete: item.isCompleted }"
        @click="item.isCompleted = !item.isCompleted">{{ item.value }}</li>
    </ul>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.box {
  width: 100vw;
  min-height: 100px;
  margin-top: 100px;
  background-image: url(./assets/img/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.complete {
  text-decoration: line-through;
}

.box .title {
  font-size: 40px;
  font-weight: bold;
}

.inpEl {
  height: 30px;
  width: 300px;
  margin: 20px 0;
  border-radius: 10px;
  border: 1px solid #CFCFCF;
  padding: 0 10px;
}

ul li {
  text-align: center;
  list-style: none;
  margin: 8px 0;
  user-select: none;
  font-size: 20px;
}
</style>
