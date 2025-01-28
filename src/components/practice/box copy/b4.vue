<template>
  <div class="box4">
    <!-- <Count ref="c" /> -->
    <!-- <button type="button" @click="addCountttt()">&plus;</button> -->
    {{ count }}
    <!-- {{ foo.count }} -->
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue"
import { eventBusKey } from "../../../types/eventButKey"

const count = ref<number>(0)

const eventBus = inject(eventBusKey)!
eventBus.on("countUppp", (e) => {
  count.value = e
})
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
