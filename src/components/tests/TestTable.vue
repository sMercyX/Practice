<template>
  <div>
    <h1>Employee ( {{ sumEmployee }} )</h1>
    <div class="searchMenu">
      <Dropdown :list="teams" v-model="selectedTeam" />
      <Dropdown :list="postions" v-model="selectedPosition" />
      <SearchBar header="SearchBar" v-model:input="searchEmployee" />
      <div class="resetButton">
        <button @click="resetFilters">Reset</button>
      </div>
    </div>
  </div>
  <hr />
  <div>
    <Table :headers="selectedHeaders" :data="selectedEmployees">
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>

      <!-- <template #cell="{ row, header }">
        <span v-if="header === 'Name'">{{ row.first_name }} {{ row.last_name }}</span>
        <span v-else-if="header === 'Email'">{{ row.email }}</span>
        <span v-else-if="header === 'Team'">{{ row.team_name }}</span>
        <span v-else-if="header === 'Position'">{{ row.position_name }}</span>
      </template> -->
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import {
  teamList,
  postionList,
  employeeList,
} from "../../assets/data/firstData"
import type { Employ1Details } from "../../types/types"
import Dropdown from "./atoms/Dropdown.vue"
import SearchBar from "./atoms/SearchBar.vue"

import Table from "./atoms/Table.vue"
import type { Header } from "../../types/tableTypes.ts"

const teams = ref(teamList)
const postions = ref(postionList)
const employees = ref(employeeList)
const selectedTeam = ref<number>(0)
const selectedPosition = ref<number>(0)
const searchEmployee = ref<string>("")
const sumEmployee = computed(() => selectedEmployees.value.length)
const selectedHeaders = ref<Header[]>([
  { Name: "FirstName", Key: "first_name" },
  { Name: "Email", Key: "email" },
  { Name: "Team", Key: "team_name" },
  { Name: "Position", Key: "position_name" },
])

const selectedEmployees = ref<Employ1Details[]>([])

const getTeamName = (teamId: number) => {
  const team = teams.value.find((t) => t.id === teamId)
  return team ? team.name : "Unknown Team"
}

const getPositionName = (positionId: number) => {
  const position = postions.value.find((p) => p.id === positionId)
  return position ? position.name : "Unknown Position"
}

const employeesWithDetails = computed(() =>
  employees.value
    .map((emp) => ({
      ...emp,
      team_name: getTeamName(emp.team_id),
      position_name: getPositionName(emp.position_id),
    }))
    .slice(0, 10)
)

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
  )
}

const resetFilters = () => {
  selectedTeam.value = 0
  selectedPosition.value = 0
  searchEmployee.value = ""
  filterEmployees()
}

watch([selectedTeam, selectedPosition, searchEmployee], filterEmployees)

filterEmployees()
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
