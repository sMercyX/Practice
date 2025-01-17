<template>
  <div>
    <h1>Employee ( {{ sumEmployee }} )</h1>
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
      <div class="right">
        <div class="createEmployeeButton">
          <button @click="navigateTo('createEmployee')">Create Employee</button>
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
      @delete="navigateToEmployee"
      @view="navigateToView"
    >
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>
      <!-- <template #Button="{ row }">
        <button @click="navigateToEmployee(row.employeeId)">Edit</button>
        <button @click="navigateToEmployee(row.employeeId)">Delete</button>
      </template> -->
    </Table>
    <Pagination
      :data="employeesWithDetails"
      :pageData="pageData"
      @newData="handleNewData"
      @paginationData="loadData"
    />
  </div>

  <RouterView />
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  teamList,
  postionList,
  employeeList,
} from "../../../assets/data/firstData.ts";
import type { Employ1Details, Pagi, PagiData } from "../../../types/types.ts";
import Dropdown from "../../../components/Dropdown/Dropdown.vue";
import SearchBar from "../../../components/SearchInput/SearchBar.vue";

import Table from "../../../components/atoms/Table.vue";
import type { Header } from "../../../types/tableTypes.ts";
import { useRouter } from "vue-router";
import Pagination from "../../../components/Pagination/Pagination.vue";
import { getItems, postItem } from "../../../utils/fetch.ts";
const teams = ref(teamList);
const postions = ref(postionList);
const employees = ref(employeeList);
const selectedTeam = ref<string>("");
const selectedPosition = ref<string>("");
const searchEmployee = ref<string>("");
const sumEmployee = computed(() => selectedEmployees.value.length);

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

const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute });
};
const navigateToEmployee = (employeeId: string) => {
  router.push({ name: "editEmployee", params: { employeeId: employeeId } });
};

const navigateToView = (id: string) => {
  router.push({ name: "viewEmployee", params: { employeeId: id } });
};
const getTeamName = (teamId: string) => {
  const team = teams.value?.find((t: any) => t.value === teamId);
  return team ? team.text : "Unknown Team";
};

const getPositionName = (positionId: string) => {
  const position = postions.value?.find((p: any) => p.value === positionId);
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
  pageSize: 5,
  search: {},
});

const loadData = async (pagiData: Pagi) => {
  formattedDefault.value = pagiData;
  try {
    const datas = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Employee/Index`,
      formattedDefault.value
    );
    selectedEmployees.value = datas.data;
    console.log(selectedEmployees.value);
    pageData.value = {
      pageRow: datas.rowCount,
      pageIndex: datas.pageIndex + 1,
      pageSize: datas.pageSize,
    };
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const loadPositionDropDown = async () => {
  try {
    const datas = await getItems(
      `${import.meta.env.VITE_BASE_URL}/position/getPositionDropdown`
    );
    postions.value = datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};
const loadTeamDropDown = async () => {
  try {
    const datas = await getItems(
      `${import.meta.env.VITE_BASE_URL}/team/getTeamDropdown`
    );
    teams.value = datas;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const confirmInput = () => {
  const filter = {
    pageIndex: 0,
    pageSize: pageData.value.pageSize,
    search: {
      text: searchEmployee.value,
      teamId: selectedTeam.value,
      positionId: selectedPosition.value,
    },
  };
  loadData(filter);
};

// const filterEmployees = () => {
//   selectedEmployees.value = employeesWithDetails.value.filter(
//     (data) =>
//       (!selectedTeam.value || data.teamId === selectedTeam.value) &&
//       (!selectedPosition.value ||
//         data.positionId === selectedPosition.value) &&
//       (searchEmployee.value
//         ? data.first_name
//             .toLowerCase()
//             .includes(searchEmployee.value.toLowerCase()) ||
//           data.last_name
//             .toLowerCase()
//             .includes(searchEmployee.value.toLowerCase()) ||
//           data.email.toLowerCase().includes(searchEmployee.value.toLowerCase())
//         : true)
//   );
// };

const resetFilters = () => {
  selectedTeam.value = "";
  selectedPosition.value = "";
  searchEmployee.value = "";
  confirmInput();
  // filterEmployees();
};

// watch([selectedTeam, selectedPosition, searchEmployee], filterEmployees);
// filterEmployees();

(async () => {
  await loadData(formattedDefault.value);
  await loadPositionDropDown();
  await loadTeamDropDown();
})();
</script>

<style scoped>
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
