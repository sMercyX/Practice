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

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import type { Pagi } from "../../types/types";

const props = defineProps<{
  data: any[];
  pageData: any
 
}>();

const currentPage = ref<number>(props.pageData!.pageIndex);
const pageSize = ref<number>(5);
const localData = ref([...props.data]);

// const localData = computed(()=> props.data)

const pagiData = computed(() => ({
  pageIndex: currentPage.value - 1,
  pageSize: pageSize.value,
  search: {},
}));

const sumData = computed(() => props.pageData!.pageRow);
const newData = computed(() => {
  emit("newData", newData.value);
  return localData.value
});

const totalPages = computed(() => Math.ceil(props.pageData!.pageRow / pageSize.value));

const nextPage = () => {
  currentPage.value++
  emit("newData", newData.value);
  emit("paginationData", pagiData.value);
  console.log(props.pageData.pageRow)

};

const prevPage = () => {
  currentPage.value--
  emit("newData", newData.value);
  emit("paginationData", pagiData.value);
};

const updatePageSize = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  pageSize.value = Number(target.value);
  currentPage.value = 1;
  emit("newData", newData.value);
  emit("paginationData", pagiData.value);
};

const updateCurrentPage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  currentPage.value = Number(target.value);

  emit("newData", newData.value);
  emit("paginationData", pagiData.value);
};

watch(
  () => props.data,
  (newD) => {
    localData.value = [...newD]; // Update the local copy
    currentPage.value = props.pageData!.pageIndex;
    emit("newData", newData.value);
    // emit("paginationData", pagiData.value);
  },
  { deep: true }
);

const emit = defineEmits<{
  (e: "newData", newData: any[]): void;
  (e: "paginationData", pagiData: Pagi): void;
}>();

onMounted(()=>{
  emit("newData", newData.value);
  emit("paginationData", pagiData.value);


})
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
