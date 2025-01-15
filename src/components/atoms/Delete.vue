<template>
  <div class="modal-overlay">
    <form @submit.prevent="deleteSubmit">
      <div class="Head"></div>

      <div class="Content">
        <img src="../../assets/trashFill.svg" alt="DeleteLogo" />
        <h3><span>Delete</span></h3>
        <p class="delete-message">
          Are you sure you want to delete selected items ?
        </p>
      </div>

      <div class="Footer">
        <button class="cancel" type="button" @click="goback">Cancel</button>
        <button class="save" type="submit" @click="deleteSubmit">Delete</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{
  id: string;
}>();

const dataId = ref<string>();


const goback = () => {
  emit("back", false);
};
const deleteSubmit = () => {
  emit("back", false);
  emit("deleteSubmit", props.id);
};

const emit = defineEmits<{
  (e: "back", value: boolean): void;
  (e: "deleteSubmit", value: string): void;
}>();

onMounted(async () => {
  dataId.value = props.id;
});
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
