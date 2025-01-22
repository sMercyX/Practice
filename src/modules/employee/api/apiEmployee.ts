import type { ApiResponse } from "../../../types/apiType";
import type {
  EmployeeIndexRequest,
  EmployeeIndexResponse,
} from "../../../types/employee";
import type {
  Employ1,
  Employ1Details,
  PaginationResponse,
  PaginationRequest,
} from "../../../types/types";
import { getItems, postItem } from "../../../utils/fetch";

export default function useEmployeeApi() {
  const fetchDataEmployee = async (
    pagiData: PaginationRequest<EmployeeIndexRequest>
  ): Promise<PaginationResponse<EmployeeIndexResponse[]>> => {
    const response = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Employee/Index`,
      pagiData
    );

    return response;
  };

  const createEmployee = async (employeeData: Employ1): Promise<string> => {
    const response = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Employee/Create`,
      employeeData
    );
    return response;
  };

  const updateEmployee = async (employeeData: Employ1): Promise<string> => {
    const response = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Employee/Update`,
      employeeData
    );

    return response;
  };

  const getDetail = async (employeeId: string): Promise<Employ1> => {
    const params = new URLSearchParams();
    params.set(`id`, employeeId);

    const response = await getItems(
      `${import.meta.env.VITE_BASE_URL}/Employee/GetDetail?${params}`
    );
    return response;
  };

  const deleteEmployee = async (employeeId: string) => {
    try {
      await postItem(
        `${import.meta.env.VITE_BASE_URL}/Employee/Delete`,
        employeeId
      );
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  return {
    fetchDataEmployee,
    createEmployee,
    updateEmployee,
    getDetail,
    deleteEmployee,
  };
}
