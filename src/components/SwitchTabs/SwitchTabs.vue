<template>
  <div class="box">
    <div v-for="(dat, index) in data" :key="index" @click="selectTab(index)">
      <div class="content" :class="index == tabIndex ? 'active' : ''">
        {{ dat.header }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Data {
  header: string
}

defineProps<{
  data: Data[]
  tabIndex: number
}>()

const emit = defineEmits<{
  (e: "update:tabIndex", index: number): void
}>()

const selectTab = (index: number) => {
  console.log(index)
  emit("update:tabIndex", index)
}
</script>

<style scoped>
.box {
  display: flex;
  border: 1px solid #e3e7f0;
  border-radius: 4px;
  width: fit-content;

  /* outline: none;
  box-shadow: 0px 0px 0px 5px #e3e7f0; */
}
.content {
  display: flex;
  width: 117.5px;
  height: 32px;
  cursor: pointer;
  justify-content: center;
  align-items: center;

  font-family: Sarabun;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  background-color: #F7F8FC;
  color: #646D78;
  &:hover {
    color: #5119F0;
  }
}
.active {
  width: 115.5px;
  height: 30px;
  background-color: #F2EFFF;
  border: 1px solid #5119F0;
  border-radius: 4px;
  color: #5119F0;
  font-weight: 700;

}

</style>
