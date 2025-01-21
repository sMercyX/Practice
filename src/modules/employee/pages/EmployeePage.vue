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
        <Dropdown
          :list="teams"
          :modelValue="selectedTeam"
          @update:modelValue="selectedTeam = $event"
          @change="confirmInput"
        />
        <Dropdown
          :list="postions"
          :modelValue="selectedPosition"
          @update:modelValue="selectedPosition = $event"
          @change="confirmInput"
        />
        <!-- -->

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
  </div>
  <hr />
  <div>
    <!-- <EmployeeTable :employee="selectedEmployees" /> -->
    <Table
      :headers="selectedHeaders"
      :data="paginationData"
      @edit="navigateToEmployee"
      @view="navigateToView"
    >
      <template #header="{ header }" >
        <strong>{{ header["Name"] }}</strong>
      </template>
      <template #AddEdit="{ row }" class="test" >
        <button @click="navigateToEmployee(row.employeeId)">Edit</button>
        <button @mousedown="openFormDelete(row.employeeId)">Delete</button>
      </template>
    </Table>
    <Pagination
      :data="employeesWithDetails"
      :pageData="pageData"
      @newData="handleNewData"
      @paginationData="loadData"
    />
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
import { ref, computed } from "vue";
import type {
  Employ1Details,
  Pagi,
  PagiData,
  Pos,
  Team,
} from "../../../types/types.ts";
import Dropdown from "../../../components/Dropdown/Dropdown.vue";
import SearchBar from "../../../components/SearchInput/SearchBar.vue";

import Table from "../../../components/atoms/Table.vue";
import type { Header } from "../../../types/tableTypes.ts";
import { useRouter } from "vue-router";
import Pagination from "../../../components/Pagination/Pagination.vue";
import { deleteEmployee, fetchDataEmployee } from "../api/apiEmployee.ts";
import { getPositionDropDown } from "../../position/api/apiPosition.ts";
import { getTeamDropDown } from "../../team/api/apiTeam.ts";
import Delete from "../../../components/atoms/Delete.vue";
const teams = ref<Team<string>[]>([]);
const postions = ref<Pos<string>[]>([]);
// const employees = ref(employeeList);
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
  { Name: "Manage", Key: "manage" },
]);
const router = useRouter();

const paginationData = ref<Employ1Details[]>([]);

const handleNewData = (data: Employ1Details[]) => {
  paginationData.value = data;
};
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
  await deleteEmployee(id);
  const index = paginationData.value.findIndex(
    (item) => item.employeeId === id
  );
  paginationData.value.splice(index, 1);
};

const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute });
};
const navigateToEmployee = (employeeId: string) => {
  router.push({ name: "editEmployee", params: { employeeId: employeeId } });
};

const navigateToView = (employeeId: string) => {
  router.push({ name: "viewEmployee", params: { employeeId: employeeId } });
};
const getTeamName = (teamId: string) => {
  const team = teams.value!.find((t: Team<string>) => t.value === teamId);
  return team ? team.text : "Unknown Team";
};

const getPositionName = (positionId: string) => {
  const position = postions.value!.find((p: Pos<string>) => p.value === positionId);
  return position ? position.text : "Unknown Position";
};

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
  pageSize: 10,
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

const resetFilters = () => {
  selectedTeam.value = "";
  selectedPosition.value = "";
  searchEmployee.value = "";
  confirmInput();
};

(async () => {
  await loadData(formattedDefault.value);
})();
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
