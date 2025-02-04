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
  width: 148px;
  height: 28px;
  border-radius: 4px;
  border: solid 1px #e3e7f0;
  background-color: #ffffff;
  font-size: 14px;
  padding: 0 0 0 10px;

  font-family: Sarabun;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  &::placeholder {
    color: #a0abba;
  }
 
  &:focus {
    transition: all 0.3s;
    border: 1px solid #5119f0;
    outline: none;
    box-shadow: 0px 0px 0px 2px #efedff;
  }
  &:focus::placeholder {
    color: #A0ABBA;
  }
  &:disabled {
    border: 1px solid #e3e7f0;
    background-color: #f7f8fc;
    color: #A0ABBA;

  }
  &:focus:disabled {
    border: 1px solid #e3e7f0;
    background-color: #f7f8fc;
    color: #A0ABBA;
  }
  
}

/* 
input:hover {
  border: solid 1px #5119F0;
} */
</style>
