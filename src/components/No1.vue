<script setup lang="ts">
import { ref } from "vue";

const count = ref<number>(0);
</script>

<template>
  <container>
    <button type="button" @click="count--">&minus;</button>
    <p>count : {{ count }}</p>
    <button type="button" @click="count++">&plus;</button>
  </container>
</template>

<style scoped>
container {
  display: flex;
  align-items: center;

  margin: 10px 0px;

}
p {
  margin: 0px;
}
button {
  margin: 0px 10px;
  padding: 2px 3px;
}
</style>
