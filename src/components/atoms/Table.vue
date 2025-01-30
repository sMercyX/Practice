<template>
  <table>
    <thead>
      <tr>
        <!-- Customizable header using a slot with a fallback -->
        <th v-for="(header, index) in headers" :key="index">
          <slot name="header" :header="header">{{
            header.Name.toUpperCase()
          }}</slot>
        </th>
      </tr>
    </thead>
    <tbody >
      <tr class="row" v-for="(row, rowIndex) in data" :key="rowIndex">
        <!-- Flexible data rendering with slot fallback -->
        <td
          v-for="(header, colIndex) in headers"
          :key="colIndex"
          @click="$emit('view', row)"
        >
          <slot name="cell" :row="row" :header="header">
            {{
              row[header.Key as K] !== null || "" || undefined
                ? row[header.Key as K]
                : "-"
            }}
            <template v-if="header.Name === 'Manage'">
              <div class="LR">
                <slot name="AddEdit" :row="row"> </slot>
              </div>
            </template>
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts" generic="T">
import type { Header } from "../../types/tableTypes.ts"

defineProps<{
  headers: Header[]
  data: T[]
}>()

// defineEmits(["edit","delete", "view"]);
defineEmits<{
  (e: "view", data: T): void
}>()
type K = keyof T


</script>

<style scoped>
table {
  width: 100%;
}

th,
td {
  padding: 10px;
  text-align: left;
}
.row {
  transition: all 0.3s;

}

.row:hover {
  background-color: white;

 
}


.LR{
  display: flex;
  flex-direction: row;
}

/* make table have max height */
tbody {
  display: block;
  height: 400px;
  overflow-y: auto;
}
thead,
tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}


</style>
