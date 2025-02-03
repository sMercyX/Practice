<template>
  <button :class="size == 'sm' ? 'smIcon' : 'mdIcon'" :disabled="disable">
    <slot name="icon" class="hi"></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  size: "sm" | "md"
  disable: boolean
}>()
</script>

<style scoped>
button {
  border: none;
  background-color: transparent;
  border-radius: 42px;
  color: var(--icon-color);
  cursor: pointer;



  &:hover {
    transition: all 0.3s;
    background-color: var(--icon-bg-color);
    color: var(--icon-hover-color);
  }
  &:disabled {
    color: var(--icon-disable-color);
    background-color: transparent;

  }
}
.smIcon {
  width: 24px;
  height: 24px;
  padding: 4px;
  color: #636D78;
}

.mdIcon {
  width: 32px;
  height: 32px;
  padding: 6px;
  color: #646D78;

}
</style>
