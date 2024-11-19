<script setup>
import HelloWorld from './components/HelloWorld.vue';
import Expose from './components/Expose.vue';
import ToRefs from './components/ToRefs.vue';
import { ref, onMounted } from 'vue';
import Computed from './components/Computed.vue';
const msg = ref('parent value');
const getChild = e => {
  console.log(e);
};
let child = ref(null);
onMounted(() => {
  console.log(child.value.msg1);
  console.log(child.value.num);

});
</script>

<template>

  <HelloWorld :title="msg" @getChild="getChild" />
  <Expose ref="child"></Expose>
  <ToRefs></ToRefs>
  <Computed></Computed>
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
