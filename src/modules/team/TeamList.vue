<template>
  <div class="Head">
    <h2>Team ( {{ sumTeam }} )</h2>
    <PrimaryButton
      @click="oepnModalForm('')"
      text="Create"
      size="md"
      :disable="false"
    />
  </div>
  <hr />

  <div class="searchMenu">
    <div class="left">
      <SearchBar
        header="SearchBar"
        :input="tableState.search.text"
        placeholder="name"
        @keyup="
          tableState.search.text = ($event.target as HTMLInputElement).value
        "
      />
    </div>
    <div class="right"></div>
  </div>
  <div >
    <Table  :headers="selectedHeaders" :data="tableState.data">
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>

      <template #AddEdit="{ row }">
        <IconButton
          size="md"
          :disable="false"
          @click="oepnModalForm(row.teamId!)"
        >
          <template #icon>
            <IconEdit />
          </template>
        </IconButton>

        <IconButton
          size="md"
          :disable="false"
          @mousedown="openFormDelete(row.teamId!)"
        >
          <template #icon>
            <IconBin />
          </template>
        </IconButton>
      </template>
    </Table>
  </div>
  <Pagination :data="rawData" @paginationData="handleNewPageData" />

  <ModalForm1 ref="modalFormgggggggggggggg" :header="header"></ModalForm1>

  <ModalDelete ref="modalDelete"></ModalDelete>
</template>

<script setup lang="ts">
import { ref, computed, useTemplateRef, provide, inject } from "vue"
import SearchBar from "../../components/SearchInput/SearchBar.vue"

import Table from "../../components/atoms/Table.vue"
import type { Header } from "../../types/tableTypes.ts"
import Pagination from "../../components/Pagination/Pagination.vue"
import ModalDelete from "../../components/atoms/ModalDelete.vue"
import usePageIndexTeam from "./dataProvider/pageIndexTeam.ts"
import ModalForm1 from "../../components/atoms/ModalForm1.vue"
import useManageTeam from "./dataProvider/pageEditTeam.ts"
import { editMasterDataProviderKey } from "../../types/modalForm1.ts"
import { eventBusKey } from "../../types/eventButKey.ts"
import IconBin from "../../components/Icon/IconBin.vue"
import IconEdit from "../../components/Icon/IconEdit.vue"
import PrimaryButton from "../../components/Button/PrimaryButton.vue"
import IconButton from "../../components/Icon/IconButton.vue"

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

const eventBus = inject(eventBusKey)!

eventBus.on("deleteTeamPosition", () => {
  loadTeam()
})
const modalForm = useTemplateRef("modalFormgggggggggggggg")
const oepnModalForm = (id: string) => {
  modalForm.value?.openModal(id)
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

  /* .createButton {
    padding: 10px 20px;
    background-color: #2bb8af;
    color: #fff;
    border: none;
    align-items: center;
    text-align: center;
  } */
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

.tableS {
  border: 1px solid red;
  height: 200px;
  overflow-y: scroll;
}
</style>
