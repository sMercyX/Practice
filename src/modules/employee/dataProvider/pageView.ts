import { computed, ref } from "vue"
import { uuid } from "vue-uuid"
import {
  useEmployeeApi,
  type EmployeeIndexResponse,
} from "../../../composables/api/employeeApi"

// export interface IEmployeeMasterData {
//   employeeData: ComputedRef<EmployeeIndexResponse>;
// }
export default function usePageView() {
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

  // const employeeData = reactive(computed(() => rawData.value));

  const employeeApi = useEmployeeApi()
  const loadEmployeeDetail = async (employeeId: string) => {
    const response = await employeeApi.getDetail(employeeId).then((x) => x)
    rawData.value = response
  }

  return {
    loadEmployeeDetail,
    form: computed(() => rawData.value),
  }
}
