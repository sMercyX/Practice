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
  color: #5119f0;
  text-decoration: none;

  font-family: Sarabun;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  &:hover {
    color: #3900b9;
  }
}
</style>
