<script setup lang="ts">
import { ref } from "vue";
import { teamList, postionList } from "../assets/data/firstData";
import Dropdown from "./Dropdown.vue";

const teams = ref(teamList);
const postions = ref(postionList);
const selectedTeam = ref<number>(0);
const selectedPosition = ref<number>(2);

const handleTeamSelection = () => {
};
const handlePositionSelection = () => {
};

</script>

<template>
  <container>
    <div class="team">
      <p>Team</p>
      <Dropdown v-model:selected="selectedTeam" :list="teams"/>
  
    </div>

    <div class="position">
      <p>Position</p>
      <Dropdown v-model:selected="selectedPosition" :list="postions"/>

     
    </div>
  </container>
</template>

<style scoped>
p {
  margin: 0px;
}
input {
  margin-bottom: 10px;
}
</style>
