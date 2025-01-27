import { computed, ref } from "vue";
import type { EmployeeIndexResponse } from "../../../types/employee";
import useEmployeeApi from "../api/apiEmployee";
import router from "../../../routes";
import { uuid } from "vue-uuid";

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
  });

  // const employeeData = reactive<EmployeeIndexResponse>(rawData.value);
  const addPhone = () => {
    rawData.value.phones.push({ phoneId: uuid.v1(), phoneNumber: "" });
  };
  
  const removePhone = (index: number) => {
    rawData.value.phones.splice(index + 1, 1);
  };
  

  const employeeApi = useEmployeeApi();
  const loadEmployeeDetail = async (employeeId: string) => {
    const response = await employeeApi.getDetail(employeeId).then((x) => x);
    rawData.value = response;
  };

  const handleSubmit = async () => {
    const form = rawData.value
    if (rawData.value.employeeId) {
      employeeApi.updateEmployee(form);
    } else {
      employeeApi.createEmployee(form);
    }
    router.push({ name: "employee" });
  };
  return {
    loadEmployeeDetail,
    handleSubmit,
    form: computed(() => rawData.value),
    addPhone,
    removePhone
  };
}
