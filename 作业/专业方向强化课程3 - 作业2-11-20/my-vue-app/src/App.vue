<script setup>

</script>

<template>
  <div class="box">
    <div class="title">This is a Todolist</div>
    <input type="text" class="inpEl">
  </div>
</template>

<style scoped>
.box {
  width: 100vw;
  min-height: 100px;
  margin-top: 100px;
  background-image: url(./assets/img/bg.jpg);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box .title {
  font-size: 40px;
  font-weight: bold;
}

.inpEl {
  height: 30px;
  border-radius: 10px;
  border: 1px solid #CFCFCF;
}
</style>
