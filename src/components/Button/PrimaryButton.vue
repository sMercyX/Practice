<template>
  <button
    class="primartButton"
    :class="size == `sm` ? `smBtn` : `mdBtn`"
    :disabled="disable"
  >
    <div class="content">
      <div class="icon">
        <slot name="prefix"></slot>
      </div>
      {{ text }}
      <div class="icon">
        <slot name="suffix"></slot>
      </div>
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

  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;

  
  &:hover {
    transition: all 0.3s;
    background-color: var(--button-create-hover);
  }
  &:disabled {
    background-color: var(--button-create-disabled);
  }
}

.smBtn {
  width: 110px;
  height: 24px;
  padding: 2px 12px;
  font-size: 12px;
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

  gap: 8px;
}
</style>
