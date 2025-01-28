<script setup lang="ts">
import { ref, computed } from "vue"
import InputText from "../Input/InputText.vue"

const firstName = ref<string>("")
const lastName = ref<string>("")

const fullname = computed<string>(
  () =>
    firstName.value.toLocaleUpperCase() +
    " " +
    lastName.value.toLocaleUpperCase()
)
</script>

<template>
  <container>
    <p>firstname</p>
    <InputText v-model:input="firstName" :required="false" />
    <p>lastname</p>
    <InputText v-model:input="lastName" :required="false" />
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
