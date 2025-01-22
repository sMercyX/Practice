<template>
  <input
    type="text"
    :value="input"
    @input="updateInput"
    placeholder="GradeName"
  />
</template>

<script setup lang="ts" generic="T">
defineProps<{
  input: T
}>();

const emit = defineEmits<{
  (e: "update:input", value: T): void;
}>();

const updateInput = (event: Event) => {
  console.log((event.target as HTMLInputElement).value)
  emit("update:input", (event.target as HTMLInputElement).value as T);
  
};
// const searched = defineModel<string>('seachingValue');
</script>

<style scoped></style>
