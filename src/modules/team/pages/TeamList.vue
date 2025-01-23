<template>
  <div class="Head">
    <h2>Team ( {{ sumTeam }} )</h2>
    <div class="createEmployeeButton">
      <button class="createButton" @click="openFormCreate()">
        <span>&plus;</span> Create
      </button>
    </div>
  </div>
  <hr />

  <div class="searchMenu">
    <div class="left">
      <SearchBar
        header="SearchBar"
        :input="tableState.search.text"
        @keyup="
          tableState.search.text = ($event.target as HTMLInputElement).value
        "
      />
    </div>
    <div class="right"></div>
  </div>
  <div>
    <Table :headers="selectedHeaders" :data="tableState.data">
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>

      <template #AddEdit="{ row }">
        <button @click="openFormEdit(row.teamId!)">Edit</button>
        <button @click="openFormDelete(row.teamId!)">Delete</button>
      </template>
    </Table>

    <Pagination :data="rawData" @paginationData="handleNewPageData" />
  </div>

  <Form1
    v-if="isFormOpen"
    :data="tableState.data"
    :id="idToEditDelete"
    :header="header"
    @back="close"
  />
  <ModalDelete ref="modalDelete"></ModalDelete>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from "vue";
import type {
  PaginationResponse,
  TableState,
} from "../../../types/types.ts";
import SearchBar from "../../../components/SearchInput/SearchBar.vue";

import Table from "../../../components/atoms/Table.vue";
import type { Header } from "../../../types/tableTypes.ts";
import Pagination from "../../../components/Pagination/Pagination.vue";
import Form1 from "../../../components/atoms/Form1.vue";
import useTeamApi from "../api/apiTeam.ts";
import type { EmployeeIndexRequest } from "../../../types/employee.ts";
import type { TeamResponse } from "../../../types/teamPositions.ts";
import ModalDelete from "../../../components/atoms/ModalDelete.vue";

const teamApi = useTeamApi();
const sumTeam = computed(() => tableState.rowCount);
const selectedHeaders = ref<Header[]>([
  { Name: "TeamName", Key: "name" },
  { Name: "Description", Key: "description" },
  { Name: "Manage", Key: "manage" },
]);
const header = ref<string>("team");

const idToEditDelete = ref<string>("");
const isFormOpen = ref<boolean>(false);
const isDeleteOpen = ref<boolean>(false);

const openFormEdit = (id: string) => {
  idToEditDelete.value = id;
  isFormOpen.value = true;
};

const openFormCreate = () => {
  isFormOpen.value = true;
};

const modalDelete = ref<InstanceType<typeof ModalDelete>>(null!);
const openFormDelete = async (id: string) => {
  const confirm = await modalDelete.value.openModal();
  console.log(confirm);
  if (confirm) {
    handleDelete(id);
  }
}

const close = () => {
  idToEditDelete.value = "";
  isFormOpen.value = false;
  isDeleteOpen.value = false;
};

const handleDelete = async (id: string) => {
  await teamApi.deleteTeam(id);
  await loadData();
};

const rawData = ref<PaginationResponse<TeamResponse<string>[]>>({
  pageIndex: 0,
  rowCount: 0,
  pageSize: 0,
  data: [],
});

const tableState: TableState<EmployeeIndexRequest, TeamResponse<string>[]> =
  reactive({
    pageIndex: 0,
    pageSize: 10,
    rowCount: computed(() => rawData.value.rowCount),
    data: computed(() => rawData.value.data),
    search: {
      text: "",
    },
  });

const loadData = async () => {
  try {
    const datas = await teamApi
      .fetchDataTeam({
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
  data: PaginationResponse<TeamResponse<string>[]>
) => {
  tableState.pageIndex = data.pageIndex;
  tableState.pageSize = data.pageSize;
};

(async () => {
  await Promise.all([loadData()]);
})();

watch(
  [
    () => tableState.pageIndex,
    () => tableState.pageSize,
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
  margin-bottom: 15px;
  h2 {
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

/* delete Modal */
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
}
.modalContent {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}
.modalActions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
.confirmDeleteButton {
  padding: 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
}
.confirmDeleteButton:hover {
  background-color: #c0392b;
}
.cancelButton {
  padding: 10px;
  background-color: #95a5a6;
  color: white;
  border: none;
  cursor: pointer;
}
.cancelButton:hover {
  background-color: #7f8c8d;
}
</style>
