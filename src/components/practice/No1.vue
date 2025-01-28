<template>
  <div>
    <button type="button" @click="count--">&minus;</button>
    <p>count : {{ count }}</p>
    <button type="button" @click="count++">&plus;</button>
  </div>
  <Test :data="ab" v-on:data="console.log($event)">
    <template #="{ value }"> {{ value }} </template>
  </Test>
  <!-- 
  <button @click="publishEvent()">++</button>
  <button @click="start()">start</button>
  <button @click="stop()">stop</button> -->
  <Box1 ref="modalBox"></Box1>
  <Box1e ref="modalBox"></Box1e>
</template>

<script setup lang="ts">
import { provide, ref } from "vue"
import Test from "./FixTest.vue"
import Box1 from "./box/box1.vue"
import Box1e from "./box copy/b1.vue"
import mitt from "mitt"
import { eventBusKey, type EventList } from "../../types/eventButKey"

const eventBus = mitt<EventList>()
provide(eventBusKey, eventBus)

// function publishEvent() {
//   eventBus.emit('countUppp')
// }

const count = ref<number>(0)
// function countUp() {

//   count.value++

// }
// function start() {

// eventBus.on('adsdfgghhjj',countUp)
// }

// function stop() {
//   eventBus.off('adsdfgghhjj')
// }
interface AB {
  a: string
}

const ab: AB = null!
</script>

<style scoped>
container {
  display: flex;
  align-items: center;

  margin: 10px 0px;
}
p {
  margin: 0px;
}
button {
  margin: 0px 10px;
  padding: 2px 3px;
}
</style>
