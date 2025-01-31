<template>
  <div class="pagination">
    <div class="head">
      <p>Show</p>
      <!-- <select v-model.number="pageSize" @change="updatePageSize($event)">
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select> -->
      <Dropdown
        :list="num"
        :modelValue="selectednum"
        :disable="false"
        :all="false"
        @update:modelValue="updatePageSize($event)"
        class="dropD"
      />
      <p>
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
      <IconButton size="sm" :disable="currentPage === 1" @click="prevPage">
        <template #icon>
          <IconLeftArrow />
        </template>
      </IconButton>

      <span>
        <!-- <input
          type="text"
          v-model="currentPage"
          @change="updateCurrentPage($event)"
        /> -->
        <InputText
          class="ip"
          :input="currentPage"
          :required="true"
          :disable="false"
          :placeHolder="'1'"
          @change="updateCurrentPage($event)"
        />

        / {{ totalPages }}</span
      >
      <IconButton
        size="sm"
        :disable="currentPage >= totalPages"
        @click="nextPage"
      >
        <template #icon>
          <IconRightArrow />
        </template>
      </IconButton>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref, computed, watch } from "vue"
import type { PaginationResponse } from "../../types/types"
import IconButton from "../Icon/IconButton.vue"
import IconRightArrow from "../Icon/IconRightArrow.vue"
import IconLeftArrow from "../Icon/IconLeftArrow.vue"
import InputText from "../Input/InputText.vue"
import Dropdown from "../Dropdown/Dropdown.vue"

const props = defineProps<{
  data: PaginationResponse<T[]>
}>()

const num = ref([
  // {value: 1, text: '1'},
  { value: 5, text: "5" },
  { value: 10, text: "10" },
  { value: "50", text: "50" },
])

const currentPage = ref<number>(props.data.pageIndex + 1)
const pageSize = ref<number>(props.data.pageSize)
const localData = ref([...props.data.data])
const selectednum = computed(() => pageSize.value)

const pagiData = computed(() => ({
  pageIndex: currentPage.value - 1,
  pageSize: pageSize.value,
  rowCount: sumData.value,
  data: localData.value,
}))

const sumData = ref(props.data!.rowCount)

const totalPages = computed(() =>
  Math.ceil(props.data!.rowCount / pageSize.value)
)

const nextPage = () => {
  currentPage.value++
  emit("paginationData", pagiData.value as PaginationResponse<T[]>)
}

const prevPage = () => {
  currentPage.value--
  emit("paginationData", pagiData.value as PaginationResponse<T[]>)
}

const updatePageSize = (ps: Event) => {
  pageSize.value = Number(ps)
  currentPage.value = 1
  emit("paginationData", pagiData.value as PaginationResponse<T[]>)
}
// const updatePageSize = (event: Event) => {
//   const target = event.target as HTMLSelectElement
//   pageSize.value = Number(target.value)
//   currentPage.value = 1
//   emit("paginationData", pagiData.value as PaginationResponse<T[]>)
// }

const updateCurrentPage = (event: Event) => {
  const target = event.target as HTMLInputElement
  currentPage.value = Number(target.value) ? Number(target.value) : 1
  emit("paginationData", pagiData.value as PaginationResponse<T[]>)
}

watch(
  () => props.data,
  () => {
    currentPage.value = props.data!.pageIndex + 1
    pageSize.value = props.data!.pageSize
    sumData.value = props.data.rowCount
  },
  { deep: true }
)

const emit = defineEmits<{
  (e: "paginationData", pagiData: PaginationResponse<T[]>): void
}>()

;() => {
  emit("paginationData", pagiData.value as PaginationResponse<T[]>)
}
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
  /* width: 824px; */
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;

  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 165.52px;
  height: 24px;

  gap: 5px;

}
.currPage {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 119.58px;
  height: 24px;

  gap: 5px;

  color: #646d78;
  .ip {
    width: 32px;
    height: 24px;
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
  color: #646d78;
}
.head {
  display: flex;
}
.dropD {
  width: 52px;
  height: 24px;
  margin: 0 2px;
}
</style>

<!-- HOW TO USE  -->

<!-- <Pagination :data="selectedEmployees" @newData="handleNewData" /> -->

<!-- const paginationData = ref<Employ1Details[]>([]);

const handleNewData = (data: Employ1Details[]) => {
  paginationData.value = data;
}; -->

<!-- ------------- -->
