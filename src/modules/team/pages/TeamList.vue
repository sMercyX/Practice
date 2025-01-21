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
        v-model:input="searchTeam"
        @blur="confirmInput"
        @keyup.enter="confirmInput"
      />
    </div>
    <div class="right"></div>
  </div>
  <div>
    <Table :headers="selectedHeaders" :data="paginationData">
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>

      <template #AddEdit="{ row }">
        <button @click="openFormEdit(row.teamId)">Edit</button>
        <button @click="openFormDelete(row.teamId)">Delete</button>
      </template>
    </Table>

    <Pagination
      :data="selectedTeam"
      :pageData="pageData"
      @newData="handleNewData"
      @paginationData="loadData"
    />
  </div>

  <Form1
    v-if="isFormOpen"
    :data="selectedTeam"
    :id="idToEditDelete"
    :header="header"
    @back="close"
  />
  <!-- <input type="text" id="input1" /> -->
  <Delete
    v-if="isDeleteOpen"
    :id="idToEditDelete"
    @back="close"
    @deleteSubmit="handleDelete"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Pagi, PagiData, TP } from "../../../types/types.ts";
import SearchBar from "../../../components/SearchInput/SearchBar.vue";

import Table from "../../../components/atoms/Table.vue";
import type { Header } from "../../../types/tableTypes.ts";
import Pagination from "../../../components/Pagination/Pagination.vue";
import { postItem } from "../../../utils/fetch.ts";
import Form1 from "../../../components/atoms/Form1.vue";
import Delete from "../../../components/atoms/Delete.vue";
import { deleteTeam } from "../api/apiTeam.ts";

// const a = 0
// const teams = ref<TeamType>();
// const a = reactive({})

const searchTeam = ref<string>("");
const sumTeam = computed(() => pageData.value.pageRow);
const selectedTeam = ref<TP[]>([]);
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
  await deleteTeam(id);

  const index = paginationData.value.findIndex((item) => item.teamId === id);
  paginationData.value.splice(index, 1);
};

const formattedDefault = ref({
  pageIndex: 0,
  pageSize: 5,
  search: {},
});
const pageData = ref<PagiData>({
  pageRow: 0,
  pageIndex: 0,
  pageSize: 0,
});
const loadData = async (pagiData: Pagi) => {
  formattedDefault.value = pagiData;
  try {
    const datas = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Team/Index`,
      formattedDefault.value
    );
    selectedTeam.value = datas.data;
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
  const filter = {
    pageIndex: 0,
    pageSize: pageData.value.pageSize,
    search: {
      text: searchTeam.value,
    },
  };
  loadData(filter);
};


const paginationData = ref<TP[]>([]);

const handleNewData = (data: TP[]) => {
  paginationData.value = data;
};

// const input1 = document.getElementById("input1");
// console.log(input1);
// console.log(input1);
// console.time("mounted");
// console.time("setup");

(async () => {
  await loadData(formattedDefault.value);
})();

//  async function name() { // function

//  }
//  name() // call function

//  const a = ()=> {}

//  ()=> {} //anonymous function

// ( ()=>{})  () ;//self-invoking function

// (async ()=>{
//   await loadData(formattedDefault.value);
// })  ()

// console.timeEnd("setup");

// onMounted(async () => {
//   console.timeEnd("mounted");
//   await loadData(formattedDefault.value);

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
