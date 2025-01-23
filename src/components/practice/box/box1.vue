<template>
  <div class="box">
    <div class="cc">
      {{ count }}
      <button @click="addCount()">+</button>
    </div>
    <Box2></Box2>
  </div>
</template>

<script setup lang="ts">
import Box2 from "./box2.vue";
import { provide, ref } from "vue";
import  { key } from "./key";

const count = ref<number>(0);
function addCount() {
  count.value = count.value + 1;
}

// provide(injectionKeyy, count)
provide(key, {
    count,
    addCount
})
</script>

<style scoped>
.cc {
  height: 10px;
  top: 0;
  p {
    margin: 0;
    padding: 0;
  }
}
.box {
  display: flex;
  /* align-items: center; */
  justify-content: center;
  width: 250px;
  height: 250px;
  border: black 1px solid;
}
</style>
