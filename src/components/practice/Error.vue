<template>
  <div class="errorPage">
    <IconCross class="icon" />
    <h1>
        Access Denined
    </h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
      exercitationem odit quis voluptate ipsam voluptates deserunt illum
      reprehenderit autem unde?
    </p>
  </div>
</template>

<script setup lang="ts">
import IconCross from '../Icon/IconCross.vue';

</script>

<style scoped>
.errorPage {
  width: 100vw;
  height: 95vh;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  .icon {
    width: 500px;
    height: 500px;

    color: red;
  }

  p {
    width: 500px;
  }
}
</style>
