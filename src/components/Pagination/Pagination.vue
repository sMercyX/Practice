<template>
  <div class="pagination">
    <div>
      <p>
        Show
        <select v-model.number="pageSize" @change="updatePageSize($event)">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>

        {{ (currentPage - 1) * pageSize + 1 }} -
        {{
          sumData < (currentPage - 1) * pageSize + pageSize
            ? sumData
            : (currentPage - 1) * pageSize + pageSize
        }}
        of
        {{ sumData }}
      </p>
    </div>
    <div class="currPage">
      <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
      <span
        ><input
          type="text"
          v-model="currentPage"
          @change="updateCurrentPage($event)"
        />
        / {{ totalPages }}</span
      >
      <button @click="nextPage" :disabled="currentPage >= totalPages">
        &gt;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

import type { Dropdown, Employ1Details } from "../../types/types.ts";

const props = defineProps<{
  data: any[];
}>();

const currentPage = ref<number>(1);
const pageSize = ref<number>(10);

const localData = ref([...props.data]);

const sumData = computed(() => localData.value.length);

const newData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const slicedData = localData.value.slice(
    startIndex,
    startIndex + pageSize.value
  );
  emit("newData", slicedData);
  return slicedData;
});

const totalPages = computed(() =>
  Math.ceil(localData.value.length / pageSize.value)
);

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
  emit("newData", newData.value);
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
  emit("newData", newData.value);
};

const updatePageSize = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  pageSize.value = Number(target.value);
  currentPage.value = 1;
  emit("newData", newData.value);
};

const updateCurrentPage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  currentPage.value = Number(target.value);

  emit("newData", newData.value);
};

watch(
  () => props.data,
  (newD) => {
    localData.value = [...newD]; // Update the local copy
    currentPage.value = 1;
    emit("newData", newData.value);
  },
  { deep: true }
);

const emit = defineEmits<{
  (e: "newData", newData: any[]): void;
}>();
emit("newData", newData.value);
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

<!-- HOW TO USE  -->

<!-- <Pagination :data="selectedEmployees" @newData="handleNewData" /> -->

<!-- const paginationData = ref<Employ1Details[]>([]);

const handleNewData = (data: Employ1Details[]) => {
  paginationData.value = data;
}; -->

<!-- ------------- -->
