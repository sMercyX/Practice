<template>
  <div class="card">
    <div class="card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>

    <!-- Content Slot for Body Text -->
    <div class="card-content">
      <slot name="content"> hi </slot>
    </div>

    <!-- Footer Slot for Buttons or Links -->
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props needed, fully slot-based for flexibility.
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  max-width: 300px;
  background-color: white;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

.card-header {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-image img {
  max-width: 100%;
  border-radius: 10px;
}

.card-content {
  font-size: 1rem;
  color: #333;
}

.card-footer {
  margin-top: 12px;
  text-align: right;
}
</style>
