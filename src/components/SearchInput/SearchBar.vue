<template>
  <input
    type="text"
    :value="input"
    @input="updateInput"
    :placeholder="placeholder"
  />
</template>

<script setup lang="ts" generic="T">
defineProps<{
  input: T
  placeholder:string
}>()

const emit = defineEmits<{
  (e: "update:input", value: T): void
}>()

const updateInput = (event: Event) => {
  console.log((event.target as HTMLInputElement).value)
  emit("update:input", (event.target as HTMLInputElement).value as T)
}
// const searched = defineModel<string>('seachingValue');
</script>

<style scoped>
input {
  width: 150px;
  height: 30px;
  border-radius: 4px;
  border: solid 1px ;
  background-color: #ffffff;
  border: solid 1px #e3e7f0;

  font-size: 14px;
  padding: 0 0 0 8px;

  color: black;
  /* &:active::placeholder{
    color: black;
  } */
  &:focus {
    transition: all 0.3s;
    border: 1px solid #5119f0;
    outline: none;

    box-shadow: 0px 0px 0px 4px #efedff;
  }

  &:disabled {
    border: 1px solid #E3E7F0; 
    background-color: #F7F8FC;
  }
  &::placeholder{
    color: #A0ABBA;
  }
}
</style>
