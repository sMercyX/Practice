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
    <tbody>
      <tr class="row" v-for="(row, rowIndex) in data" :key="rowIndex" >
        <!-- Flexible data rendering with slot fallback -->
        <td v-for="(header, colIndex) in headers" :key="colIndex" @click="$emit('view',row.id)">
          <slot name="cell" :row="row" :header="header">
            {{ row[header.Key as K] }}
          </slot>
        </td>
        <td>
          <slot name="Button" :row="row">
            <button @click="$emit('edit', row.id)">Edit</button>
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Employ1Details } from "../../types/types";
import type { Header } from "../../types/tableTypes.ts";

defineProps<{
  headers: Header[];
  data: any[];
}>();


defineEmits(['edit','view']);

type K = keyof Employ1Details ;
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
.row{
  transition: all 0.3s;
}
.row:hover{
  background-color: rgb(230, 228, 228);
}

</style>
