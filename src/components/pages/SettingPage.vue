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
      <RouterView>
        <template #default="{ Component }">
          <Component :is="Component" />
        </template>
      </RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { eventBusKey, type EventList } from "../../types/eventButKey"
import mitt from "mitt"
import { provide } from "vue"

const router = useRouter()
const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute })
}

const eventBus = mitt<EventList>()
provide(eventBusKey, eventBus)
</script>

<style scoped>
.container {
  display: flex;
  width: 100vw;
  height: 95vh;
}

.LeftSide {
  position: sticky;
  height: 90vh;
  width: 160px;
  background: #F7F8FC;
  color: rgb(0, 0, 0);
  padding: 20px;
  div {
    cursor: pointer;

    width: auto;
    height: 28px;
    padding: 6px;
    margin-bottom: 4px;
    border-radius: 5px;
    text-align: left;
    transition: 0.3s;

    display: flex;
    align-items: center;
  }
}

.LeftSide div:hover {
  background: #EFEDFF;
  color: #5119F0;
}

.RightSide {
  height: 90vh;

  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
</style>
