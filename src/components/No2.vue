<script setup lang="ts">
import { ref, computed } from "vue";

const firstName = ref<string>("");
const lastName = ref<string>("");

const fullname = computed<string>(() => firstName.value.toLocaleUpperCase() + " " + lastName.value.toLocaleUpperCase());
</script>

<template>
  <container>
    <p>firstname</p>
    <input type="text" v-model="firstName" />
    <p>lastname</p>
    <input type="text" v-model="lastName" />
    <p>{{ fullname }}</p>
  </container>
</template>

<style scoped>
p {
  margin: 0px;
}
button {
  margin: 0px 10px;
  padding: 2px 3px;
}
</style>
