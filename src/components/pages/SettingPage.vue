<template>
  <div class="container">
    <div class="LeftSide">
      <div @click="navigateTo('no1')">Team Management</div>
      <div @click="navigateTo('no1')">Position Management</div>
      <div @click="navigateTo('no1')">test basic vue 1</div>
      <div @click="navigateTo('no2')">test basic vue 2</div>
      <div @click="navigateTo('no3')">test basic vue 3</div>
      <div @click="navigateTo('no4')">test basic vue 4</div>
      <div @click="navigateTo('no5')">test basic vue 5</div>
      <div @click="navigateTo('no6')">test basic vue 6</div>
      <div @click="navigateTo('no7')">test basic vue 7</div>
    </div>
    <div class="RightSide">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute });
};
</script>

<style scoped>
.container {
  display: flex;
  height: 85vh;
}

.LeftSide {
  position: sticky;
  top: 10vh;
  height: 85vh;
  width: 250px;
  background: #333;
  color: white;
  padding: 20px;
  border-right: 2px solid black;
  div {
    cursor: pointer;
    padding: 10px;
    margin-bottom: 10px;
    background: #444;
    border-radius: 5px;
    text-align: center;
    transition: background 0.3s;
  }
}

.LeftSide div:hover {
  background: #555;
}

.RightSide {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
</style>
