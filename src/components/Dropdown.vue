<template>
  <select @change="updateSelected">
    <option value="">ทั้งหมด</option>
    <option v-for="team in list" :key="team.id" :value="team.name">
      {{ team.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import type { Dropdown } from "../types";

defineProps<{
  header: string;
  list: Dropdown<number>[];
  selected: string;
}>();
const emit = defineEmits(["update:selected"]);
const updateSelected = (event: Event) => {
  emit("update:selected", (event.target as HTMLInputElement).value);
};

//   const selected = defineModel<string>('selected');
</script>

<style scoped></style>
