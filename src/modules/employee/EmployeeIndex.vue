<template>
  <div>
    <div class="Head">
      <h1>Employee ( {{ sumEmployee }} )</h1>
      <div class="createEmployeeButton">
        <button @click="navigateTo('createEmployee')">Create Employee</button>
      </div>
    </div>

    <div class="searchMenu">
      <div class="left">
        <Dropdown :list="teams" v-model="tableState.search.teamId" />
        <Dropdown :list="postions" v-model="tableState.search.positionId" />
        <SearchBar
          header="SearchBar"
          :input="tableState.search.text"
          @keyup="
            tableState.search.text = ($event.target as HTMLInputElement).value
          "
        />
        <div class="resetButton">
          <button @click="resetFilters">Reset</button>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div>
    <Table
      :headers="selectedHeaders"
      :data="tableState.data"
      @view="navigateToView"
    >
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>
      <template #AddEdit="{ row }" class="test">
        <button @click="navigateToEmployee(row.employeeId)">Edit</button>
        <button @mousedown="openFormDelete(row.employeeId)">Delete</button>
      </template>
    </Table>
    <Pagination :data="rawData" @paginationData="handleNewPageData" />
  </div>
  <ModalDelete ref="modalDelete"></ModalDelete>
  <RouterView />
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { PaginationResponse } from "../../types/types.ts";
import Dropdown from "../../components/Dropdown/Dropdown.vue";
import SearchBar from "../../components/SearchInput/SearchBar.vue";

import Table from "../../components/atoms/Table.vue";
import type { Header } from "../../types/tableTypes.ts";
import { useRouter } from "vue-router";
import Pagination from "../../components/Pagination/Pagination.vue";
import type {
  EmployeeIndexResponse,
  EmployeeWithDetail,
} from "../../types/employee.ts";

import ModalDelete from "../../components/atoms/ModalDelete.vue";
import useMasterData from "./dataProvider/masterData.ts";
import usePageIndex from "./dataProvider/pageIndex.ts";

const masterDataProvider = useMasterData();
const { teams, postions } = masterDataProvider;
const pageIndexDataProvider = usePageIndex(masterDataProvider);

const router = useRouter();

const { tableState, resetFilters } = pageIndexDataProvider;
const sumEmployee = computed(() => tableState.rowCount);
const rawData = ref(pageIndexDataProvider.rawData);

const selectedHeaders = ref<Header<EmployeeWithDetail,"manage">[]>([
  { Name: "FirstName", Key: "firstname" },
  { Name: "Email", Key: "email" },
  { Name: "Team", Key: "team_name" },
  { Name: "Position", Key: "position_name" },
  { Name: "Manage", Key: "manage" },
]);

const modalDelete = ref<InstanceType<typeof ModalDelete>>(null!);
const openFormDelete = async (id: string) => {
  const confirm = await modalDelete.value.openModal();
  if (confirm) {
    pageIndexDataProvider.deleteItem(id);
  }
};

const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute });
};
const navigateToEmployee = (employeeId: string) => {
  router.push({ name: "editEmployee", params: { employeeId: employeeId } });
};

const navigateToView = (data: EmployeeIndexResponse) => {
  router.push({
    name: "viewEmployee",
    params: { employeeId: data.employeeId },
  });
};

const handleNewPageData = (
  data: PaginationResponse<EmployeeIndexResponse[]>
) => {
  tableState.pageIndex = data.pageIndex;
  tableState.pageSize = data.pageSize;
};

(async () => {
  await Promise.all([
    pageIndexDataProvider.loadEmployee(),
    masterDataProvider.loadMasterData(),
  ]);
})();

watch(
  [
    () => tableState.pageIndex,
    () => tableState.pageSize,
    () => tableState.search.positionId,
    () => tableState.search.teamId,
    () => tableState.search.text,
  ],
  async () => {
    await pageIndexDataProvider.loadEmployee();
  }
);
</script>

<style scoped>
.Head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
  button {
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
