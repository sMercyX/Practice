<template>
  <div>
    <div class="Head">
      <h1>Employee ( {{ sumEmployee }} )</h1>

      <PrimaryButton
        @click="navigateTo('createEmployee')"
        text="Create"
        size="md"
        :disable="false"
      >
        <template #prefix> &plus; </template>
      </PrimaryButton>
    </div>

    <div class="searchMenu">
      <div class="left">
        <Dropdown
          :list="teams"
          v-model="tableState.search.teamId"
          :all="true"
          :disable="false"
        />
        <Dropdown
          :list="postions"
          v-model="tableState.search.positionId"
          :all="true"
          :disable="false"
        />
        <SearchBar
          header="SearchBar"
          :input="tableState.search.text"
          placeholder="name email"
          @keyup="
            tableState.search.text = ($event.target as HTMLInputElement).value
          "
        />
        <div class="resetButton">
          <OutlineButton
            text="Reset"
            size="md"
            :disable="false"
            @click="resetFilters"
          />
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div>
    <Table
      :headers="selectedHeaders"
      :data="tableState.data"
      @view="navigateToView"
    >
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>
      <template #AddEdit="{ row }">
          <IconButton
            size="md"
            :disable="false"
            @click="navigateToEmployee(row.employeeId!)"
          >
            <template #icon>
              <IconEdit />
            </template>
          </IconButton>
          <IconButton
            size="md"
            :disable="false"
            @mousedown="openFormDelete(row.employeeId!)"
          >
            <template #icon>
              <IconBin />
            </template>
          </IconButton>
      </template>
    </Table>
    <Pagination :data="rawData" @paginationData="handleNewPageData" />
  </div>
  <ModalDelete ref="modalDelete"></ModalDelete>
  <RouterView />
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import Dropdown from "../../components/Dropdown/Dropdown.vue"
import SearchBar from "../../components/SearchInput/SearchBar.vue"

import Table from "../../components/atoms/Table.vue"
import type { Header } from "../../types/tableTypes.ts"
import { useRouter } from "vue-router"
import Pagination from "../../components/Pagination/Pagination.vue"
import type { EmployeeWithDetail } from "../../types/employee.ts"

import ModalDelete from "../../components/atoms/ModalDelete.vue"
import useMasterData from "./dataProvider/masterData.ts"
import usePageIndex from "./dataProvider/pageIndex.ts"
import type { EmployeeIndexResponse } from "../../composables/api/employeeApi.ts"
import IconEdit from "../../components/Icon/IconEdit.vue"
import IconBin from "../../components/Icon/IconBin.vue"
import PrimaryButton from "../../components/Button/PrimaryButton.vue"
import IconButton from "../../components/Icon/IconButton.vue"
import OutlineButton from "../../components/Button/OutlineButton.vue"

const masterDataProvider = useMasterData()
const { teams, postions } = masterDataProvider
const pageIndexDataProvider = usePageIndex(masterDataProvider)

const router = useRouter()

const { tableState, resetFilters, handleNewPageData } = pageIndexDataProvider
const sumEmployee = computed(() => tableState.rowCount)
const rawData = ref(pageIndexDataProvider.rawData)

const selectedHeaders = ref<Header<EmployeeWithDetail, "manage">[]>([
  { Name: "FirstName", Key: "firstname" },
  { Name: "Email", Key: "email" },
  { Name: "Team", Key: "team_name" },
  { Name: "Position", Key: "position_name" },
  { Name: "Manage", Key: "manage" },
])

const modalDelete = ref<InstanceType<typeof ModalDelete>>(null!)
const openFormDelete = async (id: string) => {
  const confirm = await modalDelete.value.openModal()
  if (confirm) {
    pageIndexDataProvider.deleteItem(id)
  }
}

const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute })
}
const navigateToEmployee = (employeeId: string) => {
  router.push({ name: "editEmployee", params: { employeeId: employeeId } })
}

const navigateToView = (data: EmployeeIndexResponse) => {
  router.push({
    name: "viewEmployee",
    params: { employeeId: data.employeeId },
  })
}

;(async () => {
  await Promise.all([
    pageIndexDataProvider.loadEmployee(),
    masterDataProvider.loadMasterData(),
  ])
})()
</script>

<style scoped>
.Head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
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

p {
  margin: 0px;
}
.tableEm {
  width: 100%;
  border: red 1px solid;
}
</style>
