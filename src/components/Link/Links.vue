<template>
  <a :href="text" class="linkText" target="_blank">{{ text }}</a>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<style scoped>
.linkText {
  font-size: 14px;
  color: #5119f0;
  text-decoration: none;
  &:hover {
    color: #3900b9;
  }
}
</style>
