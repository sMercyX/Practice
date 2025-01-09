<template>
  <input type="text" :value="input" @input="updateInput" />
</template>

<script setup lang="ts">
defineProps<{
  input: string; 
}>();

const emit = defineEmits(["update:input"]);

const updateInput = (event: Event) => {
  emit("update:input", (event.target as HTMLInputElement).value);
};
// const searched = defineModel<string>('seachingValue');
</script>

<style scoped></style>
