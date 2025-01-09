<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="close" @click="navigateTo('employee')">&times;</div>
      <form @submit.prevent="handleSubmit">
        <!-- First Name -->
        <label for="first_name">First Name</label>
        <InputText v-model:input="firstName" />

        <!-- Last Name -->
        <label for="last_name">Last Name</label>
        <InputText v-model:input="lastName" />

        <!-- Email -->
        <label for="email">Email</label>
        <InputText v-model:input="email" />

        <!-- Gender -->
        <label for="gender">Gender</label>
        <select v-model="gender" id="gender" required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <!-- Age -->
        <label for="age">Age</label>
        <input v-model="age" type="number" id="age" required />

        <!-- Team ID -->
        <label for="team_id">Team</label>
        <Dropdown v-model="selectedTeam" :list="teams" />

        <!-- Position ID -->
        <label for="position_id">Position</label>
        <Dropdown v-model="selectedPosition" :list="postions" />

        <!-- Submit Button -->
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Dropdown from "./Dropdown.vue";
import type { Employ1, Gender } from "../../types/types";
import { teamList, postionList } from "../../assets/data/firstData";
import InputText from "./InputText.vue";
import { useRouter } from "vue-router";

const teams = ref(teamList);
const postions = ref(postionList);
const genders = ref(["Male" , "Female" , "Polygender" , "Agender" , "Genderqueer" , "Bigender" , "Genderfluid" , "Non-binary"]);

const firstName = ref<string>("");
const lastName = ref<string>("");
const email = ref<string>("");
const gender = ref<Gender>("Male");
const age = ref<number>(0);
const selectedTeam = ref<number>(1);
const selectedPosition = ref<number>(1);
const router = useRouter();

const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute });
};

const handleSubmit = () => {
  const formData = ref<Employ1>({
    id: "",
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    gender: gender.value,
    age: age.value,
    team_id: selectedTeam.value,
    position_id: selectedPosition.value,
  });
  navigateTo('employee')
  console.log("Submitted Data:", formData.value);
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

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input,
select,
button {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
.close {
  display: flex;
  justify-content: right;
  color: red;
  font-size: 20px;
  cursor: pointer;
}
</style>
