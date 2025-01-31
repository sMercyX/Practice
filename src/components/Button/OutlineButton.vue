<template>
  <button
    class="outlineButton"
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
.outlineButton {
  border-radius: 4px;
  background-color: transparent;
  color: #212121;
  border: 1px solid #e3e7f0;
  align-items: center;
  text-align: center;
  cursor: pointer;

  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;


  &:hover {
    transition: all 0.3s;
    background-color: #e3e7f0;
  }
  &:disabled {
    background-color: #f7f8fc;
    color: #a0abba;
  }
}

.smBtn {
  font-size: 12px;
  width: 110px;
  height: 24px;
  padding: 2px 12px;


}
.mdBtn {
  font-size: 13px;
  width: 110px;
  height: 32px;
  padding: 2px 12px;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
