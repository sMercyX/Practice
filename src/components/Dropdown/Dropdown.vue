<template>
  <select @change="updateSelected" :value="modelValue">
    <option value="">ทั้งหมด</option>
    <option v-for="item in list" :key="item.value" :value="item.value">
      {{ item.text }}
    </option>
  </select>
</template>

<script setup lang="ts" generic="T"> 
import type { 
  // Dropdown, 
  Pos, 
  Team } from "../../types/types";

defineProps<{
  // list: Dropdown<T>[];
  list: (Team<T> | Pos<T>)[];

  // modelValue คือชื่อ Default ของค่า v-model
  modelValue: string;
}>();
// const emit = defineEmits(["update:modelValue"]);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
const updateSelected = (event: Event) => {
  emit("update:modelValue", ((event.target as HTMLInputElement).value));
};

//   const selected = defineModel<string>('selected');
</script>

<style scoped></style>
