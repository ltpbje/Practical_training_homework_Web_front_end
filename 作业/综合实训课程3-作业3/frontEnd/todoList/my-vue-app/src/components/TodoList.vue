<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
// import { Calendar, Cell } from 'vant';
const formData = ref({
  endTime: '',
  startTime: '',
  status: '待完成',
  content: '',
  title: ''
});
const showCalendar = ref(false);

// 格式化时间
const formatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
const onConfirmDate = (value) => {
  showCalendar.value = false;
  formData.value.endTime = formatDate(value);
};
const dataList = ref([]);
function getFormatDate(str) {
  let date = new Date(str),
    year = date.getFullYear(), //获取完整的年份(4位)
    month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
    strDate = date.getDate(); // 获取当前日(1-31)
  if (month < 10) month = `0${month}`; // 如果月份是个位数，在前面补0
  if (strDate < 10) strDate = `0${strDate}`; // 如果日是个位数，在前面补0

  return `${year}-${month}-${strDate}`;
}
// 添加事件
async function addEvent() {
  formData.value.startTime = formatDate(new Date());
  if (new Date(formData.value.endTime).getTime() - new Date().getTime() <= 0) {
    formData.value.status = '已超时';
  }
  let res = await axios.post('http://localhost:8080/add', formData.value);
  console.log(res);
  await getDataList();

  formData.value = {
    endTime: '',
    startTime: '',
    status: '待完成',
    content: '',
    title: ''
  };
}

// 删除某项
async function delEvent(id) {
  showConfirmDialog({
    message:
      '确定删除吗?',
  })
    .then(async () => {
      // on confirm
      await axios.get(`http://localhost:8080/delete?id=${id}`);
      getDataList();
    })
    .catch(() => {
      // on cancel
    });
  // console.log(id);

}
const showEdit = ref(false);
const editData = ref({});
function editEvent(id) {
  const arr = dataList.value.filter(item => item.id == id);
  editData.value = arr[0];
  showEdit.value = true;
}
async function finishEvent() {
  const id = editData.value.id;
  showConfirmDialog({
    message:
      '确定完成吗?',
  })
    .then(async () => {
      // on confirm
      await axios.get(`http://localhost:8080/finish?id=${id}`);
      getDataList();
    })
    .catch(() => {
      // on cancel
    });
  // console.log(id);


}

async function getDataList() {
  let data = (await axios.get('http://localhost:8080/getData')).data;
  // console.log(data);
  dataList.value = data;
  dataList.value.forEach(item => {
    if (item.status != '已完成') {
      if (new Date(item.endTime).getTime() - new Date().getTime() <= 0) {
        item.status = '已超时';
      }
    }
  });

}
onMounted(() => {
  getDataList();
});
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
        <input type="text" placeholder="请输入您的待办事项标题" v-model="formData.title" class="titleInp ">
        <input type="text" placeholder="请输入您的待办事项" v-model="formData.content" class="contentInp">
        <van-cell title="计划完成时间" :value="formData.endTime" @click="showCalendar = true" />
        <van-calendar :min-date="new Date('2000-1-1')" v-model:show="showCalendar" @confirm="onConfirmDate" />
        <van-button type="success" class="addBtn" @click="addEvent">添加事项</van-button>
      </div>
      <div class="list">
        <ul>
          <li class="list_item" v-for="(item, index) in dataList" :key="item.id">
            <van-button
              :type="{ 'primary': item.status == '已完成', 'warning': item.status == '待完成', 'danger': item.status == '已超时' }"
              class="status_tag" size="normal">{{ item.status }}</van-button>
            <div div class="content_box" @click="editEvent(item.id)">
              <span>{{ item.title }}</span>
              <span>
                创建时间{{ getFormatDate(item.startTime) }} 计划完成时间：{{ getFormatDate(item.endTime) }}
              </span>
            </div>
            <van-icon name="close" size=".23rem" class="del_btn" @click="delEvent(item.id)" />
          </li>
        </ul>
      </div>
      <van-dialog v-model:show="showEdit" :title="editData.title" show-cancel-button @confirm="finishEvent"
        confirm-button-text="确定完成">
        <!-- <van-field v-model="editData.content" placeholder="请输入待办事项内容" /> -->
        <van-field v-model="editData.content" rows="3" autosize type="textarea" placeholder="请输入待办事项内容" />
        <!-- <img src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" /> -->
      </van-dialog>
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

input {
  box-sizing: border-box;
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
  border-radius: 5px;
  background-color: #fff;
  padding-left: 7px;
}

.contentInp {
  border: none;
  outline: none;
  height: 0.6rem;
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
  padding-left: 7px;
}

.inpBox {
  height: 100px;

}

.list {
  width: 90%;
  position: relative;
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
  margin-left: .1rem;
}

.list li .content_box span:first-of-type {
  font-size: .17rem;
}

.list li .content_box span:nth-of-type(2) {
  font-size: .09rem;
}

.del_btn {
  position: absolute;
  right: 0;
}

.status_tag {
  width: .9rem;
}
</style>
