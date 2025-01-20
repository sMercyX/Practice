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
    <!-- <EmployeeTable :employee="selectedEmployees" /> -->
    <Table :headers="selectedHeaders" :data="paginationData">
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>
      <template #AddEdit="{ row }">
        <button @click="openFormEdit(row.positionId)">Edit</button>
        <button @click="openFormDelete(row.positionId)">Delete</button>
      </template>
    </Table>

    <Pagination
      :data="selectedPosition"
      :pageData="pageData"
      @newData="handleNewData"
      @paginationData="loadData"
    />
  </div>

  <Form1
    v-if="isFormOpen"
    :data="selectedPosition"
    :id="idToEditDelete"
    :header="header"
    @back="close"
  />

  <Delete
    v-if="isDeleteOpen"
    :id="idToEditDelete"
    @back="close"
    @deleteSubmit="handleDelete"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { ImpData, Pagi, PagiData, Pos } from "../../../types/types.ts";
import SearchBar from "../../../components/SearchInput/SearchBar.vue";
import Table from "../../../components/atoms/Table.vue";
import type { Header } from "../../../types/tableTypes.ts";
import Pagination from "../../../components/Pagination/Pagination.vue";
import { postItem } from "../../../utils/fetch.ts";
import Form1 from "../../../components/atoms/Form1.vue";
import Delete from "../../../components/atoms/Delete.vue";
import { deletePosition, fetchDataPosition } from "../api/apiPosition.ts";

const positions = ref<Pos>();
const searchPosition = ref<string>("");
const sumPosition = computed(() => pageData.value.pageRow);
const selectedPosition = ref<Pos[]>([]);
const selectedHeaders = ref<Header[]>([
  { Name: "TeamName", Key: "name" },
  { Name: "Description", Key: "description" },
  { Name: "Manage", Key: "manage" },
]);
const header = ref<string>("position");

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

const openFormDelete = (id: string) => {
  idToEditDelete.value = id;
  isDeleteOpen.value = true;
};

const close = () => {
  idToEditDelete.value = "";
  isFormOpen.value = false;
  isDeleteOpen.value = false;
};
const handleDelete = async (id: string) => {
  await deletePosition(id);

  const index = paginationData.value.findIndex(
    (item) => item.positionId === id
  );
  paginationData.value.splice(index, 1);
};

const formattedDefault = {
  pageIndex: 0,
  pageSize: 5,
  search: {},
};
const pageData = ref<PagiData>({
  pageRow: 0,
  pageIndex: 0,
  pageSize: 0,
});
const loadData = async (pagiData: Pagi) => {
  const formatted = pagiData;
  try {
    const datas = await fetchDataPosition(formatted);
    selectedPosition.value = datas.data;
    pageData.value = {
      pageRow: datas.rowCount,
      pageIndex: datas.pageIndex + 1,
      pageSize: datas.pageSize,
    };
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

// const filterEmployees = () => {
//   selectedPosition.value = positions.value.filter((data: any) =>
//     searchPosition.value
//       ? data.name.toLowerCase().includes(searchPosition.value.toLowerCase())
//       : true
//   );
// };

const paginationData = ref<Pos[]>([]);

const handleNewData = (data: Pos[]) => {
  paginationData.value = data;
};

// watch([searchPosition], filterEmployees);
(async () => {
  await loadData(formattedDefault);
})();

// onMounted(async () => {
//   await loadData(formattedDefault);
//   // filterEmployees();
// });
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
