<template>
  <div>
    <h1>Employee ( {{ sumEmployee }} )</h1>
    <div class="searchMenu">
      <!-- Dropdowns for Filtering -->
      <Dropdown :list="teams" v-model="selectedTeam" />
      <Dropdown
        :list="postions"
        :modelValue="selectedPosition"
        @update:modelValue="selectedPosition = $event"
      />
      <SearchBar header="SearchBar" v-model:input="searchEmployee" />
      <div class="resetButton">
        <button @click="resetFilters">Reset</button>
      </div>
    </div>
  </div>
  <hr />

  <!-- Employee Table with Pagination -->
  <div>
    <Table :headers="selectedHeaders" :data="paginatedEmployees">
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>
    </Table>

    <div class="pagination">
      <div>
        <p>
          Show
          <select v-model.number="pageSize">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>

          {{ (currentPage - 1) * pageSize + 1 }} -
          {{
            sumEmployee < (currentPage - 1) * pageSize + pageSize
              ? sumEmployee
              : (currentPage - 1) * pageSize + pageSize
          }}
          of
          {{ sumEmployee }}
        </p>
      </div>
      <div class="currPage">
        <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
        <span><input  type="text" v-model="currentPage"> / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages">
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  teamList,
  postionList,
  employeeList,
} from "../assets/data/firstData.ts";
import type { Employ1Details } from "../types/types.ts";
import Dropdown from "./Dropdown/Dropdown.vue";
import SearchBar from "./SearchInput/SearchBar.vue";
import Table from "./atoms/Table.vue";
import type { Header } from "../types/tableTypes.ts";

const teams = ref(teamList);
const postions = ref(postionList);
const employees = ref(employeeList);
const selectedTeam = ref<number>(0);
const selectedPosition = ref<number>(0);
const searchEmployee = ref<string>("");

const currentPage = ref<number>(1);
const pageSize = ref<number>(10);

const sumEmployee = computed(() => selectedEmployees.value.length);
const selectedEmployees = ref<Employ1Details[]>([]);
const selectedHeaders = ref<Header[]>([
  { Name: "FirstName", Key: "first_name" },
  { Name: "Email", Key: "email" },
  { Name: "Team", Key: "team_name" },
  { Name: "Position", Key: "position_name" },
]);

const getTeamName = (teamId: number) => {
  const team = teams.value.find((t) => t.id === teamId);
  return team ? team.name : "Unknown Team";
};

const getPositionName = (positionId: number) => {
  const position = postions.value.find((p) => p.id === positionId);
  return position ? position.name : "Unknown Position";
};

// Enhanced with Team and Position Names
const employeesWithDetails = computed(() =>
  employees.value.map((emp) => ({
    ...emp,
    team_name: getTeamName(emp.team_id),
    position_name: getPositionName(emp.position_id),
  }))
);

// Filter Logic
const filterEmployees = () => {
  selectedEmployees.value = employeesWithDetails.value.filter(
    (data) =>
      (!selectedTeam.value || data.team_id === selectedTeam.value) &&
      (!selectedPosition.value ||
        data.position_id === selectedPosition.value) &&
      (searchEmployee.value
        ? data.first_name
            .toLowerCase()
            .includes(searchEmployee.value.toLowerCase()) ||
          data.last_name
            .toLowerCase()
            .includes(searchEmployee.value.toLowerCase()) ||
          data.email.toLowerCase().includes(searchEmployee.value.toLowerCase())
        : true)
  );
  currentPage.value = 1;
};

const paginatedEmployees = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  return selectedEmployees.value.slice(startIndex, startIndex + pageSize.value);
});

const totalPages = computed(() =>
  Math.ceil(selectedEmployees.value.length / pageSize.value)
);

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const resetFilters = () => {
  selectedTeam.value = 0;
  selectedPosition.value = 0;
  searchEmployee.value = "";
  filterEmployees();
};

watch([selectedTeam, selectedPosition, searchEmployee], filterEmployees);
filterEmployees();
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
.currPage{
  display: flex;
  gap: 10px;
  input{
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
