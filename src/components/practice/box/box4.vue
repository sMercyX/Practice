<template>
  <div class="box4">
    <!-- <Count ref="c" /> -->
    <!-- <button type="button" @click="addCountttt()">&plus;</button> -->
    {{ count }}
    <!-- {{ foo.count }} -->
    <button type="button" @click="addCount()">&plus;</button>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { key } from "./key";


const { count, addCount } = inject(key)!
</script>

<style scoped>
.box4 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: black 1px solid;
}
</style>
