<template>
  <div class="fc">
    <h1>Button</h1>
    <div class="g">
      <PrimaryButton
        text="Primary Button"
        size="sm"
        :disable="false"
        @click="hello"
      />
      <PrimaryButton
        text="Primary Button"
        size="sm"
        :disable="true"
        @click="hello"
      />
      <PrimaryButton
        text="Primary Button"
        size="sm"
        :disable="false"
        @click="hello"
      >
        <template #prefix>+</template>
      </PrimaryButton>
      <PrimaryButton
        text="Primary Button"
        size="sm"
        :disable="false"
        @click="hello"
      >
        <template #suffix>+</template>
      </PrimaryButton>
    </div>
    <div class="g">
      <PrimaryButton
        text="Primary Button"
        size="md"
        :disable="false"
        @click="hello"
      />
      <PrimaryButton
        text="Primary Button"
        size="md"
        :disable="true"
        @click="hello"
      />
      <PrimaryButton
        text="Primary Button"
        size="md"
        :disable="false"
        @click="hello"
      >
        <template #prefix>+</template>
      </PrimaryButton>
      <PrimaryButton
        text="Primary Button"
        size="md"
        :disable="false"
        @click="hello"
      >
        <template #suffix>+</template>
      </PrimaryButton>
    </div>
    <h1>Button Outline</h1>
    <div class="g">
      <OutlineButton
        text="Outline Button"
        size="sm"
        :disable="false"
        @click="hello"
      />
      <OutlineButton
        text="Outline Button"
        size="sm"
        :disable="true"
        @click="hello"
      />
      <OutlineButton
        text="Outline Button"
        size="sm"
        :disable="false"
        @click="hello"
      >
        <template #prefix>+</template>
      </OutlineButton>
      <OutlineButton
        text="Outline Button"
        size="sm"
        :disable="false"
        @click="hello"
      >
        <template #suffix>+</template>
      </OutlineButton>
    </div>
    <div class="g">
      <OutlineButton
        text="Outline Button"
        size="md"
        :disable="false"
        @click="hello"
      /><OutlineButton
        text="Outline Button"
        size="md"
        :disable="true"
        @click="hello"
      /><OutlineButton
        text="Outline Button"
        size="md"
        :disable="false"
        @click="hello"
      >
        <template #prefix>+</template>
      </OutlineButton>
      <OutlineButton
        text="Outline Button"
        size="md"
        :disable="false"
        @click="hello"
      >
        <template #suffix>+</template>
      </OutlineButton>
    </div>

    <h1>Icon Button</h1>
    <div class="fr">
      <div class="g">
        <IconButton size="sm" :disable="false" @click="hello">
          <template #icon>
            <IconEdit />
          </template>
        </IconButton>
        <IconButton size="sm" :disable="true" @click="hello">
          <template #icon>
            <IconEdit />
          </template>
        </IconButton>
      </div>
      <div class="g">
        <IconButton size="md" :disable="false" @click="hello">
          <template #icon>
            <IconBin />
          </template>
        </IconButton>
        <IconButton size="md" :disable="true" @click="hello">
          <template #icon>
            <IconBin />
          </template>
        </IconButton>
      </div>
    </div>
    <h1>Link</h1>
    <Links text="https://www.clicknext.com/" />
    <h1>CheckBox</h1>
    <div class="fr">
      <CheckBox :checked="false" :disable="false" @checkedO="logCheck" />
      <CheckBox :checked="false" :disable="true" @checkedO="logCheck" />
      <CheckBox :checked="true" :disable="false" @checkedO="logCheck" />
      <CheckBox :checked="true" :disable="true" @checkedO="logCheck" />
    </div>
    <h1>SwitchTabs</h1>
    <SwitchTabs
      :data="tabs"
      :tabIndex="selectedTabs"
      @update:tabIndex="changeTab"
    />
    <h1>Input</h1>
    <InputText :input="someThing" :required="true" :disable="false" placeHolder="brabrabra"/>

  </div>
</template>

<script setup>
import { ref } from "vue"
import OutlineButton from "../Button/OutlineButton.vue"
import PrimaryButton from "../Button/PrimaryButton.vue"
import CheckBox from "../CheckBox/CheckBox.vue"
import IconBin from "../Icon/IconBin.vue"
import IconButton from "../Icon/IconButton.vue"
import IconEdit from "../Icon/IconEdit.vue"
import Links from "../Link/Links.vue"
import SwitchTabs from "../SwitchTabs/SwitchTabs.vue"
import InputText from "../Input/InputText.vue"

const someThing = ref('')

function hello() {
  console.log("you clicked")
}

function logCheck(check) {
  console.log(check)
}

const selectedTabs = ref(0)
const tabs = [
  { header: "tab1" },
  { header: "tab2" },
  { header: "tab3" },
]

function changeTab(tab) {
  selectedTabs.value = tab
}
</script>

<style scoped>
.fc {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.fr {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.g {
  display: flex;
  gap: 5px;
}
</style>
