export interface EmployeeIndexRequest {
  teamId?: string;
  positionId?: string;
  text?: string;
}

export interface EmployeeIndexResponse {
  employeeId: string;
  dateOfBirth: string;
  email: string;
  firstname: string;
  lastname: string;
  phones: Phone[];
  positionId: string;
  teamId: string;
}
export interface Phone {
  phoneId: string;
  phoneNumber: string;
}

export interface EmployeeWithDetail extends EmployeeIndexResponse {
  team_name: string;
  position_name: string;
}
