<template>
  <select @change="updateSelected" :value="modelValue" >
    <option value="0">ทั้งหมด</option>
    <option v-for="item in list" :key="item.id" :value="item.id" >
      {{ item.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import type { Dropdown } from "../types";

defineProps<{
  list: Dropdown<number>[];
  // modelValue คือชื่อ Default ของค่า v-model
  modelValue: number;
}>();
// const emit = defineEmits(["update:modelValue"]);

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
const updateSelected = (event: Event) => {
  emit("update:modelValue", Number((event.target as HTMLInputElement).value));
};

//   const selected = defineModel<string>('selected');
</script>

<style scoped></style>
