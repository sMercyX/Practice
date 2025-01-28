<template>
  <div class="Head">
    <h2>Team ( {{ sumTeam }} )</h2>
    <div class="createEmployeeButton">
      <button class="createButton" @click="oepnModalForm('')">
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
        <button @click="oepnModalForm(row.teamId!)">Edit</button>
        <button @click="openFormDelete(row.teamId!)">Delete</button>
      </template>
    </Table>

    <Pagination :data="rawData" @paginationData="handleNewPageData" />
  </div>

  <ModalForm1 ref="modalFormgggggggggggggg" :header="header"></ModalForm1>

  <ModalDelete ref="modalDelete"></ModalDelete>
</template>

<script setup lang="ts">
import { ref, computed, useTemplateRef, provide } from "vue"
import type { PaginationResponse } from "../../types/types.ts"
import SearchBar from "../../components/SearchInput/SearchBar.vue"

import Table from "../../components/atoms/Table.vue"
import type { Header } from "../../types/tableTypes.ts"
import Pagination from "../../components/Pagination/Pagination.vue"
import ModalDelete from "../../components/atoms/ModalDelete.vue"
import usePageIndexTeam from "./dataProvider/pageIndexTeam.ts"
import ModalForm1 from "../../components/atoms/ModalForm1.vue"
import useManageTeam from "./dataProvider/pageEditTeam.ts"
import type { TeamResponse } from "../../composables/api/teamApi.ts"
import { editMasterDataProviderKey } from "../../types/modalForm1.ts"

const pageIndexDataProvider = usePageIndexTeam()

const { tableState, deleteItem, handleNewPageData, loadTeam } =
  pageIndexDataProvider
const sumTeam = computed(() => tableState.rowCount)
const rawData = ref(pageIndexDataProvider.rawData)

const selectedHeaders = ref<Header[]>([
  { Name: "TeamName", Key: "name" },
  { Name: "Description", Key: "description" },
  { Name: "Manage", Key: "manage" },
])
const header = ref<string>("team")

const modalDelete = ref<InstanceType<typeof ModalDelete>>(null!)
const openFormDelete = async (id: string) => {
  const confirm = await modalDelete.value.openModal()
  console.log(confirm)
  if (confirm) {
    deleteItem(id)
  }
}

const modalForm = useTemplateRef("modalFormgggggggggggggg")
const oepnModalForm = async (id: string) => {
  const confirm = await modalForm.value?.openModal(id)
  if (confirm) {
    await loadTeam()
  }
}

const manageTeamDataProvider = useManageTeam()
provide(editMasterDataProviderKey, manageTeamDataProvider)
;(async () => {
  await Promise.all([pageIndexDataProvider.loadTeam()])
})()
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
