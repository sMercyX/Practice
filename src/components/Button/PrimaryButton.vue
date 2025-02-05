<template>
  <button
    class="primaryButton"
    :class="size == `sm` ? `smBtn` : `mdBtn`"
    :disabled="disable"
  >
    <div class="content">
      <div v-if="$slots.prefix" :class="size == 'sm' ? 'iconSm' : 'iconMd'">
        <slot name="prefix"></slot>
      </div>
      <div class="textsize" :class="size == 'sm' ? 'textSm' : 'textMd'">
        {{ text }}
      </div>
      <div v-if="$slots.suffix" :class="size == 'sm' ? 'iconSm' : 'iconMd'">
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
.primaryButton {
  border-radius: 4px;
  background-color: var(--button-create-main);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Sarabun;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

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
  gap: 4px;
}
.iconSm {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
}
.iconMd {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.textSize {
  font-family: Sarabun;
  font-weight: 700;
  line-height: 18px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  display: flex;
  justify-content: center;
  align-items: center;

}
.textSm {
  font-size: 12px;
}

.textMd {
  font-size: 14px;
}
</style>
