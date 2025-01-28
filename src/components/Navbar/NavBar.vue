<template>
  <nav class="navbar">
    <ul class="left">
      <li @click="navigateTo('home')">Home</li>
      <li @click="navigateTo('employee')">Employee</li>
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
  padding: 5px 25px 5px 0px;
  align-items: center;
  background: #333;
  color: white;
  max-height: 10vh;

  position: sticky;
  top: 0;
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
