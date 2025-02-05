<template>
  <div class="Top">
    <div class="Left">
      <h2 class="leftArrow" @click="navigateTo('employee')">&leftarrow;</h2>
      <h2>{{ isEditing ? "Edit" : "Create" }} Employee</h2>
    </div>
    <div class="Right">
      <OutlineButton
        text="Cancel"
        size="md"
        :disable="false"
        @click="navigateTo('employee')"
      />
      <PrimaryButton
        text="Save"
        size="md"
        :disable="false"
        @click="handleSubmit()"
      />
      <!-- <button @click="navigateTo('employee')" class="cancelButton">Cancel</button>
      <button type="submit" form="myForm" class="confirmButton">Save</button> -->
    </div>
  </div>
  <div class="modal-overlay">
    <CardWithIcon title="Basic Info" class="modalCon">
      <template #Icon>
        <IconEdit />
      </template>
      <template #content>
        <form @submit.prevent="handleSubmit()" class="Content" id="myForm">
          <div class="breakHalf">
            <div class="groupUp">
              <label for="first_name">First Name <span>*</span></label>
              <InputText
                v-model:input="form.firstname"
                :required="true"
                placeHolder="first name"
                :disable="false"
                class="wauto"
              />
            </div>
            <div class="groupUp">
              <label for="last_name">Last Name <span>*</span></label>
              <InputText
                v-model:input="form.lastname"
                :required="true"
                placeHolder="last name"
                :disable="false"
              />
            </div>
          </div>
          <div class="groupUp">
            <label for="email">Email <span>*</span></label>
            <InputText
              v-model:input="form.email"
              :required="true"
              placeHolder="email"
              :disable="false"
            />
          </div>

          <div class="breakHalf">
            <div class="groupUp">
              <label for="team_id">Team <span>*</span></label>
              <Dropdown
                class="dropD"
                v-model="form.teamId"
                :list="teams"
                :all="false"
                :disable="false"
              />
            </div>
            <div class="groupUp">
              <label for="position_id">Position <span>*</span></label>
              <Dropdown
                class="dropD"
                v-model="form.positionId"
                :list="postions"
                :all="false"
                :disable="false"
              />
            </div>
          </div>

          <hr />
          <div class="breakHalf">
            <label for="phone">Phone Numbers</label>
            <button class="add-button" @click="addPhone" type="button">
              &plus; Phone
            </button>
          </div>
          <div class="phone-list">
            <div
              v-for="(phone, index) in form.phones"
              :key="index + 1"
              class="phone-item"
            >
              <InputText
                v-model:input="phone.phoneNumber"
                :required="true"
                placeHolder="phone number"
                :disable="false"
              />

              <IconButton
                :disable="false"
                size="sm"
                v-if="index > 0"
                @click="removePhone(index)"
              >
                <template #icon>
                  <IconMinus />
                </template>
              </IconButton>
            </div>
          </div>
        </form>
      </template>
      
    </CardWithIcon>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import Dropdown from "../../components/Dropdown/Dropdown.vue"
import InputText from "../../components/Input/InputText.vue"
import { useRoute, useRouter } from "vue-router"
import usePageEdit from "./dataProvider/pageEdit"
import useMasterData from "./dataProvider/masterData"
import PrimaryButton from "../../components/Button/PrimaryButton.vue"
import OutlineButton from "../../components/Button/OutlineButton.vue"
import CardWithIcon from "../../components/Card/CardWithIcon.vue"
import IconEdit from "../../components/Icon/IconEdit.vue"
import IconButton from "../../components/Icon/IconButton.vue"
import IconMinus from "../../components/Icon/IconMinus.vue"

const masterDataProvider = useMasterData()
const { teams, postions } = masterDataProvider
const pageEditDataProvider = usePageEdit()
const { handleSubmit, loadEmployeeDetail, form, addPhone, removePhone } =
  pageEditDataProvider

const router = useRouter()
const route = useRoute()

const employeeId = computed(() => {
  return route.params.employeeId as string
})
const isEditing = computed(() => {
  return !!route.params.employeeId
})

const navigateTo = (nameRoute: string) => {
  router.push({ name: nameRoute })
}

;(async () => {
  const pMaster = Promise.all([masterDataProvider.loadMasterData()])
  if (employeeId.value) {
    await loadEmployeeDetail(employeeId.value)
  }
  await pMaster
})()
</script>

<style scoped>
.Top {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);

  .Left {
    display: flex;
    gap: 10px;

    .leftArrow {
      cursor: pointer;
      transition: all 0.3s;
    }
    .leftArrow:hover {
      scale: 110%;
    }
    h2 {
      padding: 0;
      margin: 0;
    }
  }

  .Right {
    display: flex;
    gap: 10px;

    .confirmButton {
      background-color: #5119f0;
      color: white;
    }
  }
}

.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  width: 580px;


}

.modalCon {
  width: 600px;
  height: 663px;

  margin-top: 50px;

}

.Content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 560px;

  label {
    color: #646d78;
    margin-bottom: 4px;
  }
  .breakHalf {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    width: auto;
  }
  .groupUp {
    display: flex;
    flex-direction: column;
    width: 100%;

    input {
      width: auto;
    }
  }
}

.add-button {
  cursor: pointer;
  border: none !important;
  color: #5119f0;
  background-color: white;
}
.phone-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.phone-item {
  display: flex;
  input {
    width: 100%;
  }
  align-items: center;
  gap: 10px;
}
span {
  color: red;
}

p {
  margin: 0;
  padding: 0;
  font-size: 19px;
}

.dropD {
  width: 100%;
}


</style>
