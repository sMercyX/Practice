<script setup lang="ts"></script>

<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  width: 250px;
  border: 1px solid black;
  padding: 10px;
}
p {
  margin: 0px;
}
</style>
