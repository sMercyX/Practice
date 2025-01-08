<template>
  <div>
    <h1>Employee ( {{ sumEmployee }} )</h1>
    <div class="searchMenu">
      <Dropdown
        header="Team"
        :list="teams"
        v-model:selected="selectedTeam"
      />
      <Dropdown
        header="Position"
        :list="postions"
        v-model:selected="selectedPosition"
      />
      <SearchBar
        header="SearchBar"
        v-model:input="searchEmployee"
      />
      <div class="resetButton">
        <button @click="resetFilters">Reset</button>
      </div>
    </div>
  </div>
  <hr />
  <div>
    <EmployeeTable :employee="selectedEmployees" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { teamList, postionList, employeeList } from "../assets/data/firstData";
import type { Employ1Details } from "../types";
import Dropdown from "./Dropdown.vue";
import SearchBar from "./SearchBar.vue";
import EmployeeTable from "./EmployeeTable.vue";

const teams = ref(teamList);
const postions = ref(postionList);
const employees = ref(employeeList);
const selectedTeam = ref<string>("");
const selectedPosition = ref<string>("");
const searchEmployee = ref<string>("");
const sumEmployee = computed(() => selectedEmployees.value.length);

const selectedEmployees = ref<Employ1Details[]>([]);

const getTeamName = (teamId: number) => {
  const team = teams.value.find((t) => t.id === teamId);
  return team ? team.name : "Unknown Team";
};

const getPositionName = (positionId: number) => {
  const position = postions.value.find((p) => p.id === positionId);
  return position ? position.name : "Unknown Position";
};

const employeesWithDetails = computed(() =>
  employees.value
    .map((emp) => ({
      ...emp,
      team_name: getTeamName(emp.team_id),
      position_name: getPositionName(emp.position_id),
    }))
    .slice(0, 10)
);

const filterEmployees = () => {
  selectedEmployees.value = employeesWithDetails.value.filter(
    (data) =>
      (!selectedTeam.value || data.team_name === selectedTeam.value) &&
      (!selectedPosition.value ||
        data.position_name === selectedPosition.value) &&
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
};

const resetFilters = () => {
  selectedTeam.value = "";
  selectedPosition.value = "";
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
