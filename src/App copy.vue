<template>
  <div class="hi">
    <No1 />
    <hr />
    <No2 />
    <hr />
    <No3 />
    <hr />
    <No4 />
    <hr />
    <No5 />
    <hr />
  </div>
  <div class="">
    <EmployeeList />
  </div>
  <hr />
  <div class="Card">
    <Slot>
      <template #header>
        <h2>Test1</h2>
      </template>
      <template #content>
        <p>This is John Doe, our star employee for outstanding performance.</p>
      </template>
      <template #footer>
        <button @click="alerrt()">Congratulate</button>
      </template>
    </Slot>
  </div>
</template>

<script setup lang="ts">
import No1 from "./components/practice/No1.vue"
import No2 from "./components/practice/No2.vue"
import No3 from "./components/practice/No3.vue"
import No4 from "./components/practice/No4.vue"
import No5 from "./components/practice/No5.vue"

import EmployeeList from "./components/practice/No7EmployeeList.vue"
import Slot from "./components/tests/Slot.vue"

const alerrt = () => {
  alert("Yay!!")
}
</script>
<style scoped>
.Card {
  position: sticky;
  left: 5%;
}
</style>
