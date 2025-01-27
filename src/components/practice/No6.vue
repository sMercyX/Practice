<template>
  <div>
    <p>Items:</p>
    <ul>
      <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>
    <button @click="addItem">Add Item</button>
    <button @click="replaceArrayBreak">Replace Array (Break)</button>
    <button @click="replaceArrayNoBreak">Replace Array (No Break)</button>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const items = reactive(["Item 1", "Item 2"]);

// This works because Vue tracks array mutation methods
function addItem() {
  items.push(`Item ${items.length + 1}`); // Reactive change
}

// This causes reactivity to break
function replaceArrayBreak() {
  items = ["New Item 1", "New Item 2"]; // Reassigning the array breaks reactivity
}

function replaceArrayNoBreak() {
  items.splice(0, items.length, "New Item 1", "New Item 2"); // Clear and add new items
}
</script>
