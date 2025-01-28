<script setup lang="ts">
import { ref, computed } from "vue"
import {
  teamList,
  postionList,
  employeeList,
} from "../../assets/data/firstData"
import Card from "../practice/Card.vue"

const teams = ref(teamList)
const positions = ref(postionList)
const employees = ref(employeeList)

const getTeamName = (teamId: number) => {
  const team = teams.value.find((t) => t.id === teamId)
  return team!.name
}

const getPositionName = (positionId: number) => {
  const position = positions.value.find((p) => p.id === positionId)
  return position!.name
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
</script>

<template>
  <div class="container">
    <div
      v-for="employee in employeesWithDetails"
      :key="employee.id"
      class="card"
    >
      <Card>
        <div>
          <p>{{ employee.first_name }} {{ employee.last_name }}</p>
          <p>Email: {{ employee.email }}</p>
          <p>Gender: {{ employee.gender }}</p>
          <p>{{ employee.team_name }} / {{ employee.position_name }}</p>
        </div>
      </Card>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
}
p {
  margin: 0px;
}
</style>
