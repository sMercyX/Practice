<template>
  <Modal :isShow="isOpen">
    <div class="overlay">
      <div class="Head"></div>

      <div class="Content">
        <img src="../../assets/trashFill.svg" alt="DeleteLogo" />
        <h3><span>Delete</span></h3>
        <p class="delete-message">
          Are you sure you want to delete selected items ?
        </p>
      </div>

      <div class="Footer">
        <button class="cancel" type="button" @click="closeModal">Cancel</button>
        <button class="save" type="submit" @click="onSave">Delete</button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Modal from "./Modal.vue"

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
  padding: 20px 0;
  border-radius: 10px;
}
/* .modal-content {
    background: white;
    padding: 5px 20px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
  } */
span {
  color: red;
}
.Head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin: 5px 0;
  height: 5%;
}
.Content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 20px 20px;
  margin: 0 70px;
  height: 80%;

  img {
    width: 80px;
  }
  span {
    color: #890106;
  }
  .delete-message {
    text-align: center;
  }
}
.Footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  margin: 5px 0;
  gap: 4px;
  height: 35%;
}
form {
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 60vw;
  height: 40vh;
}

.cancel {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
}
.save {
  background-color: #f44e58;
  color: white;
}
button {
  cursor: pointer;
  width: 30%;
  padding: 10px;
  border: 1px solid #e3e7f0;
  border-radius: 5px;
  transition: all 0.3s;
}
button:hover {
  scale: 110%;
}

.close {
  display: flex;
  justify-content: right;
  color: red;
  font-size: 20px;
  cursor: pointer;
}
p {
  margin: 0;
  padding: 0;
}
</style>
