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
    teamId: "",
    positionId: "",
  })

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
    const form = rawData.value
    if (rawData.value.employeeId) {
      employeeApi.updareEmployee(form)
      console.log(form)
    } else {
      employeeApi.createEmployee(form)
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
