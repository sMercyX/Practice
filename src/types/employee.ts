import type { EmployeeIndexResponse } from "../composables/api/employeeApi";

export interface EmployeeWithDetail extends EmployeeIndexResponse {
  team_name: string;
  position_name: string;
}