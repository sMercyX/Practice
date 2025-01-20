<template>
  <div class="Top">
    <div class="Left">
      <h2 class="leftArrow" @click="navigateTo('employee')">&leftarrow;</h2>
      <h2>{{ isEditing ? "Edit" : "Create" }} Employee</h2>
    </div>
    <div class="Right">
      <button @click="navigateTo('employee')" class="cancelButton">
        Cancel
      </button>
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
        <div class="breakHalf">
          <div class="groupUp">
            <label for="first_name">First Name <span>*</span></label>
            <InputText v-model:input="firstName" :required="true" />
          </div>
          <div class="groupUp">
            <label for="last_name">Last Name <span>*</span></label>
            <InputText v-model:input="lastName" :required="true" />
          </div>
        </div>
        <div class="groupUp">
          <label for="email">Email <span>*</span></label>
          <InputText v-model:input="email" :required="true" />
        </div>

        <div class="breakHalf">
          <div class="groupUp">
            <label for="team_id">Team <span>*</span></label>
            <Dropdown v-model="selectedTeam" :list="teams" />
          </div>
          <div class="groupUp">
            <label for="position_id">Position <span>*</span></label>
            <Dropdown v-model="selectedPosition" :list="postions" />
          </div>
        </div>

        <hr />
        <div class="breakHalf">
          <label for="phone">Phone Numbers</label>
          <div class="add-button" @click="addPhone()">&plus; Phone</div>
        </div>
        <div class="phone-list">
          <div v-for="(phone, index) in phones" :key="index" class="phone-item">
            <InputText v-model:input="phones[index].phoneNumber" :required="true" />
            <button
              v-if="phones.length > 1"
              class="remove-button"
              type="button"
              @click="removePhone(index)"
            >
              &minus;
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Dropdown from "../../../components/Dropdown/Dropdown.vue";
import type { Employ1 } from "../../../types/types";
import InputText from "../../../components/Input/InputText.vue";
import { useRoute, useRouter } from "vue-router";
import { uuid } from "vue-uuid";
import { getItems, postItem } from "../../../utils/fetch";
// import PenLogo from "../../../assets/editPen.svg";

const teams = ref();
const postions = ref();
const employee = ref();

const firstName = ref<string>("");
const lastName = ref<string>("");
const email = ref<string>("");
const dateOfBirth = ref<number>(0);
const phones = ref<any>([]);

const addPhone = () => {
  phones.value.push({}); // Add a new empty phone number input
};

const removePhone = (index:any) => {
  phones.value.splice(index, 1); 
};
const selectedTeam = ref<string>("");
const selectedPosition = ref<string>("");
const router = useRouter();
const route = useRoute();

const isEditing = ref<boolean>(false);
const employeeId = ref<string | null>(null);

const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute });
};

const loadData = async (employeeId: string) => {
  try {
    const datas = await getItems(
      `${import.meta.env.VITE_BASE_URL}/Employee/GetDetail?id=${employeeId}`
    );
    employee.value = datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};
const loadPositionDropDown = async () => {
  try {
    const datas = await getItems(
      `${import.meta.env.VITE_BASE_URL}/position/getPositionDropdown`
    );
    postions.value = datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};
const loadTeamDropDown = async () => {
  try {
    const datas = await getItems(
      `${import.meta.env.VITE_BASE_URL}/team/getTeamDropdown`
    );
    teams.value = datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const updateEmployee = async (employeeData: Employ1) => {
  try {
    const datas = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Employee/Update`,
      employeeData
    );
    employee.value = datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};
const createEmployee = async (employeeData: Employ1) => {
  try {
    const datas = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Employee/Create`,
      employeeData
    );
    employee.value = datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};
// **Handle Submit for Both Add & Edit**
const handleSubmit = () => {
  if (isEditing.value && employeeId.value) {
    // const index = employeeList.findIndex((e) => e.id === employeeId.value);
    if (isEditing.value) {
      const formData: Employ1 = {
        employeeIdId: employeeId.value,
        firstname: firstName.value,
        lastname: lastName.value,
        email: email.value,
        dateOfBirth: "",
        phones: phones.value,
        teamId: selectedTeam.value,
        positionId: selectedPosition.value,
      };
      console.log(phones.value)
      updateEmployee(formData);
    }
  } else {
    const formData: Employ1 = {
      employeeIdId: uuid.v1(),
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      dateOfBirth: "",
      phones: phones.value,
      teamId: selectedTeam.value,
      positionId: selectedPosition.value,
    };
    createEmployee(formData);
    // employeeList.push(formData);
  }
  navigateTo("employee");
};

(async () => {
  employeeId.value = route.params.employeeId as string;
  await loadData(employeeId.value);
  await loadTeamDropDown();
  await loadPositionDropDown();

  if (employeeId.value) {
    isEditing.value = true;
    if (employee.value) {
      firstName.value = employee.value.firstname;
      lastName.value = employee.value.lastname;
      email.value = employee.value.email;
      dateOfBirth.value = employee.value.dateOfBirth;
      phones.value = employee.value.phones;
      selectedTeam.value = employee.value.teamId;
      selectedPosition.value = employee.value.positionId;
    }
  }
})();

// onMounted(() => {
//   employeeId.value = route.params.employeeId as string;
//   if (employeeId.value) {
//     isEditing.value = true;
//     const employee = employeeList.find((e) => e.id === employeeId.value);
//     if (employee) {
//       firstName.value = employee.first_name;
//       lastName.value = employee.last_name;
//       email.value = employee.email;
//       // gender.value = employee.gender;
//       // age.value = employee.age;
//       selectedTeam.value = employee.teamId;
//       selectedPosition.value = employee.positionId;
//     }
//   }
// });
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

    .leftArrow {
      cursor: pointer;
      transition: all 0.3s;
    }
    .leftArrow:hover {
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

    .confirmButton {
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

  transition: all 0.3s;

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

  .breakHalf {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .groupUp {
    display: flex;
    flex-direction: column;
    width: 100%;

    input {
      width: auto;
    }
  }
}

.add-button {
  cursor: pointer;
  color: #5119f0;
}
.phone-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.phone-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
span {
  color: red;
}
</style>
