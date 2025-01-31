<template>
  <div class="g">
    <CardWithIcon title="Title">
      <template #Icon> <IconEdit class="IconWithBg" /> </template>
    </CardWithIcon>

    <CardWithIcon title="Title">
      <template #Icon> <IconEdit class="IconWithBg" /> </template>
      <template #footer>
        <div class="Footers">
          Copyright © ClickNext Co.,Ltd All Right Reserved.
        </div>
      </template>
    </CardWithIcon>

    <CardWithIcon title="Title"> </CardWithIcon>

    <div class="breakHalf">
      <CardWithIcon title="Title">
        <template #Icon> <IconEdit class="IconWithBg" /> </template>
        <template #content>
          <div class="breakHalf">
            <div class="breakDown">
              <label for="firstBane"> First Name <span>*</span></label>
              <InputText
                class="widthFull"
                :input="someThing"
                :required="true"
                :disable="false"
                placeHolder="brabrabra"
              />
            </div>
            <div class="breakDown">
              <label for="lastName"> Last Name <span>*</span></label>
              <InputText
                class="widthFull"
                :input="someThing"
                :required="true"
                :disable="false"
                placeHolder="brabrabra"
              />
            </div>
          </div>
        </template>
        <template #footer>
          <div class="Footers">
            Copyright © ClickNext Co.,Ltd All Right Reserved.
          </div>
        </template>
      </CardWithIcon>

      <CardWithIcon title="Title">
        <template #Icon> <IconEdit class="IconWithBg" /> </template>
        <template #content>
          <div class="breakHalf">
            <div class="breakDown">
              <label for="firstBane"> First Name <span>*</span></label>
              <InputText
                class="widthFull"
                :input="someThing"
                :required="true"
                :disable="false"
                placeHolder="brabrabra"
              />
            </div>
            <div class="breakDown">
              <label for="lastName"> Last Name <span>*</span></label>
              <InputText
                class="widthFull"
                :input="someThing"
                :required="true"
                :disable="false"
                placeHolder="brabrabra"
              />
            </div>
          </div>
        </template>
      </CardWithIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardWithIcon from "../Card/CardWithIcon.vue"
import IconEdit from "../Icon/IconEdit.vue"
import InputText from "../Input/InputText.vue"
</script>

<style scoped>
.g {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
span {
  color: red;
}
.breakDown {
  display: flex;
  flex-direction: column;
}
.breakHalf {
  display: flex;
  flex-direction: row;
  gap: 4px;
}
.widthFull {
  width: 200px;
}
</style>
