<template>
    <slot>
        
    </slot>
</template>

<script setup lang="ts">


const emit = defineEmits<{
  (e: "close", value: boolean): void;
}>();

</script>

<style scoped>

</style>