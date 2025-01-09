<template>
  <div>
    <h1>Employee ( {{ sumEmployee }} )</h1>
    <div class="searchMenu">
      <!-- การส่งค่า เข้าออกให้บอกtype ของมัน-->
      <!-- ตรง v-model ไม่ได้ใส่ื่อทำให้ค่าที่รับ selectedTeam ชื่อ modelValue (เป็นชื่อdefault) -->
      <Dropdown :list="teams" v-model="selectedTeam" />
      <Dropdown
        :list="postions"
        :modelValue="selectedPosition"
        @update:modelValue="selectedPosition = $event"
      />
      <!-- -->

      <SearchBar header="SearchBar" v-model:input="searchEmployee" />

      <div class="resetButton">
        <button @click="resetFilters">Reset</button>
      </div>
    </div>
  </div>
  <hr />
  <div>
    <!-- <EmployeeTable :employee="selectedEmployees" /> -->
    <Table :headers="selectedHeaders" :data="selectedEmployees">
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { teamList, postionList, employeeList } from "../assets/data/firstData";
import type { Employ1Details } from "../types/types";
import Dropdown from "./atoms/Dropdown.vue";
import SearchBar from "./atoms/SearchBar.vue";
import EmployeeTable from "./tests/EmployeeTable.vue";

import Table from "./atoms/Table.vue";
import type { Header } from "../types/tableTypes.ts";
const teams = ref(teamList);
const postions = ref(postionList);
const employees = ref(employeeList);
const selectedTeam = ref<number>(2);
const selectedPosition = ref<number>(0);
const searchEmployee = ref<string>("");
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
