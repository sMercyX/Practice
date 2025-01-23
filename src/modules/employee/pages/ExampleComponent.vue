<template>
  <div
    :style="{
      width: '50px',
      height:'100%',
      backgroundColor: bgColor,
    }"
  >
  {{ count }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const bgColor = ref("black");
const count = ref(0)
function setColor() {
  bgColor.value = "red";
}
defineExpose({
    setColor,
    count
})
</script>

<style scoped></style>
