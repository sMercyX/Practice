import type { PaginationRequest, PaginationResponse } from "../../types/types";
import { useCrudApi } from "../../utils/fetch copy";

// EmployeeInterface
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

// EmployeeApi
export function useEmployeeApi() {
  const httpClient = useCrudApi();

  async function getIndex(
    pagiData: PaginationRequest<EmployeeIndexRequest>
  ): Promise<PaginationResponse<EmployeeIndexResponse[]>> {
    return httpClient.postItem(`/Employee/Index`, pagiData);
  }

  async function createEmployee(params: EmployeeIndexResponse): Promise<string> {
    return httpClient.postItem(`/Employee/Create`, params);
  }

  async function updareEmployee(params: EmployeeIndexResponse): Promise<string> {
    return httpClient.postItem(`/Employee/Update`, params);
  }

  async function getDetail(param: string): Promise<EmployeeIndexResponse> {
    const params = new URLSearchParams();
    params.set("id", param);
    return httpClient.getItems(`/Employee/GetDetail?${params}`);
  }

  async function deleteEmployee(params: string): Promise<string> {
    return httpClient.postItem(`/Employee/Delete`, params);
  }


  return {
    getIndex,
    createEmployee,
    updareEmployee,
    getDetail,
    deleteEmployee
  };
}
