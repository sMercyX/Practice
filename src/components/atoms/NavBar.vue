<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <a>Logo</a>
    </div>
    <ul class="navbar-links">
      <li @click="navigateTo('home')">Home</li>
      <li @click="navigateTo('employee')">Employee</li>
      <li @click="navigateTo('setting')">Setting</li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute });
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding:16px;
  align-items: center;
  background: #333;
  color: white;
  max-height: 10vh;

  position: sticky;
  top: 0;
}

.navbar li {
  text-decoration: none;
  color: white;
  cursor: pointer;
}

.navbar-logo a {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.navbar-links li:hover {
  text-decoration: underline;
}
</style>
