<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Team</th>
        <th>Position</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(member, index) in employee" :key="index">
        <td>{{ member.first_name }} {{ member.last_name }}</td>
        <td>{{ member.email }}</td>
        <td>{{ member.gender }}</td>
        <td>{{ member.team_name }}</td>
        <td>{{ member.position_name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Employ1Details } from "../../types/types";

defineProps<{
  employee: Employ1Details[];
}>();
</script>

<style scoped>
table {
  width: 100%;
}

th,
td {
  padding: 10px;
  text-align: left;
}
</style>
