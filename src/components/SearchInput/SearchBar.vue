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
  width: 160px;
  height: 32px;
  border-radius: 4px;
  border: solid 1px ;
  background-color: #ffffff;
  font-size: 14px;
  padding: 0 0 0 8px;
  &:active::placeholder{
    color: black;
  }
  &:focus {
    transition: all 0.3s;
    border: 1px solid #5119f0;
    outline: none;

    &::placeholder{
      color: black;
    }
  }

  &:disabled {
    border: 1px solid #E3E7F0; 
    background-color: #F7F8FC;
  }
}
</style>
