<script setup lang="ts">
import { ref } from "vue";

const countEmployee = ref<number>(0)
</script>



<template>
  <head> 
    <h1>Employee {{ countEmployee }}</h1>
  </head>
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
