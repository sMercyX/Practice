<template>
  <div class="Head">
    <h2>Position ( {{ sumPosition }} )</h2>
    <div class="createEmployeeButton">
      <button class="createButton" @click="openForm">
        <span>&plus;</span> Create
      </button>
    </div>
  </div>
  <hr />
  <div class="searchMenu">
    <div class="left">
      <SearchBar header="SearchBar" v-model:input="searchPosition" />
    </div>
    <div class="right"></div>
  </div>
  <div>
    <Table :headers="selectedHeaders" :data="tableState.data">
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>
      <template #AddEdit="{ row }">
        <button @click="openFormEdit(row.positionId!)">Edit</button>
        <button @click="openFormDelete(row.positionId!)">Delete</button>
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
import type { PaginationResponse, TableState } from "../../../types/types.ts";
import SearchBar from "../../../components/SearchInput/SearchBar.vue";
import Table from "../../../components/atoms/Table.vue";
import type { Header } from "../../../types/tableTypes.ts";
import Pagination from "../../../components/Pagination/Pagination.vue";
import Form1 from "../../../components/atoms/Form1.vue";
import usePositionApi from "../api/apiPosition.ts";
import type { PositionResponse } from "../../../types/teamPositions.ts";
import type { EmployeeIndexRequest } from "../../../types/employee.ts";
import ModalDelete from "../../../components/atoms/ModalDelete.vue";

const searchPosition = ref<string>("");
const sumPosition = computed(() => tableState.rowCount);
const selectedHeaders = ref<Header[]>([
  { Name: "TeamName", Key: "name" },
  { Name: "Description", Key: "description" },
  { Name: "Manage", Key: "manage" },
]);
const header = ref<string>("position");

const positionApi = usePositionApi();

const idToEditDelete = ref<string>("");
const isFormOpen = ref<boolean>(false);
const isDeleteOpen = ref<boolean>(false);

const openFormEdit = (id: string) => {
  idToEditDelete.value = id;
  isFormOpen.value = !isFormOpen.value;
};

const openForm = () => {
  isFormOpen.value = true;
};

const modalDelete = ref<InstanceType<typeof ModalDelete>>(null!);
const openFormDelete = async (id: string) => {
  const confirm = await modalDelete.value.openModal();
  console.log(confirm);
  if (confirm) {
    handleDelete(id);
  }
};

const close = () => {
  idToEditDelete.value = "";
  isFormOpen.value = false;
  isDeleteOpen.value = false;
};
const handleDelete = async (id: string) => {
  await positionApi.deletePosition(id);
  await loadData();
};

const rawData = ref<PaginationResponse<PositionResponse<string>[]>>({
  pageIndex: 0,
  rowCount: 0,
  pageSize: 0,
  data: [],
});

const tableState: TableState<EmployeeIndexRequest, PositionResponse<string>[]> =
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
    const datas = await positionApi
      .fetchDataPosition({
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
  data: PaginationResponse<PositionResponse<string>[]>
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
</style>
