import type { Phone } from "./types";

export interface EmployeeIndexRequest  {
  teamId?: string;
  positionId?: string;
  text?: string;
}

export interface EmployeeIndexResponse  {
     employeeId: string;
      dateOfBirth: string;
      email: string;
      firstname: string;
      lastname: string;
      phones: Phone[];
      positionId: string;
      teamId: string;
  }