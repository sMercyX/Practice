<template>
  <div class="container">
    <div class="LeftSide">
      <div @click="navigateTo('settingTeam')">Team</div>
      <div @click="navigateTo('settingPosition')">Position</div>
      <div @click="navigateTo('no1')">No.1</div>
      <div @click="navigateTo('no2')">No.2</div>
      <div @click="navigateTo('no3')">No.3</div>
      <div @click="navigateTo('no4')">No.4</div>
      <div @click="navigateTo('no5')">No.5</div>
      <div @click="navigateTo('no6')">No.6</div>
      <div @click="navigateTo('no7')">No.7</div>
    </div>
    <div class="RightSide">
      <RouterView >
        <template #default="{ Component}">
            <Component :is="Component"/>
        </template>
      </RouterView>
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
  width: 150px;
  background: #f7f7f7;
  color: rgb(0, 0, 0);
  padding: 20px;
  div {
    cursor: pointer;
    padding: 8px;
    margin-bottom: 10px;
    border-radius: 5px;
    text-align: left;
    transition: background 0.3s;
  }

  
}

.LeftSide div:hover {
  background: #f6ecff;
  color: purple;
}


.RightSide {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
</style>
