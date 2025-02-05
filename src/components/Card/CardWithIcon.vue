<template>
  <div class="box">
    <div class="Content">
      <div class="Header">
        <div v-if="$slots.Icon" class="IconWithBg">
          <slot name="Icon"></slot>
        </div>
        <p>{{ title }}</p>
      </div>
      <slot name="content">
        <div class="con"></div>
      </slot>
    </div>
    <div :class="{ Footers: $slots.footer}">
      <slot name="footer">
        <div :class="{foot:!$slots.content && !$slots.footer}"></div>
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
@import url("https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.box {
  min-width: 321px;
  width: max-content;
  max-width: 800px;

  min-height: auto;
  height: fit-content;
  max-height: 80vh;
  border-radius: 4px;
  /* box-shadow: 3px 4px 5px 4px rgba(69, 73, 87, 0.14); */
  box-shadow: 1px 1px 6px 0px #4549571f;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1px;

  .Content {
    width: fit-content;
    height: fit-content;
    border-radius: 4px 4px 0 0;
    padding: 20px;

    font-family: Sarabun;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;

    /* border: 1px solid red; */
    .Header {
      display: flex;
      justify-content: start;
      align-items: center;
      height: 36px;
      gap: 10px;
      font-size: 18px;
      margin-bottom: 20px;

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
  height: 88px;
}
.foot {
  height: 40px;
}

.Footers {
  width: 100%;
  height: 39px;
  font-size: 10px;
  background-color: #efedff;
  border-top: 1px solid #5119f0;
  border-radius: 0 0 4px 4px;
  color: #8f8f8f;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Headline;
  font-size: 10px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: var(--HeadlineSmallTracking);
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

</style>
