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
    <!-- <EmployeeTable :employee="selectedEmployees" /> -->
    <Table
      :headers="selectedHeaders"
      :data="selectedTeam"
      @edit="navigateToEdit"
    >
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>
      <template #Button="{ row }">
        <button @click="navigateToEdit(row.id)">Edit</button>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { teamList } from "../../../assets/data/firstData.ts";
import type { Dropdown as DropdownType } from "../../../types/types.ts";
import SearchBar from "../../../components/SearchInput/SearchBar.vue";

import Table from "../../../components/atoms/Table.vue";
import type { Header } from "../../../types/tableTypes.ts";
import { useRouter } from "vue-router";

const teams = ref(teamList);
const searchTeam = ref<string>("");
const router = useRouter();
const sumTeam = computed(() => selectedTeam.value.length);

const selectedTeam = ref<DropdownType<number>[]>([]);

const selectedHeaders = ref<Header[]>([{ Name: "TeamName", Key: "name" }]);

const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute });
};
const navigateToEdit = (id: number) => {
  router.push({ name: "settingEditTeam", params: { teamId: id } });
};
const filterEmployees = () => {
  selectedTeam.value = teams.value.filter((data) =>
    searchTeam.value
      ? data.name.toLowerCase().includes(searchTeam.value.toLowerCase())
      : true
  );
};

watch([searchTeam], filterEmployees);

filterEmployees();
</script>

<style scoped>
.Head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  h2{
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
</style>
