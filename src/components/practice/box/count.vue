<template>
  <p>count : {{ count }}</p>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
function add(){
    count.value = count.value + 1
}
defineExpose({
  count,
  add
});
</script>

<style scoped></style>
