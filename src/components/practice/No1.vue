<template>
  <container>
    <button type="button" @click="count--">&minus;</button>
    <p>count : {{ count }}</p>
    <button type="button" @click="count++">&plus;</button>
  </container>
  <Test :data="ab" @data="console.log($event)">
    <template #="{ value }"> {{ value }} </template>
  </Test>

  <Box1></Box1>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Test from "./FixTest.vue";
import Box1 from "./box/box1.vue";

const count = ref<number>(0);

interface AB {
  a: string;
}

const ab: AB = null!;
</script>

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
