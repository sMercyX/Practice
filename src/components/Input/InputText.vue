<template>
  <input type="text" :value="input" @input="updateInput" :required="required" />
</template>

<script setup lang="ts">
defineProps<{
  input: string
  required: boolean
}>()
const emit = defineEmits(["update:input"])
const updateInput = (event: Event) => {
  emit("update:input", (event.target as HTMLInputElement).value)
}
</script>

<style scoped></style>
