<template>
  <div class="pagination">
    <div>
      <p>
        Show
        <select v-model.number="pageSize" @change="updatePageSize($event)">
          <option value="1">1</option>
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

<script setup lang="ts" generic="T">
import { ref, computed, watch } from "vue";
import type { PaginationResponse } from "../../types/types";

const props = defineProps<{
  data: PaginationResponse<T[]>;
}>();

const currentPage = ref<number>(props.data.pageIndex + 1);
const pageSize = ref<number>(props.data.pageSize);
const localData = ref([...props.data.data]);

const pagiData = computed(() => ({
  pageIndex: currentPage.value - 1,
  pageSize: pageSize.value,
  rowCount: sumData.value,
  data: localData.value,
}));

const sumData = ref(props.data!.rowCount);

const totalPages = computed(() =>
  Math.ceil(props.data!.rowCount / pageSize.value)
);

const nextPage = () => {
  currentPage.value++;
  emit("paginationData", pagiData.value as PaginationResponse<T[]>);
};

const prevPage = () => {
  currentPage.value--;
  emit("paginationData", pagiData.value as PaginationResponse<T[]>);
};

const updatePageSize = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  pageSize.value = Number(target.value);
  currentPage.value = 1;
  emit("paginationData", pagiData.value as PaginationResponse<T[]>);
};

const updateCurrentPage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  currentPage.value = Number(target.value);
  emit("paginationData", pagiData.value as PaginationResponse<T[]>);
};

watch(
  () => props.data,
  () => {
    currentPage.value = props.data!.pageIndex + 1;
    pageSize.value = props.data!.pageSize;
    sumData.value = props.data.rowCount;
  },
  { deep: true }
);

const emit = defineEmits<{
  (e: "paginationData", pagiData: PaginationResponse<T[]>): void;
}>();

() => {
  emit("paginationData", pagiData.value as PaginationResponse<T[]>);
};

// onMounted(()=>{
//   emit("newData", newData.value);
//   emit("paginationData", pagiData.value);
// })
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
