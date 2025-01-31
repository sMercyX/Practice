<template>
  <div class="box">
    <div class="Content">
      <div class="Header">
        <slot name="Icon"></slot>
        <p>{{ title }}</p>
      </div>
      <slot name="content"> </slot>
    </div>
    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
.box {
  min-width: 321px;
  width: fit-content;
  max-width: 800px;

  min-height: 225px;
  height: fit-content;
  max-height: 60vh;
  border-radius: 4px;
  box-shadow: 3px 4px 5px 4px rgba(69, 73, 87, 0.14);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1px;


  .Content {
    width: 100%;
    height: 80%;
    border-radius: 4px 4px 0 0;
    padding: 10px 20px 0 20px;

    /* border: 1px solid red; */
    .Header {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 10px;

      font-size: 18px;
    }
  }
}
</style>
