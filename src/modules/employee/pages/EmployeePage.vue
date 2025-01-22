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
        <!-- การส่งค่า เข้าออกให้บอกtype ของมัน-->
        <!-- ตรง v-model ไม่ได้ใส่ื่อทำให้ค่าที่รับ selectedTeam ชื่อ modelValue (เป็นชื่อdefault) -->
        <Dropdown :list="teams" v-model="tableState.search.teamId" />
        <Dropdown :list="postions" v-model="tableState.search.positionId" />
        <!-- -->

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
    <!-- <EmployeeTable :employee="selectedEmployees" /> -->
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
  <Delete
    v-if="isDeleteOpen"
    :id="idToEditDelete"
    @back="close"
    @deleteSubmit="handleDelete"
  />

  <RouterView />
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from "vue";
import type {
  DropdownModel,
  PaginationResponse,
  TableState,
} from "../../../types/types.ts";
import Dropdown from "../../../components/Dropdown/Dropdown.vue";
import SearchBar from "../../../components/SearchInput/SearchBar.vue";

import Table from "../../../components/atoms/Table.vue";
import type { Header } from "../../../types/tableTypes.ts";
import { useRouter } from "vue-router";
import Pagination from "../../../components/Pagination/Pagination.vue";
import useEmployeeApi from "../api/apiEmployee.ts";
import usePositionApi from "../../position/api/apiPosition.ts";
import useTeamApi from "../../team/api/apiTeam.ts";
import Delete from "../../../components/atoms/Delete.vue";
import type {
  EmployeeIndexRequest,
  EmployeeIndexResponse,
  EmployeeWithDetail,
} from "../../../types/employee.ts";
const teams = ref<DropdownModel<string>[]>([]);
const postions = ref<DropdownModel<string>[]>([]);

// const sumEmployee = computed(() => pageData.value.pageRow);
const sumEmployee = computed(() => rawData.value.rowCount);
const employeeApi = useEmployeeApi();
const positionApi = usePositionApi();
const teamApi = useTeamApi();

const selectedHeaders = ref<Header[]>([
  { Name: "FirstName", Key: "firstname" },
  { Name: "Email", Key: "email" },
  { Name: "Team", Key: "team_name" },
  { Name: "Position", Key: "position_name" },
  { Name: "Manage", Key: "manage" },
]);
const router = useRouter();

const isDeleteOpen = ref<boolean>(false);
const idToEditDelete = ref<string>("");
const openFormDelete = (id: string) => {
  idToEditDelete.value = id;
  isDeleteOpen.value = true;
};

const close = () => {
  idToEditDelete.value = "";
  isDeleteOpen.value = false;
};

const handleDelete = async (id: string) => {
  await employeeApi.deleteEmployee(id);
  await loadData();
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
const getTeamName = (teamId: string) => {
  const team = teams.value.find((t) => t.value === teamId);
  return team ? team.text : "Unknown Team";
};

const getPositionName = (positionId: string) => {
  const position = postions.value.find((t) => t.value === positionId);
  return position ? position.text : "Unknown Position";
};

const rawData = ref<PaginationResponse<EmployeeIndexResponse[]>>({
  pageIndex: 0,
  rowCount: 0,
  pageSize: 0,
  data: [],
});

const tableState: TableState<EmployeeIndexRequest, EmployeeWithDetail[]> =
  reactive({
    pageIndex: 0,
    pageSize: 10,
    rowCount: computed(() => rawData.value.rowCount),
    data: computed(() =>
      rawData.value.data.map((emp) => ({
        ...emp,
        team_name: getTeamName(emp.teamId),
        position_name: getPositionName(emp.positionId),
      }))
    ),
    search: {
      text: "",
      teamId: "",
      positionId: "",
    },
  });

const loadData = async () => {
  try {
    const datas = await employeeApi
      .fetchDataEmployee({
        pageIndex: tableState.pageIndex,
        pageSize: tableState.pageSize,
        search: tableState.search,
      })
      .then((x) => x);
    rawData.value = datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const handleNewPageData = (
  data: PaginationResponse<EmployeeIndexResponse[]>
) => {
  tableState.pageIndex = data.pageIndex;
  tableState.pageSize = data.pageSize;
};

const loadTeam = async () => {
  try {
    teams.value = await teamApi.getTeamDropDown().then((x) => x);
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const loadPosition = async () => {
  try {
    postions.value = await positionApi.getPositionDropDown().then((x) => x);
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

function createDefaultSearch(): EmployeeIndexRequest {
  return {
    positionId: "",
    teamId: "",
    text: "",
  };
}

const resetFilters = () => {
  tableState.search = createDefaultSearch();
};

(async () => {
  await Promise.all([loadData(), loadTeam(), loadPosition()]);
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
    await loadData();
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
