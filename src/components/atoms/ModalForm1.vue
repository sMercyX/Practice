<template>
  <Modal :isShow="isOpen">
    <form>
      <div class="Head">
        <h3>
          {{ isEditing ? "Editing" : "Create" }}
          {{ header == "team" ? "Team" : "Position" }}
        </h3>
        <div class="close" @click="isOpen = false"><span>&times;</span></div>
      </div>
      <!-- First Name -->
      <div class="Content">
        <p>Fields Marked with an <span>*</span> are required</p>

        <label for="name">Team Name <span>*</span> </label>
        <InputText
          v-model:input="form.name"
          :required="true"
          placeHolder="name"
          :disable="false"
          class="w100"
        />

        <label for="description">Description</label>
        <InputText
          v-model:input="form.description"
          :required="false"
          placeHolder="description"
          :disable="false"
          class="w100"
        />
      </div>

      <!-- Submit Button -->
      <div class="Footer">
        <!-- <button class="cancel" type="button" @click="closeModal">Cancel</button>
        <button class="save" type="submit">Save</button> -->

        <OutlineButton
          text="Cancel"
          size="md"
          :disable="false"
          @click="closeModal"
        />
        <PrimaryButton
          text="Save"
          size="md"
          :disable="false"
          @click="handleSubmit"
        />
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts" generic="T">
import { computed, inject, ref } from "vue"
import InputText from "../Input/InputText.vue"
import Modal from "./Modal.vue"
import { editMasterDataProviderKey } from "../../types/modalForm1"
import { eventBusKey } from "../../types/eventButKey"
import OutlineButton from "../Button/OutlineButton.vue"
import PrimaryButton from "../Button/PrimaryButton.vue"

const props = defineProps<{
  header: string
}>()
const isOpen = ref<boolean>(false)

// const dataProvider = props.dataProvider;
// const form = dataProvider.form;
const { form, loadData, onSubmit } = inject(editMasterDataProviderKey)!

const isEditing = computed(() => {
  return !!form.value.id
})

const eventBus = inject(eventBusKey)!

function openModal(id: string) {
  isOpen.value = true
  loadData(id)
}
function closeModal() {
  isOpen.value = false
}
const handleSubmit = async () => {
  await onSubmit()
  isOpen.value = false
  eventBus.emit("deleteTeamPosition")
}

defineExpose({
  openModal,
  handleSubmit,
})

const header = ref<string>(props.header)
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  background-color: rgb(247, 247, 247);
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  width: 480px;
  /* width: 60vw; */
  height: 358px;
}
span {
  color: red;
}
.Head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin: 0;
  height: 48px;

  background-color: #f7f8fc;
  border-radius: 10px;

  h3 {
    padding: 0;
    margin: 0;

    font-family: Kanit;
    font-size: 18px;
    font-weight: 500;
    line-height: 26px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
}

.Content {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background: white;
  padding: 12px 16px;

  font-family: Sarabun;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  .w100 {
    width: auto;
    margin-bottom: 12px;
  }

  p {
    margin-bottom: 12px;
    color: #646d78;
  }

  label {
    margin-bottom: 4px;
    color: #646d78;
  }
}
.Footer {
  height: 42px;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 20px;
  border-top: 1px solid #E3E7F0;
  border-radius:0 0 4px 4px;
  background-color: #FFFFFF;

  gap: 12px;
}

p {
  padding: 0;
  margin: 0;
}
.close{
  cursor: pointer;
}
</style>
