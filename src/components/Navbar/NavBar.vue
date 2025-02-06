<template>
  <nav class="navbar">
    <ul class="left">
      <li @click="navigateTo('home')">Home</li>
      <li @click="navigateTo('employee')">Employee</li>
      <li @click="navigateTo('error')">Error</li>
    </ul>

    <div class="right">
      <div @click="navigateTo('settingTeam')">Setting</div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()
const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute })
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  height: 5vh;

  padding-right:  25px;
  align-items: center;
  background: #333;
  color: white;

  position: sticky;
  top: 0;

  z-index: 1;
  .left {
    display: flex;
    gap: 25px;
    list-style: none;
    color: white;
    cursor: pointer;
  }
  .right {
    display: flex;
    list-style: none;
    color: white;
    cursor: pointer;
  }
}

/* .navbar {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  background: #333;
  color: white;
  max-height: 10vh;

  position: sticky;
  top: 0;
}
.navbar-left{
  list-style: none;
  display: flex;

}
.navbar li {
  display: flex;
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
} */
</style>
