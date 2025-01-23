<template>
  <template v-if="isShow">
    <div class="modal-overlay">
      <slot > 

      </slot>
    </div>
  </template>
</template>

<script setup lang="ts">
defineProps<{ isShow: boolean }>();
</script>

<style scoped>
.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
</style>
