import {  computed, reactive, ref } from "vue";
import type { EmployeeIndexResponse } from "../../../types/employee";
import useEmployeeApi from "../api/apiEmployee";
import { uuid } from "vue-uuid";

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

  const employeeData = reactive({
    employeeId: computed(()=>rawData.value.employeeId),
    firstname: computed(()=>rawData.value.firstname),
    lastname: computed(()=>rawData.value.lastname),
    email: computed(()=>rawData.value.email),
    dateOfBirth: computed(()=>rawData.value.dateOfBirth),
    phones: computed(()=>rawData.value.phones),
    teamId: computed(()=>rawData.value.teamId),
    positionId: computed(()=>rawData.value.positionId),
  });

  const employeeApi = useEmployeeApi();
  const loadEmployeeDetail = async (employeeId: string) => {
    const response = await employeeApi.getDetail(employeeId).then((x) => x);
    rawData.value = response;
  };

  return {
    loadEmployeeDetail,
    rawData,
    employeeData,
  };
}
