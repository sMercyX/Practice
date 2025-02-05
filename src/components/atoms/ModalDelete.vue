<template>
  <Modal :isShow="isOpen">
    <div class="overlay">
      <div class="Content">
        <IconBin2 class="icon" />
        <h3>Delete</h3>
        <p class="delete-message">
          Are you sure you want to delete selected items ?
        </p>
      </div>

      <div class="Footer">
        <OutlineButton :disable="false" size="md" text="Cancel"  @click="closeModal"/>
        <PrimaryButton class="red" :disable="false" size="md" text="Dekete" @click="onSave"/>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Modal from "./Modal.vue"
import IconBin2 from "../Icon/IconBin2.vue"
import OutlineButton from "../Button/OutlineButton.vue"
import PrimaryButton from "../Button/PrimaryButton.vue"

const isOpen = ref<boolean>(false)

let promise: Promise<boolean>
let _resolve!: (value: boolean | PromiseLike<boolean>) => void
let _reject!: (reason?: any) => void

function openModal() {
  isOpen.value = true
  return (promise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  }))
}

function closeModal() {
  _resolve(false)
  isOpen.value = false
}

function onSave() {
  _resolve(true)
  isOpen.value = false
}

defineExpose({
  openModal,
})
</script>

<style scoped>
.overlay {
  background-color: white;
  border-radius: 10px;
  width: 254px;
  height: 214px;
  padding: 33px;
  font-family: Sarabun;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
.icon {
  width: 72px;
  height: 72px;
  margin-bottom: 13px;
}
h3 {
  padding: 0;
  margin: 0;
  color: #890007;

  margin-bottom: 4px;

  font-family: Kanit;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
p {
  margin: 0 0 24px 0;
  padding: 0 13px;
  font-family: Sarabun;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.Content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .delete-message {
    text-align: center;
  }
}
.Footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .red{
    background-color: #F44F58;
  }
  .red:hover{
    background-color: #d4454d;

  }
}



</style>
