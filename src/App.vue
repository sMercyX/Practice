<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/atoms/NavBar.vue';

</script>
<style scoped></style>
