<template>
  <div>
    <h1>Employee ( {{ sumEmployee }} )</h1>
    <div class="searchMenu">
      <!-- Dropdowns for Filtering -->
      <Dropdown :list="teams" v-model="selectedTeam" @change="confirmInput" />
      <Dropdown
        :list="postions"
        :modelValue="selectedPosition"
        @update:modelValue="selectedPosition = $event"
        @change="confirmInput"
      />
      <SearchBar
        header="SearchBar"
        v-model:input="searchEmployee"
        @change="confirmInput"
      />
      <div class="resetButton">
        <button @click="resetFilters">Reset</button>
      </div>
    </div>
  </div>
  <hr />

  <div>
    <Table :headers="selectedHeaders" :data="paginationData">
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>
    </Table>

    <!-- <Pagination :data="selectedEmployees" @newData="handleNewData" /> -->
    <Pagination
      :data="employeesWithDetails"
      :pageData="pageData"
      @newData="handleNewData"
      @paginationData="loadData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Employ1Details, Pagi, PagiData } from "../../types/types.ts";
import Dropdown from "../Dropdown/Dropdown.vue";
import SearchBar from "../SearchInput/SearchBar.vue";
import Table from "../atoms/Table.vue";
import type { Header } from "../../types/tableTypes.ts";
import Pagination from "../Pagination/Pagination.vue";
import { fetchDataEmployee } from "../../modules/employee/api/apiEmployee.ts";
import { getPositionDropDown } from "../../modules/position/api/apiPosition.ts";
import { getTeamDropDown } from "../../modules/team/api/apiTeam.ts";

const teams = ref();
const postions = ref();
// const employees = ref();

const selectedTeam = ref<string>("");
const selectedPosition = ref<string>("");
const searchEmployee = ref<string>("");

const sumEmployee = computed(() => pageData.value.pageRow);
const selectedEmployees = ref<Employ1Details[]>([]);
const selectedHeaders = ref<Header[]>([
  { Name: "FirstName", Key: "firstname" },
  { Name: "Email", Key: "email" },
  { Name: "Team", Key: "team_name" },
  { Name: "Position", Key: "position_name" },
]);

const paginationData = ref<Employ1Details[]>([]);

const handleNewData = (data: Employ1Details[]) => {
  paginationData.value = data;
};

const getTeamName = (teamId: string) => {
  const team = teams.value?.find((t: any) => t.value === teamId);
  return team ? team.text : "Unknown Team";
};

const getPositionName = (positionId: string) => {
  const position = postions.value?.find((p: any) => p.value === positionId);
  return position ? position.text : "Unknown Position";
};

// Enhanced with Team and Position Names
const employeesWithDetails = computed(() =>
  selectedEmployees.value.map((emp) => ({
    ...emp,
    team_name: getTeamName(emp.teamId),
    position_name: getPositionName(emp.positionId),
  }))
);

const pageData = ref<PagiData>({
  pageRow: 0,
  pageIndex: 0,
  pageSize: 0,
});

const formattedDefault = ref({
  pageIndex: 0,
  pageSize: 5,
  search: {},
});

const loadData = async (pagiData: Pagi) => {
  pagiData = {...pagiData , search:formattedDefault.value.search}
  formattedDefault.value = pagiData;
  try {
    const datas = await fetchDataEmployee(formattedDefault.value);

    postions.value = await getPositionDropDown();
    teams.value = await getTeamDropDown();

    selectedEmployees.value = datas.data;
    pageData.value = {
      pageRow: datas.rowCount,
      pageIndex: datas.pageIndex + 1,
      pageSize: datas.pageSize,
    };
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const confirmInput = () => {
  formattedDefault.value = {
    pageIndex: 0,
    pageSize: pageData.value.pageSize,
    search: {
      text: searchEmployee.value,
      teamId: selectedTeam.value,
      positionId: selectedPosition.value,
    },
  };
 
  loadData(formattedDefault.value);
};
// Filter Logic
// const filterEmployees = () => {
//   selectedEmployees.value = employeesWithDetails.value.filter(
//     (data) =>
//       (!selectedTeam.value || data.team_id === selectedTeam.value) &&
//       (!selectedPosition.value || data.position_id === selectedPosition.value)
//   );
// };

const resetFilters = () => {
  selectedTeam.value = "";
  selectedPosition.value = "";
  searchEmployee.value = "";
  confirmInput();
  // filterEmployees();
};

// watch([selectedTeam, selectedPosition, searchEmployee], filterEmployees);
// filterEmployees();

(async () => {
  await loadData(formattedDefault.value);
})();
</script>

<style scoped>
.searchMenu {
  display: flex;
  gap: 10px;
}
.resetButton {
  display: flex;
  align-items: end;
}

.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
.currPage {
  display: flex;
  gap: 10px;
  input {
    width: 20px;
  }
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
</style>
