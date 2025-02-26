import { computed, ref } from "vue"
import router from "../../../routes"
import { uuid } from "vue-uuid"
import {
  useEmployeeApi,
  type EmployeeIndexResponse,
} from "../../../composables/api/employeeApi"

export default function usePageEdit() {
  const rawData = ref<EmployeeIndexResponse>({
    employeeId: "",
    firstname: "",
    lastname: "",
    email: "",
    dateOfBirth: "",
    phones: [{ phoneId: uuid.v1(), phoneNumber: "" }],
    // teamId: "",
    // positionId: "",
    teamId: "f80d5179-a4d3-4c38-8a89-c353fb6c1371",
    positionId: "e34462d2-e7df-4b32-9e22-a473f7630274",
  })

  // const dData = () => {
  //   return {
  //     employeeId: "",
  //     firstname: "",
  //     lastname: "",
  //     email: "",
  //     dateOfBirth: "",
  //     phones: [{ phoneId: uuid.v1(), phoneNumber: "" }],
  //     teamId: "",
  //     positionId: "",
  //   }
  // }


  const addPhone = () => {
    rawData.value.phones.push({ phoneId: uuid.v1(), phoneNumber: "" })
  }

  const removePhone = (index: number) => {
    rawData.value.phones.splice(index, 1)
  }

  const employeeApi = useEmployeeApi()
  const loadEmployeeDetail = async (employeeId: string) => {
    const response = await employeeApi.getDetail(employeeId).then((x) => x)
    rawData.value = response
  }

  const handleSubmit = async () => {
    console.log('is using')
    if (rawData.value.employeeId) {
      employeeApi.updareEmployee(rawData.value)
      // console.log(rawData.value)
    } else {
      employeeApi.createEmployee(rawData.value)
    }
    router.push({ name: "employee" })
  }
  return {
    loadEmployeeDetail,
    handleSubmit,
    form: computed(() => rawData.value),
    addPhone,
    removePhone,
  }
}
