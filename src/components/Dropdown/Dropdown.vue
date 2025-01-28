<template>
  <select @change="updateSelected" :value="modelValue">
    <option value="">ทั้งหมด</option>
    <option v-for="(item, index) in list" :key="index" :value="item.value">
      {{ item.text }}
    </option>
  </select>
</template>

<script setup lang="ts" generic="T">
import type { DropdownModel } from "../../types/types"

defineProps<{
  list: DropdownModel<T>[]
  modelValue: T
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: T): void
}>()
const updateSelected = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value as T)
}
</script>

<style scoped></style>
