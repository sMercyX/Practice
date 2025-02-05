<template>
  <div class="g">
    <div class="breakHalf">
      <CardWithIcon title="Basic Info">
        <template #Icon> <IconEdit /> </template>
      </CardWithIcon>
      <CardWithIcon>
        <template #content> 
          This is Content
          <br>
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </template>
      </CardWithIcon>
    </div>

    <div class="breakHalf">
      <CardWithIcon title="Basic Info">
        <template #Icon> <IconEdit /> </template>
        <template #footer>
          <div>Copyright © ClickNext Co.,Ltd All Right Reserved.</div>
        </template>
      </CardWithIcon>

      <CardWithIcon title="Title"> </CardWithIcon>
    </div>

    <div class="breakHalf">
      <CardWithIcon title="Title">
        <template #Icon> <IconEdit /> </template>
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
        <template #Icon> <IconEdit /> </template>

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
import { ref } from "vue"
import CardWithIcon from "../Card/CardWithIcon.vue"
import IconEdit from "../Icon/IconEdit.vue"
import InputText from "../Input/InputText.vue"

const someThing = ref("")
</script>

<style scoped>
.g {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
span {
  color: red;
}
.breakDown {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.breakHalf {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.widthFull {
  width: 264px;
  height: 30px;
}

label {
  height: 18px;
}
</style>
