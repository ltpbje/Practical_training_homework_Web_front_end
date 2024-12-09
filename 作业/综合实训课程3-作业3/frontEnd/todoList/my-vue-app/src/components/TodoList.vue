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

  <div class="content">
    <div class="box">
      <div class="top">
        <span>
          丁炳震的待办事项
        </span>
      </div>
      <div class="inp_section">
        <input type="text" placeholder="请输入您的待办事项标题" class="titleInp ">
        <input type="text" placeholder="请输入您的待办事项" class="contentInp">
        <van-cell title="计划完成时间" :value="date" @click="show = true" />
        <van-calendar v-model:show="show" @confirm="onConfirm" />
        <van-button type="success" class="addBtn">添加事项</van-button>
      </div>
      <div class="list">
        <ul>
          <li class="list_item">
            <van-button type="primary" class="status_tag" size="normal">已完成</van-button>
            <div class="content_box">
              <span>标题1</span>
              <span>
                创建时间 计划完成时间：
              </span>
            </div>
          </li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>
          <li>111</li>


        </ul>
      </div>
    </div>
  </div>


</template>


<style scoped>
.content {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #EAEAEF;
}

.inp_section {
  width: 90%;
  box-sizing: border-box;
  /* padding: 0 .1rem; */
  margin: 0 auto;
}

.addBtn {
  width: 100%;
  margin: 0 auto;
}

.van-cell {
  width: 100%;
  background-color: white;
  /* margin: .1rem auto; */
  margin: .1rem 0 .1rem;
  border-radius: 12px;
  color: gray;
}

.box {
  width: 3.75rem;
  /* text-align: center; */
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  /* border: 1px solid #000; */
  background-color: #EAEAEF;
  /* align-items: center; */
}

.titleInp {
  /* border: 1px solid #000; */
  border: none;
  outline: none;
  height: 0.6rem;
  width: 100%;
  margin: .1rem auto;
  border-radius: 12px;
  background-color: #fff;
  padding-left: 7px;
}

.contentInp {
  border: none;
  outline: none;
  height: 1rem;
  width: 100%;
  margin: 0 auto;
  border-radius: 12px;
  padding-left: 7px;
}

.inpBox {
  height: 100px;

}

.list {
  width: 90%;
  margin: 0 auto;
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

.list li {
  display: flex;
  height: 0.7rem;
  align-items: center;
}

.list li .content_box {
  display: flex;
  flex-direction: column;
}

.list li .content_box span:first-of-type {
  font-size: .17rem;
}


.status_tag {
  width: .9rem;
}
</style>
