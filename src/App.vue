<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import NavBar from "./components/Navbar/NavBar.vue"
</script>
<style scoped></style>
