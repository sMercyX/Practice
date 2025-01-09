<script setup lang="ts">
import { ref } from "vue";
import InputText from "./atoms/InputText.vue";

const firstName = ref<string>("");
const lastName = ref<string>("");
const fullName = ref<string>("");

const handleFullname = () => {
  fullName.value = (firstName.value + " " + lastName.value).toLocaleUpperCase();
};
</script>

<template>
  <container>
    <p>firstname</p>
    <InputText v-model:input="firstName" @blur="handleFullname" />

    <p>lastname</p>
    <InputText v-model:input="lastName" @blur="handleFullname" />

    <p>{{ fullName }}</p>
  </container>
</template>

<style scoped>
p {
  margin: 0px;
}
input {
  margin-bottom: 10px;
}
</style>
