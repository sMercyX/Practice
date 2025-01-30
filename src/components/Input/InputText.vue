<template>
  <input
    type="text"
    :value="input"
    @input="updateInput"
    :required="required"
    :placeholder="placeHolder"
    :disabled="disable"
  />
</template>

<script setup lang="ts">
defineProps<{
  input: string | number
  placeHolder: string
  disable: boolean
  required: boolean
}>()
const emit = defineEmits(["update:input"])
const updateInput = (event: Event) => {
  emit("update:input", (event.target as HTMLInputElement).value)
}
</script>

<style scoped>
input {
  width: 160px;
  height: 32px;
  border-radius: 4px;
  border: solid 1px #e3e7f0;
  background-color: #ffffff;
  font-size: 14px;
  padding-left: 8px;
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

/* 
input:hover {
  border: solid 1px #5119F0;
} */
</style>
