import { computed, reactive, ref, type ComputedRef } from "vue";
import type { EmployeeIndexResponse } from "../../../types/employee";
import useEmployeeApi from "../api/apiEmployee";
import { uuid } from "vue-uuid";

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
  });

 
  // const employeeData = reactive(computed(() => rawData.value));

  const employeeApi = useEmployeeApi();
  const loadEmployeeDetail = async (employeeId: string) => {
    const response = await employeeApi.getDetail(employeeId).then((x) => x);
    rawData.value = response;
  };

  return {
    loadEmployeeDetail,
    form:computed(()=> rawData.value),
  };
}
