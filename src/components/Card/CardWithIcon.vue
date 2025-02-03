<template>
  <div class="box">
    <div class="Content">
      <div class="Header">
        <slot name="Icon"></slot>
        <p>{{ title }}</p>
      </div>
      <slot name="content">
        <div class="con"></div>
      </slot>
    </div>
    <div>
      <slot name="footer">
        <div class="foot"></div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.box {
  min-width: 321px;
  width: max-content;
  max-width: 800px;

  min-height: auto;
  height: fit-content;
  max-height: 60vh;
  border-radius: 4px;
  /* box-shadow: 3px 4px 5px 4px rgba(69, 73, 87, 0.14); */
  box-shadow: 1px 1px 6px 0px #4549571F;


  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1px;

  .Content {
    width: fit-content;
    height: fit-content;
    border-radius: 4px 4px 0 0;
    padding: 10px 20px 10px 20px;

    /* border: 1px solid red; */
    .Header {
      display: flex;
      justify-content: start;
      align-items: center;
      height: 36px;
      gap: 10px;
      font-size: 18px;
      margin-bottom: 10px;

      font-family: Kanit;
      font-size: 18px;
      font-weight: 500;
      line-height: 26px;
      text-align: left;
      text-underline-position: from-font;
      text-decoration-skip-ink: none;
    }
  }
}
.con {
  height: 118px;
}
.foot {
  height: 40px;
}
</style>
