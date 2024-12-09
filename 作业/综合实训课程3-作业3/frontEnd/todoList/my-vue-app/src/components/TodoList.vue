<script setup>
import { ref } from 'vue';
// import { Calendar, Cell } from 'vant';
const date = ref('');
const show = ref(false);

const formatDate = (date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};
const onConfirm = (value) => {
  show.value = false;
  date.value = formatDate(value);
};
</script>

<template>


  <div class="box">
    <div class="top">
      <span>
        丁炳震的待办事项
      </span>
    </div>
    <input type="text" placeholder="请输入您的待办事项标题" class="titleInp">
    <input type="text" placeholder="请输入您的待办事项" class="contentInp">
    <van-cell title="选择单个日期" :value="date" @click="show = true" style="height: .30rem;" />
    <van-calendar v-model:show="show" @confirm="onConfirm" />
    <div class="list">
      <ul>
        <li>111</li>
      </ul>
    </div>
  </div>


</template>


<style scoped>
.box {
  width: 100vw;
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
}

.inpBox {
  height: 100px;

}

.box .top {
  display: flex;
  justify-content: center;
  align-items: center;
  height: .3rem;
  font-size: .2rem;
  position: relative;
}

.list ul {
  list-style: none;
  /* text-align: center; */
}
</style>
