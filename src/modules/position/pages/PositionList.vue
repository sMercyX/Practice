<template>
  <div class="Head">
    <h2>Position ( {{ sumPosition }} )</h2>
    <div class="createEmployeeButton">
      <button class="createButton" @click="navigateTo('settingCreatePosition')">
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
    <Table
      :headers="selectedHeaders"
      :data="paginationData"
      @edit="navigateToEdit"
    >
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>
      <template #Button="{ row }">
        <button @click="navigateToEdit(row.id)">Edit</button>
      </template>
    </Table>

    <Pagination :data="selectedPosition" @newData="handleNewData" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import type { Dropdown as DropdownType } from "../../../types/types.ts";
import SearchBar from "../../../components/SearchInput/SearchBar.vue";
import Table from "../../../components/atoms/Table.vue";
import type { Header } from "../../../types/tableTypes.ts";
import { useRouter } from "vue-router";
import Pagination from "../../../components/Pagination/Pagination.vue";
import { postItem } from "../../../utils/fetch.ts";

const positions = ref();
const searchPosition = ref<string>("");
const router = useRouter();
const sumPosition = computed(() => selectedPosition.value.length);
const selectedPosition = ref<DropdownType<number>[]>([]);
const selectedHeaders = ref<Header[]>([
  { Name: "TeamName", Key: "name" },
  { Name: "Manage", Key: "manage" },
]);

const loadData = async () => {
  const formatted = {
    pageIndex: 0,
    pageSize: 0,
    search: {},
  };
  try {
    const createdTask = await postItem(
      `${import.meta.env.VITE_BASE_URL}/position/index`,
      formatted
    );
    positions.value = createdTask.data;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute });
};
const navigateToEdit = (id: number) => {
  router.push({ name: "settingEditPosition", params: { positionId: id } });
};
const filterEmployees = () => {
  selectedPosition.value = positions.value.filter((data:any) =>
    searchPosition.value
      ? data.name.toLowerCase().includes(searchPosition.value.toLowerCase())
      : true
  );
};

const paginationData = ref<DropdownType<number>[]>([]);

const handleNewData = (data: DropdownType<number>[]) => {
  paginationData.value = data;
};

watch([searchPosition], filterEmployees);

onMounted(async () => {
  await loadData();
  filterEmployees();
});
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
