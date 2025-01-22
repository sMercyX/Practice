import type { ApiResponse } from "../../../types/apiType";
import type { EmployeeIndexRequest, EmployeeIndexResponse } from "../../../types/employee";
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

  const createEmployee = async (employeeData: Employ1) => {
    try {
      const response = await postItem(
        `${import.meta.env.VITE_BASE_URL}/Employee/Create`,
        employeeData
      );
      const data: ApiResponse<string> = {
        data: response,
        isError: false,
      };
      return data;
    } catch (error) {
      console.error("Error loading data:", error);
      return { data: "error" as String, isError: true };
    }
  };
  const updateEmployee = async (
    employeeData: Employ1
  ): Promise<ApiResponse<string>> => {
    try {
      const response = await postItem(
        `${import.meta.env.VITE_BASE_URL}/Employee/Update`,
        employeeData
      );
      const data = {
        data: response,
        isError: false,
      };
      return data;
    } catch (error) {
      console.error("Error loading data:", error);
      return { data: "error" as String, isError: true };
    }
  };

  const getDetail = async (employeeId: string) => {
    try {
      const params = new URLSearchParams();
      params.set(`id`, employeeId);

      const response = await getItems(
        `${import.meta.env.VITE_BASE_URL}/Employee/GetDetail?${params}`
      );
      const data: ApiResponse<Employ1> = {
        data: {
          ...response,
        },
        isError: false,
      };

      return data;
    } catch (error) {
      console.error("Error loading data:", error);
    }
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
