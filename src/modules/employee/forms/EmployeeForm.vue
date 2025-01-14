<template>
  <div class="Top">
    <div class="Left">
      <h2 class="leftArrow" @click="navigateTo('employee')">&leftarrow;</h2>
      <h2>{{ isEditing ? "Edit" : "Create" }} Employee</h2>
    </div>
    <div class="Right">
      <button @click="navigateTo('employee')" class="cancelButton">Cancel</button>
      <button type="submit" form="myForm" class="confirmButton">Save</button>
    </div>
  </div>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="Header">
        <img
          src="../../../assets/editPen.svg"
          alt="Edit Icon"
          class="editIcon"
        />
        <h2>Basic Info</h2>
      </div>

      
      <form @submit.prevent="handleSubmit" class="Content" id="myForm">
        <div class="nameForm">
          <div class="up">
            <label for="first_name">First Name</label>
            <InputText v-model:input="firstName" :required="true" />
          </div>
          <div class="up">
            <label for="last_name">Last Name</label>
            <InputText v-model:input="lastName" :required="true" />
          </div>
        </div>

        <label for="email">Email</label>
        <InputText v-model:input="email" :required="true" />

        <!-- Gender -->
        <!-- <label for="gender">Gender</label>
        <select v-model="gender" id="gender" required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select> -->

        <!-- Age -->
        <!-- <label for="age">Age</label>
        <input v-model="age" type="number" id="age" required /> -->
        <div class="nameForm">
          <div class="up">
            <label for="team_id">Team</label>
            <Dropdown v-model="selectedTeam" :list="teams" />
          </div>
          <div class="up">
            <label for="position_id">Position</label>
            <Dropdown v-model="selectedPosition" :list="postions" />
          </div>
        </div>
        <hr />

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Dropdown from "../../../components/Dropdown/Dropdown.vue";
import type { Employ1, Gender } from "../../../types/types";
import {
  teamList,
  postionList,
  employeeList,
} from "../../../assets/data/firstData";
import InputText from "../../../components/Input/InputText.vue";
import { useRoute, useRouter } from "vue-router";
import { uuid } from "vue-uuid";
// import PenLogo from "../../../assets/editPen.svg";

const teams = ref(teamList);
const postions = ref(postionList);
// const genders = ref([
//   "Male",
//   "Female",
//   "Polygender",
//   "Agender",
//   "Genderqueer",
//   "Bigender",
//   "Genderfluid",
//   "Non-binary",
// ]);

const firstName = ref<string>("");
const lastName = ref<string>("");
const email = ref<string>("");
const gender = ref<Gender>("Male");
const age = ref<number>(0);
const selectedTeam = ref<number>(1);
const selectedPosition = ref<number>(1);
const router = useRouter();
const route = useRoute();

const isEditing = ref<boolean>(false);
const employeeId = ref<string | null>(null);

const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute });
};

onMounted(() => {
  employeeId.value = route.params.employeeId as string;
  if (employeeId.value) {
    isEditing.value = true;
    const employee = employeeList.find((e) => e.id === employeeId.value);
    if (employee) {
      firstName.value = employee.first_name;
      lastName.value = employee.last_name;
      email.value = employee.email;
      // gender.value = employee.gender;
      // age.value = employee.age;
      selectedTeam.value = employee.team_id;
      selectedPosition.value = employee.position_id;
    }
  }
});

// **Handle Submit for Both Add & Edit**
const handleSubmit = () => {
  if (isEditing.value && employeeId.value) {
    const index = employeeList.findIndex((e) => e.id === employeeId.value);
    if (index !== -1) {
      employeeList[index] = {
        id: employeeId.value,
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        gender: "Male",
        age: 0,
        team_id: selectedTeam.value,
        position_id: selectedPosition.value,
      };
    }
  } else {
    const formData: Employ1 = {
      id: uuid.v1(),
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      gender: gender.value,
      age: age.value,
      team_id: selectedTeam.value,
      position_id: selectedPosition.value,
    };
    employeeList.push(formData);
  }
  navigateTo("employee");
};
</script>

<style scoped>
.Top {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);

  .Left {
    display: flex;
    gap: 10px;

    .leftArrow{
      cursor: pointer;
      transition: all 0.3s;
    }
    .leftArrow:hover{
      scale: 110%;
    }
    h2 {
      padding: 0;
      margin: 0;
    }
  }

  .Right {
    display: flex;
    gap: 10px;

  
    .confirmButton{
      background-color: #5119f0;
      color: white;
    }
  }
}

button {
  background-color: #fafbfa;
  color: rgb(0, 0, 0);
  border: solid rgb(179, 179, 179) 1px;
  border-radius: 5px;
  padding: 5px 25px;

  transition: all 0.3s ;

  cursor: pointer;
}

button:hover {
  scale: 110%;
}

.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  max-width: 700px;
  width: 100%;
}

.Header {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  font-size: 15px;

  .editIcon {
    background-color: #efedff;
    color: #5019f0;
    border-radius: 10px;
    padding: 8px;
    width: 20px;
  }
}

.Content {
  display: flex;
  flex-direction: column;
  gap: 10px;

  input,
  select,
  button {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .nameForm {
    display: flex;
    gap: 10px;

    justify-content: space-between;
    width: 100%;
    .up {
      display: flex;
      flex-direction: column;
      width: 100%;

      input {
        width: auto;
      }
    }
  }
}
</style>
