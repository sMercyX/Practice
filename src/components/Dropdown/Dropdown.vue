<template>
  <!-- <div class="">
    <select @change="updateSelected" :value="modelValue" placeholder="hi">
      <option value="">ทั้งหมด</option>
      <option v-for="(item, index) in list" :key="index" :value="item.value">
        {{ item.text }}
      </option>
    </select>
  </div> -->

  <div class="outer">
    <button class="main" @click="toggle" type="button" :disabled="disable">
      {{ selectedText || "Please Select" }}
      <IconRightArrow class="icon" :class="isOpen ? 'iconUp' : 'iconDown'" />
    </button>
    <div class="dropdowns" v-if="isOpen">
      <ul>
        <li
          v-if="all"
          class="content"
          @click="selectItem({} as DropdownModel<T>)"
        >
          Please Select
        </li>
        <li
          class="content"
          v-for="(item, index) in list"
          :key="index"
          :value="item.value as string | number"
          :class="item.text == selectedText ? 'purple' : ''"
          @click="selectItem(item)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { computed, ref } from "vue"
import type { DropdownModel } from "../../types/types"
import IconRightArrow from "../Icon/IconRightArrow.vue"

const props = defineProps<{
  list: DropdownModel<T>[]
  modelValue: T
  disable: boolean
  all: boolean
}>()

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
  console.log(props.list)
  console.log(props.modelValue)
}

const selectedText = computed(() => {
  const selectedItem = props.list.find(
    (item) => item.value === props.modelValue
  )
  return selectedItem ? selectedItem.text : ""
})
const emit = defineEmits<{
  (e: "update:modelValue", value: T): void
}>()

const selectItem = (item: DropdownModel<T>) => {
  console.log(item.value)
  emit("update:modelValue", item.value)
  isOpen.value = false
}
</script>

<style scoped>
.outer {
  width: 160px;
  height: 32px;
  font-family: Sarabun;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  
}
.main {
  width: 100%;
  height: 100%;
  background-color: white;
  border: 1px solid #e3e7f0;
  border-radius: 4px;
  padding: 0px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  &:focus {
    outline: none;
    border-color: #7c3aed; /* Purple focus */
  }

  &:disabled {
    background-color: #f7f8fc;
    border: #e3e7f0;
    color: #a0abba;
  }
}

.dropdowns {
  border: 1px solid #e3e7f0;
  border-radius: 4px;
  position: relative;
  width: 100%;
  background-color: #fff;
  max-height: 130px;
  overflow-y: scroll;
  ul {
    padding: 2px 8px;
    margin: 2px 0;
  }

  .content {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 10px;
    border-radius: 4px;



    &:hover {
      transition: all 0.3s;
      background-color: #f7f8fc;
    }
  }
}

.purple {
  color: #5119f0;
}

.iconUp {
  transform: scale(1, 1) rotate(270deg);
}
.iconDown {
  transform: scale(1, 1) rotate(90deg);
}
.icon {
  width: 10px;
  height: 10px;
}
</style>
