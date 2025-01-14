<template>
  <div class="modalOverlay">
    <div class="modalContent">
      <h3>Are you sure you want to delete this Item?</h3>
      <p>{{ dataName }}</p>
      <div class="modalActions">
        <button @click="goBack" class="cancelButton">Cancel</button>
        <button @click="confirmDelete" class="confirmDeleteButton">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { teamList } from "../../assets/data/firstData";

const router = useRouter();
const route = useRoute();

const teams = ref(teamList);
const dataName = ref<string>("");

const goBack = () => {
  router.back();
};

onMounted(() => {
//   dataId.value = route.params.teamId as string || route.params.positionId as string || route.params.employeeId as string;

  dataName.value = Object.values(route.params).find(
    (value) => value !== undefined && value !== null && value !== ""
  ) as string;

});
const IdToDelete = ref<number | null>(null);


// const confirmDelete = () => {
//   if (teamIdToDelete.value !== null) {
//     const index = teams.value.findIndex(
//       (team) => team.id === teamIdToDelete.value
//     );
//     if (index !== -1) {
//       teams.value.splice(index, 1);
//     } else {
//       alert("Team not found!");
//     }
//     closeDeleteModal();
//   }
// };
</script>

<style scoped>
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
