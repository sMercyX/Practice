<template>
  <div class="Top">
    <div class="Left">
      <h2 class="leftArrow" @click="navigateTo('employee')">&leftarrow;</h2>
      <h2>View Employee</h2>
    </div>
    <div class="Right">
      <button @click="navigateTo('employee')" class="cancelButton">
        Cancel
      </button>
      <button type="submit" form="myForm" class="confirmButton" disabled>
        Save
      </button>
    </div>
  </div>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="Header">
        <img src="../../assets/editPen.svg" alt="Edit Icon" class="editIcon" />
        <h2>Basic Info</h2>
      </div>

      <div class="Content" id="myForm">
        <div class="breakHalf">
          <div class="groupUp">
            <label for="first_name">First Name <span>*</span></label>
            <p>{{ firstName }}</p>
          </div>
          <div class="groupUp">
            <label for="last_name">Last Name <span>*</span></label>
            <p>{{ lastName }}</p>
          </div>
        </div>
        <div class="groupUp">
          <label for="email">Email <span>*</span></label>
          <p>{{ email }}</p>
        </div>

        <div class="breakHalf">
          <div class="groupUp">
            <label for="team_id">Team <span>*</span></label>
            <p>{{ teamName }}</p>
          </div>
          <div class="groupUp">
            <label for="position_id">Position <span>*</span></label>
            <p>{{ positionName }}</p>
          </div>
        </div>

        <hr />
        <div class="breakHalf">
          <label for="phone">Phone Numbers</label>
        </div>
        <div class="phone-list">
          <p>
            {{ phones[0].phoneNumber }}
          </p>
          <div
            v-if="phones.length > 1"
            v-for="(phone, index) in phones.slice(1)"
            :key="index + 1"
            class="phone-item"
          >
            <p>
              {{ phone.phoneNumber }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { DropdownModel } from "../../types/types";
import { useRoute, useRouter } from "vue-router";
import useMasterData from "./dataProvider/masterData";
import usePageView from "./dataProvider/pageView";

const masterDataProvider = useMasterData();
const { teams, postions } = masterDataProvider;
const pageViewDataProvider = usePageView();
const data = pageViewDataProvider.employeeData


const firstName = computed(() => data.firstname);
const lastName = computed(() => data.lastname);
const email = computed(() => data.email);
const phones = computed(() => data.phones);

const selectedTeam = computed(() => data.teamId);
const selectedPosition = computed(() => data.positionId);
const router = useRouter();
const route = useRoute();

const employeeId = ref<string | null>(null);

const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute });
};

const teamName = ref<string>("");
const positionName = ref<string>("");

const getTeamPositionName = () => {
  teamName.value = teams.value.find(
    (e: DropdownModel<string>) => e.value === selectedTeam.value
  )!.text;

  positionName.value = postions.value.find(
    (e: DropdownModel<string>) => e.value === selectedPosition.value
  )!.text;
};

(async () => {
  employeeId.value = route.params.employeeId as string;
  await Promise.all([
    masterDataProvider.loadMasterData(),
    pageViewDataProvider.loadEmployeeDetail(employeeId.value),
  ]);
  getTeamPositionName()
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
