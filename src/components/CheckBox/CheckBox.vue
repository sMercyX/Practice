<template>
  <div class="">
    <input
      type="checkbox"
      id="checkbox"
      :checked="checked"
      :disabled="disable"
      @change="$emit('checkedO', ($event.target as HTMLInputElement).checked)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  checked: boolean
  disable: boolean
}>()

defineEmits<{
  (e: "checkedO", checked: boolean): void
}>()
</script>

<style scoped>
input {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #e3e7f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;

  &::before {
    /* content: "✔"; */
    content: url(../Icon/correct.svg);
    width: 11.17px;
    height: 8.59px;

    font-size: 14px;
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -75%);
    z-index: 1;
  }
  &:hover {
    transition: 0.3s all;
    border: 2px solid #3900b9;
    &:checked {
      border: 2px solid #3900b9;
      background-color: #3900b9;
    }
  }

  &:focus {
    transition: 0.3s all;
    border: 2px solid #5118f0;
    outline: none;
    box-shadow: 0px 0px 0px 4px #efedff;
  }

  &:checked {
    background-color: #5218ef;
    border: 2px solid #5218ef;

    &::before {
      display: block;
    }

    &:disabled {
      background-color: #d3d9e3;
      border: none;
      &::before {
        color: #ffffff;
      }
    }
  }

  &:disabled {
    background-color: #eef2f6;
    border: 2px solid #a0abba;
  }
}
</style>
