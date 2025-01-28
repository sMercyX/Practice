<template>
  <div>
    <slot :value="data"></slot>
  </div>
</template>

<script setup lang="ts" generic="T">
const props = defineProps<{
  data: T
}>()
const emit = defineEmits<{
  (e: "data", value: T): void
}>()

emit("data", props.data)
</script>

<style scoped></style>
