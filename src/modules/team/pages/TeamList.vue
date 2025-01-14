<template>
  <div class="Head">
    <h2>Team ( {{ sumTeam }} )</h2>
    <div class="createEmployeeButton">
      <button class="createButton" @click="navigateTo('settingCreateTeam')">
        <span>&plus;</span> Create
      </button>
    </div>
  </div>
  <hr />

  <div class="searchMenu">
    <div class="left">
      <SearchBar header="SearchBar" v-model:input="searchTeam" />
    </div>
    <div class="right"></div>
  </div>
  <div>
    <Table
      :headers="selectedHeaders"
      :data="paginationData"
      @edit="navigateToEdit"
    >
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>

      <template #AddEdit="{ row }">
        <button @click="navigateToEdit(row.teamId)">Edit</button>
        <button @click="navigateToEdit(row.teamId)">Delete</button>
      </template>
    </Table>

    <Pagination :data="selectedTeam" @newData="handleNewData" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import type {
  Dropdown as DropdownType,
  Team as TeamType,
} from "../../../types/types.ts";
import SearchBar from "../../../components/SearchInput/SearchBar.vue";

import Table from "../../../components/atoms/Table.vue";
import type { Header, HeaderTyoe } from "../../../types/tableTypes.ts";
import { useRouter } from "vue-router";
import Pagination from "../../../components/Pagination/Pagination.vue";
import { getItems, postItem } from "../../../utils/fetch.ts";

const teams = ref();
const searchTeam = ref<string>("");
const router = useRouter();
const sumTeam = computed(() => selectedTeam.value.length);
const selectedTeam = ref<TeamType[]>([]);
const selectedHeaders = ref<Header[]>([
  { Name: "TeamName", Key: "name" },
  { Name: "Manage", Key: "manage" },
]);
const selectedHeaders2 = ref<HeaderTyoe[]>([]);

const loadData = async () => {
  const formatted = {
    pageIndex: 0,
    pageSize: 0,
    search: {},
  };
  try {
    const createdTask = await postItem(
      `${import.meta.env.VITE_BASE_URL}/team/index`,
      formatted
    );
    teams.value = createdTask.data;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const loadTeamDropDown = async () => {
  try {
    const Header = await getItems(
      `${import.meta.env.VITE_BASE_URL}/team/getTeamDropdown`
    );
    selectedHeaders2.value = Header
    console.log(selectedHeaders2.value);
    // selectedHeaders.value = Header;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute });
};
const navigateToEdit = (id: number) => {
  router.push({ name: "settingEditTeam", params: { teamId: id } });
};

const filterEmployees = () => {
  selectedTeam.value = teams.value.filter((data: any) =>
    searchTeam.value
      ? data.name.toLowerCase().includes(searchTeam.value.toLowerCase())
      : true
  );
};

const paginationData = ref<TeamType[]>([]);

const handleNewData = (data: TeamType[]) => {
  paginationData.value = data;
};
watch([searchTeam], filterEmployees);

onMounted(async () => {
  await loadData();
  await loadTeamDropDown();
  filterEmployees();
});
</script>

<style scoped>
.Head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  h2 {
    margin: 0;
    padding: 0;
  }

  .createButton {
    padding: 10px 20px;
    background-color: #2bb8af;
    color: #fff;
    border: none;
    align-items: center;
    text-align: center;
  }
}

.searchMenu {
  display: flex;
  justify-content: space-between;
  margin: 0px 10px;
  .left {
    display: flex;
    gap: 10px;
  }
}
.resetButton {
  display: flex;
  align-items: end;
}

table {
  width: 100%;
}

th,
td {
  padding: 10px;
  text-align: left;
}
p {
  margin: 0px;
}

/* delete Modal */
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
}
.modalContent {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}
.modalActions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
.confirmDeleteButton {
  padding: 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
}
.confirmDeleteButton:hover {
  background-color: #c0392b;
}
.cancelButton {
  padding: 10px;
  background-color: #95a5a6;
  color: white;
  border: none;
  cursor: pointer;
}
.cancelButton:hover {
  background-color: #7f8c8d;
}
</style>
