<template>
  <div class="box4">
    <!-- <Count ref="c" /> -->
    <!-- <button type="button" @click="addCountttt()">&plus;</button> -->
    <button type="button" @click="publishEvent">&plus;</button>
  </div>
</template>

<script setup lang="ts">
import type { Emitter, EventType } from "mitt"
import { inject } from "vue"
import { eventBusKey } from "../../../types/eventButKey"

const eventBus = inject(eventBusKey)!

function publishEvent() {
  eventBus.emit("countUppp", Math.random() * 100)
}
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
