<template>
  <div>
    <h1>Employee ( {{ sumEmployee }} )</h1>
    <div class="searchMenu">
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
  <hr />

  <div>
    <Table :headers="selectedHeaders" :data="tableState.data">
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>
    </Table>

    <Pagination :data="rawData" @paginationData="handleNewPageData" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from "vue";
import type {
  DropdownModel,
  PaginationResponse,
  TableState,
} from "../../types/types.ts";
import Dropdown from "../Dropdown/Dropdown.vue";
import SearchBar from "../SearchInput/SearchBar.vue";
import Table from "../atoms/Table.vue";
import type { Header } from "../../types/tableTypes.ts";
import Pagination from "../Pagination/Pagination.vue";
import useEmployeeApi from "../../modules/employee/api/apiEmployee.ts";
import usePositionApi from "../../modules/position/api/apiPosition.ts";
import useTeamApi from "../../modules/team/api/apiTeam.ts";
import type {
  EmployeeIndexRequest,
  EmployeeIndexResponse,
  EmployeeWithDetail,
} from "../../types/employee.ts";

const teams = ref<DropdownModel<string>[]>([]);
const postions = ref<DropdownModel<string>[]>([]);
// const employees = ref();

const sumEmployee = computed(() => rawData.value.rowCount);
const employeeApi = useEmployeeApi();
const positionApi = usePositionApi();
const teamApi = useTeamApi();

const selectedHeaders = ref<Header[]>([
  { Name: "FirstName", Key: "firstname" },
  { Name: "Email", Key: "email" },
  { Name: "Team", Key: "team_name" },
  { Name: "Position", Key: "position_name" },
]);

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
.searchMenu {
  display: flex;
  gap: 10px;
}
.resetButton {
  display: flex;
  align-items: end;
}

.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
.currPage {
  display: flex;
  gap: 10px;
  input {
    width: 20px;
  }
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
