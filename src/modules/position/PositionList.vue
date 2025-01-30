<template>
  <div class="Head">
    <h2>Position ( {{ sumPosition }} )</h2>
    
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
      <!-- <SearchBar header="SearchBar" v-model:input="searchPosition" /> -->
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
  <div>
    <Table :headers="selectedHeaders" :data="tableState.data">
      <template #header="{ header }">
        <strong>{{ header["Name"] }}</strong>
      </template>
      <template #AddEdit="{ row }">
        <IconButton
          size="md"
          :disable="false"
          @click="oepnModalForm(row.positionId!)"
        >
          <template #icon>
            <IconEdit />
          </template>
        </IconButton>
        <IconButton
          size="md"
          :disable="false"
          @mousedown="openFormDelete(row.positionId!)"
        >
          <template #icon>
            <IconBin />
          </template>
        </IconButton>
      </template>
    </Table>

    <Pagination :data="rawData" @paginationData="handleNewPageData" />
  </div>

  <ModalForm1 ref="modalForm" :header="header"></ModalForm1>
  <ModalDelete ref="modalDelete"></ModalDelete>

</template>

<script setup lang="ts">
import { ref, computed, useTemplateRef, provide, inject } from "vue"
import SearchBar from "../../components/SearchInput/SearchBar.vue"
import Table from "../../components/atoms/Table.vue"
import type { Header } from "../../types/tableTypes.ts"
import Pagination from "../../components/Pagination/Pagination.vue"
import ModalDelete from "../../components/atoms/ModalDelete.vue"
import usePageIndexPosition from "./dataProvider/pageIndexPosition.ts"
import ModalForm1 from "../../components/atoms/ModalForm1.vue"
import useMangePosition from "./dataProvider/pageEditPosition.ts"
import { editMasterDataProviderKey } from "../../types/modalForm1.ts"
import { eventBusKey } from "../../types/eventButKey.ts"
import IconEdit from "../../components/Icon/IconEdit.vue"
import IconBin from "../../components/Icon/IconBin.vue"
import PrimaryButton from "../../components/Button/PrimaryButton.vue"
import IconButton from "../../components/Icon/IconButton.vue"

const pageIndexDataProvider = usePageIndexPosition()

const { tableState, deleteItem, handleNewPageData, loadPosition } =
  pageIndexDataProvider
const sumPosition = computed(() => tableState.rowCount)
const rawData = ref(pageIndexDataProvider.rawData)

const selectedHeaders = ref<Header[]>([
  { Name: "TeamName", Key: "name" },
  { Name: "Description", Key: "description" },
  { Name: "Manage", Key: "manage" },
])
const header = ref<string>("position")

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
  loadPosition()
})
const modalForm = useTemplateRef("modalForm")
const oepnModalForm = (id: string) => {
  modalForm.value?.openModal(id)
}

const managePositionDataProvider = useMangePosition()
provide(editMasterDataProviderKey, managePositionDataProvider)
;(async () => {
  await Promise.all([pageIndexDataProvider.loadPosition()])
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
</style>
