<template>
    <div class="container">
      <div class="box">
        <div class="cc">
        </div>
        <Box2></Box2>
      </div>
    </div>
</template>

<script setup lang="ts">
import Box2 from "./b2.vue"


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

.container {
  background-color: white;
  padding: 20px;
}
</style>
