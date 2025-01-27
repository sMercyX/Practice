<template>
  <Modal :isShow="isOpen">
    <form @submit.prevent="handleSubmit">
      <div class="Head">
        <h3>
          {{ isEditing ? "Editing" : "Create" }} {{ header.toUpperCase() }}
        </h3>
        <div class="close" @click="isOpen = false">&times;</div>
      </div>
      <!-- First Name -->
      <div class="Content">
        <p>Fields Marked with an <span>*</span> are required</p>

        <label for="name">Team Name <span>*</span> </label>
        <InputText v-model:input="form.name" :required="true" />

        <label for="description">Description</label>
        <InputText v-model:input="form.description" :required="false" />
      </div>

      <!-- Submit Button -->
      <div class="Footer">
        <button class="cancel" type="button" @click="closeModal">Cancel</button>
        <button class="save" type="submit">Save</button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts" generic="T">
import { computed, ref } from "vue";
import InputText from "../Input/InputText.vue";
import Modal from "./Modal.vue";
import {
  type IModalEditMaster,
} from "../../types/modalForm1";

const props = defineProps<{
  header: string;
  dataProvider: IModalEditMaster;
}>();
const isOpen = ref<boolean>(false);

const dataProvider = props.dataProvider;
const form = dataProvider.form;

const isEditing = computed(() => {
  return !!form.value.id;
});

function openModal(id: string) {
  isOpen.value = true;
  dataProvider.loadData(id);
}
function closeModal() {
  isOpen.value = false;
}
defineExpose({
  openModal,
});

const header = ref<string>(props.header);

const handleSubmit = () => {
  dataProvider.onSubmit();
  isOpen.value = false;
};
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
  height: 20%;
}
.Content {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px 20px;
  height: 80%;
}
.Footer {
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 20px;
  margin: 5px 0;
  gap: 4px;
  height: 20%;
}
form {
  display: flex;
  flex-direction: column;
  background-color: rgb(247, 247, 247);
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 60vw;
  height: 40vh;
}

input,
select,
button {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.cancel {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
}
.save {
  background-color: #612bd5;
  color: white;
}
button {
  border: none;
  cursor: pointer;
  width: 30%;
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
  padding: 0;
  margin: 0;
}
</style>
