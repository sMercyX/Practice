<script setup lang="ts">
import { ref } from "vue";

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
    <input 
      type="text" 
      v-model="firstName" 
      @blur="handleFullname"
    />
    <p>lastname</p>
    <input 
      type="text" 
      v-model="lastName" 
      @blur="handleFullname"
    />
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