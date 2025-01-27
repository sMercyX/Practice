import { reactive, ref } from "vue";
import type { EmployeeIndexResponse } from "../../../types/employee";
import useEmployeeApi from "../api/apiEmployee";
import { uuid } from "vue-uuid";
import router from "../../../routes";

export default function usePageEdit() {
  // const rawData = ref<EmployeeIndexResponse>({
  //   employeeId: "",
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   dateOfBirth: "",
  //   phones: [{ phoneId: uuid.v1(), phoneNumber: "" }],
  //   teamId: "",
  //   positionId: "",
  // });

  // const employeeData = reactive<EmployeeIndexResponse>(rawData.value);

  const employeeId = ref<string | null>(null);

  const employeeApi = useEmployeeApi();
  const loadEmployeeDetail = async (employeeId: string) => {
    const response = await employeeApi.getDetail(employeeId).then((x) => x);
    // rawData.value = response;
    return response;
  };

  const handleSubmit = async (form: EmployeeIndexResponse) => {
    console.log(form)
    if (employeeId.value) {
      employeeApi.updateEmployee(form);
    } else {
      employeeApi.createEmployee(form);
    }
    router.push({ name: "employee" });
  };
  return {
    loadEmployeeDetail,
    handleSubmit,
    employeeId,
  };
}
