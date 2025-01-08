<script setup lang="ts">
import { ref } from "vue";
import { teamList, postionList } from "../assets/data/firstData";

const teams = ref(teamList);
const postions = ref(postionList);
const selectedTeam = ref<string>("");
const selectedPosition = ref<string>("");

const handleTeamSelection = () => {
};
const handlePositionSelection = () => {
};

</script>

<template>
  <container>
    <div class="team">
      <p>Team</p>
      <select v-model="selectedTeam" @change="handleTeamSelection">
        <option v-for="team in teams" :key="team.id" :value="team.name">
          {{ team.name }}
        </option>
      </select>
    </div>

    <div class="position">
      <p>Position</p>
      <select v-model="selectedPosition" @change="handlePositionSelection">
        <option v-for="position in postions" :key="position.id" :value="position.name">
          {{ position.name }}
        </option>
      </select>
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
