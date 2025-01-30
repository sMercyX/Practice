<template>
  <button
    class="primartButton"
    :class="size == `sm` ? `smBtn` : `mdBtn`"
    :disabled="disable"
  >
    <div class="content">
      <slot name="prefix"></slot>
      {{ text }}
      <slot name="suffix"></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  size: "sm" | "md"
  disable: boolean
}>()
</script>

<style scoped>
.primartButton {
  border-radius: 4px;
  background-color: var(--button-create-main);
  color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    transition: all 0.3s;
    background-color: var(--button-create-hover);
  }
  &:disabled {
    background-color: var(--button-create-disabled);
  }
}

.smBtn {
  font-size: 12px;
  width: 110px;
  height: 24px;
}
.mdBtn {
  font-size: 13px;
  width: 110px;
  height: 32px;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
