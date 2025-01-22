<template>
  <div class="Top">
    <div class="Left">
      <h2 class="leftArrow" @click="navigateTo('employee')">&leftarrow;</h2>
      <h2>{{ isEditing ? "Edit" : isView ? "View" : "Create" }} Employee</h2>
    </div>
    <div class="Right">
      <button @click="navigateTo('employee')" class="cancelButton">
        Cancel
      </button>
      <button
        type="submit"
        form="myForm"
        class="confirmButton"
        :disabled="isView"
      >
        Save
      </button>
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
            <p v-if="isView">{{ firstName }}</p>
            <InputText
              v-if="!isView"
              v-model:input="firstName"
              :required="true"
            />
          </div>
          <div class="groupUp">
            <label for="last_name">Last Name <span>*</span></label>
            <p v-if="isView">{{ lastName }}</p>
            <InputText
              v-if="!isView"
              v-model:input="lastName"
              :required="true"
            />
          </div>
        </div>
        <div class="groupUp">
          <label for="email">Email <span>*</span></label>
          <p v-if="isView">{{ email }}</p>
          <InputText v-if="!isView" v-model:input="email" :required="true" />
        </div>

        <div class="breakHalf">
          <div class="groupUp">
            <label for="team_id">Team <span>*</span></label>
            <p v-if="isView">{{ teamName }}</p>
            <Dropdown v-if="!isView" v-model="selectedTeam" :list="teams" />
          </div>
          <div class="groupUp">
            <label for="position_id">Position <span>*</span></label>
            <p v-if="isView">{{ positionName }}</p>
            <Dropdown
              v-if="!isView"
              v-model="selectedPosition"
              :list="postions"
            />
          </div>
        </div>

        <hr />
        <div class="breakHalf">
          <label for="phone">Phone Numbers</label>
          <button
            class="add-button"
            @click="addPhone"
            type="button"
            v-if="!isView"
          >
            &plus; Phone
          </button>
        </div>
        <div class="phone-list">
          <InputText
            v-model:input="phones[0].phoneNumber"
            :required="true"
            :readonly="isView"
            v-if="!isView"
          />

          <p v-if="isView">
            {{ phones[0].phoneNumber }}
          </p>
          <div
            v-if="phones.length > 1"
            v-for="(phone, index) in phones.slice(1)"
            :key="index + 1"
            class="phone-item"
          >
            <p v-if="isView">
              {{ phone.phoneNumber }}
            </p>
            <InputText
              v-model:input="phone.phoneNumber"
              :required="true"
              v-if="!isView"
            />
            <button
              class="remove-button"
              type="button"
              v-if="!isView"
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
import { computed, ref } from "vue";
import Dropdown from "../../../components/Dropdown/Dropdown.vue";
import type { Employ1, Phone, Pos, Team } from "../../../types/types";
import InputText from "../../../components/Input/InputText.vue";
import { useRoute, useRouter } from "vue-router";
import { uuid } from "vue-uuid";
import useEmployeeApi from "../api/apiEmployee";
import usePositionApi from "../../position/api/apiPosition";
import useTeamApi from "../../team/api/apiTeam";
// import PenLogo from "../../../assets/editPen.svg";

const teams = ref<Team<string>[]>([]);
const postions = ref<Pos<string>[]>([]);
const employee = ref<Employ1>({} as Employ1);

const employeeApi = useEmployeeApi();
const positionApi = usePositionApi()
const teamApi = useTeamApi()


const firstName = ref<string>("");
const lastName = ref<string>("");
const email = ref<string>("");
const dateOfBirth = ref<string>("");
const phones = ref<Phone[]>([{ phoneId: uuid.v1(), phoneNumber: "" }]);
const mode = computed(() => route.meta.mode);

const addPhone = () => {
  phones.value.push({ phoneId: uuid.v1(), phoneNumber: "" }); // Add a new empty phone number input
};

const removePhone = (index: number) => {
  phones.value.splice(index + 1, 1);
};
const selectedTeam = ref<string>("");
const selectedPosition = ref<string>("");
const router = useRouter();
const route = useRoute();

const isEditing = ref<boolean>(false);
const isView = ref<boolean>(false);
const employeeId = ref<string | null>(null);

const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute });
};

const teamName = ref<string>("");
const positionName = ref<string>("");

const getTeamPositionName = () => {
  teamName.value = teams.value.find(
    (e: Team<string>) => e.value === selectedTeam.value
  )!.text;

  positionName.value = postions.value.find(
    (e: Pos<string>) => e.value === selectedPosition.value
  )!.text;
};

const loadData = async (employeeId: string) => {
  try {
    const data = await employeeApi.getDetail(employeeId).then((x) => x);
    employee.value = data;

    postions.value = await positionApi.getPositionDropDown().then((x) => x);

    teams.value = await teamApi.getTeamDropDown().then((x) => x);
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

// **Handle Submit for Both Add & Edit**
const handleSubmit = async () => {
  if (isEditing.value && employeeId.value && mode.value === "edit") {
    if (isEditing.value) {
      const formData: Employ1 = {
        employeeId: employeeId.value,
        firstname: firstName.value,
        lastname: lastName.value,
        email: email.value,
        dateOfBirth: "",
        phones: phones.value,
        teamId: selectedTeam.value,
        positionId: selectedPosition.value,
      };
      await employeeApi.updateEmployee(formData);
    }
  } else {
    const formData: Employ1 = {
      employeeId: uuid.v1(),
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      dateOfBirth: "",
      phones: phones.value,
      teamId: selectedTeam.value,
      positionId: selectedPosition.value,
    };
    await employeeApi.createEmployee(formData);
  }
  navigateTo("employee");
};

(async () => {
  employeeId.value = route.params.employeeId as string;
  await loadData(employeeId.value);

  if (employeeId.value) {
    if (mode.value === "edit") isEditing.value = true;
    if (mode.value === "view") isView.value = true;
    if (employee.value) {
      firstName.value = employee.value.firstname;
      lastName.value = employee.value.lastname;
      email.value = employee.value.email;
      dateOfBirth.value = employee.value.dateOfBirth;
      phones.value = employee.value.phones;
      selectedTeam.value = employee.value.teamId;
      selectedPosition.value = employee.value.positionId;
    }
    getTeamPositionName();
  }
})();
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
  border: 0px;
  cursor: pointer;
  border: 0px none white;
  color: #5119f0;
}
.phone-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.phone-item {
  display: flex;
  input {
    width: 100%;
  }
  align-items: center;
  gap: 10px;
}
span {
  color: red;
}
label {
  color: #656c78;
  font-weight: bold;
}
p {
  margin: 0;
  padding: 0;
  font-size: 19px;
}
</style>
