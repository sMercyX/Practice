<template>
  <div class="modal-overlay">
    <form @submit.prevent="handleSubmit">
      <div class="Head">
        <h3>
          {{ isEditing ? "Editing" : "Create" }} {{ header.toUpperCase() }}
        </h3>
        <div class="close" @click="goback">&times;</div>
      </div>
      <!-- First Name -->
      <div class="Content">
        <p>Fields Marked with an <span>*</span> are required</p>

        <label for="name">Team Name <span>*</span> </label>
        <InputText v-model:input="Name" :required="true" />

        <label for="description">Description</label>
        <InputText v-model:input="Description" :required="false" />
      </div>

      <!-- Submit Button -->
      <div class="Footer">
        <button class="cancel" type="button" @click="goback">Cancel</button>
        <button class="save" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Dropdown, Team as TeamType } from "../../types/types";
import InputText from "../Input/InputText.vue";
import { useRoute, useRouter } from "vue-router";
import { postItem } from "../../utils/fetch";

const datas = ref();

const Name = ref<string>("");
const Description = ref<string>("");

const router = useRouter();
const route = useRoute();
const isEditing = ref<boolean>(false);
const dataId = ref<string>();

const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute });
};

const props = defineProps<{
  id: string;
  data: TeamType[];
  header: string;
}>();
const header = ref<string>(props.header);
const headerId = ref<string>(header.value + "Id");

const goback = () => {
  return emit("back", false);
};

const emit = defineEmits<{
  (e: "back", value: boolean): void;
}>();

const uploadData = async (data: Dropdown) => {
  try {
    await postItem(
      `${import.meta.env.VITE_BASE_URL}/${header.value}/create`,
      data
    );
  } catch (error) {
    console.error("Error loading data:", error);
  }
};
const updateData = async (data: any) => {
  try {
    await postItem(
      `${import.meta.env.VITE_BASE_URL}/${header.value}/update`,
      data
    );
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const handleSubmit = () => {
  if (isEditing.value && dataId.value) {
    const index = datas.value.findIndex(
      (e: any) => e[headerId.value] === dataId.value
    );
    if (index !== -1) {
      const formData = {
        name: Name.value,
        description: Description.value,
        [headerId.value]: dataId.value,
      };
      datas.value[index] = formData;
      updateData(formData);
    }
  } else {
    const formData: Dropdown = {
      name: Name.value,
      description: Description.value,
    };
    uploadData(formData);
  }
  goback();
};

onMounted(async () => {
  dataId.value = props.id;
  datas.value = props.data;

  if (dataId.value) {
    isEditing.value = true;
    const dataa = datas.value.find(
      (e: any) => e[headerId.value] === dataId.value
    );
    if (dataa) {
      Name.value = dataa.name;
      Description.value = dataa.description;
    }
  }
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
