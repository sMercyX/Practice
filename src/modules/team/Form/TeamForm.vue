<template>
  <div class="modal-overlay">
      <form @submit.prevent="handleSubmit">
        <div class="Head">
          <h3>{{ isEditing ? "Editing" : "Create" }} Team</h3>
          <div class="close" @click="router.go(-1)">&times;</div>
        </div>
        <!-- First Name -->
        <div class="Content">
          <p>Fields Marked with an <span>*</span> are required</p>

          <label for="name" >Team Name <span>*</span> </label>
          <InputText v-model:input="Name" :required="true"/>

          <label for="describtion">Describtion</label>
          <InputText v-model:input="Description" :required="false"/>
        </div>

        <!-- Submit Button -->
        <div class="Footer">
          <button class="cancel" type="button" @click="router.go(-1)">Cancel</button>
          <button class="save" type="submit">Save</button>
        </div>
      </form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Dropdown } from "../../../types/types";
import { teamList } from "../../../assets/data/firstData";
import InputText from "../../../components/Input/InputText.vue";
import { useRoute, useRouter } from "vue-router";

const teams = ref(teamList);

const Name = ref<string>("");
const Description = ref<string>("");

const router = useRouter();
const route = useRoute();
const isEditing = ref<boolean>(false);
const teamId = ref<number>();

const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute });
};

onMounted(() => {
  teamId.value = parseInt(route.params.teamId as string);
  if (teamId.value) {
    isEditing.value = true;
    const team = teams.value.find((e) => e.id === teamId.value);
    if (team) {
      Name.value = team.name;
    }
  }
});

// **Handle Submit for Both Add & Edit**
const handleSubmit = () => {
  if (isEditing.value && teamId.value) {
    const index = teams.value.findIndex((e) => e.id === teamId.value);
    if (index !== -1) {
      teams.value[index] = {
        id: teamId.value,
        name: Name.value,
      };
    }
  } else {
    const formData: Dropdown<number> = {
      id: teams.value.length + 1,
      name: Name.value,
    };
    teams.value.push(formData);
  }
  navigateTo("settingTeam");
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
}

.close {
  display: flex;
  justify-content: right;
  color: red;
  font-size: 20px;
  cursor: pointer;
}

p{
  padding: 0;
  margin: 0;
}
</style>
