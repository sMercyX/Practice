<template>
  <Modal :isShow="isOpen">
    <div class="container">
      <div class="box">
        <div class="cc">
          {{ count }}
          <button @click="addCount()">+</button>
        </div>
        <Box2></Box2>
      </div>
      <button @click="closeModal">close</button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Box2 from "./box2.vue";
import { provide, ref } from "vue";
import { key } from "./key";
import Modal from "../../atoms/Modal.vue";

const isOpen = ref<boolean>(false);

// let promise: Promise<boolean>;
// let _resolve!: (value: boolean | PromiseLike<boolean>) => void;
// let _reject!: (reason?: any) => void;

// const openModal = () =>{
//     isOpen.value = true
//     return (promise = new Promise((resolve, reject) => {
//     _resolve = resolve;
//     _reject = reject;
//   }));

// }
// function closeModal() {
//     _resolve(false)
//   isOpen.value = false;
// }

const openModal = () => {
  isOpen.value = true;
};

function closeModal() {
  isOpen.value = false;
}

defineExpose({
  openModal,
});

const count = ref<number>(0);
function addCount() {
  count.value = count.value + 1;
}
provide(key, {
  count,
  addCount,
});
</script>

<style scoped>
.cc {
  height: 10px;
  top: 0;
  p {
    margin: 0;
    padding: 0;
  }
}
.box {
  display: flex;
  /* align-items: center; */
  justify-content: center;
  width: 250px;
  height: 250px;
  border: black 1px solid;
}

.container {
  background-color: white;
  padding: 20px;
}
</style>
