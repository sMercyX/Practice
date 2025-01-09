<template>
  <select @change="updateSelected" :value="selected" >
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
  selected: number;
}>();
const emit = defineEmits(["update:selected"]);
const updateSelected = (event: Event) => {
  emit("update:selected", (event.target as HTMLInputElement).value);
};

//   const selected = defineModel<string>('selected');
</script>

<style scoped></style>
