import type { ApiResponse } from "../../../types/apiType";
import type {
  Employ1,
  PaginationResponse,
  // ImpData,
  PaginationRequest,
  Pos,
  TP,
} from "../../../types/types";
import { getItems, postItem } from "../../../utils/fetch";

type getPositionResponse = PaginationResponse<TP[]>;

export const fetchDataPosition = async (pagiData: PaginationRequest) => {
  try {
    const response = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Position/Index`,
      pagiData
    );
    const data: ApiResponse<getPositionResponse> = {
      data: {
        ...response,
      },
      isError: false,
    };
    return data;
  } catch (error) {
    console.error("Error loading data:", error);
    return { data: {} as getPositionResponse, isError: true };
  }
};

export const createPosition = async (PositionData: Employ1) => {
  try {
    const response = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Position/Create`,
      PositionData
    );
    const data: ApiResponse<string> = {
      data: response,
      isError: false,
    };
    return data;
  } catch (error) {
    console.error("Error loading data:", error);
    return { data: error as string, isError: true };
  }
};

export const updatePosition = async (PositionData: Employ1) => {
  try {
    const response = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Position/Update`,
      PositionData
    );
    const data: ApiResponse<string> = {
      data: response,
      isError: false,
    };
    return data;
  } catch (error) {
    console.error("Error loading data:", error);
    return { data: error as string, isError: true };
  }
};

export const getDetail = async (PositionId: string) => {
  try {
    const response = await getItems(
      `${import.meta.env.VITE_BASE_URL}/Position/GetDetail?id=${PositionId}`
    );
    const data: ApiResponse<TP> = {
      data: {
        ...response,
      },
      isError: false,
    };
    return data;
  } catch (error) {
    console.error("Error loading data:", error);
    return { data: {} as TP, isError: true };
  }
};

export const deletePosition = async (PositionId: string) => {
  try {
    await postItem(
      `${import.meta.env.VITE_BASE_URL}/Position/Delete`,
      PositionId
    );
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

export const getPositionDropDown = async () => {
  try {
    const response = await getItems(
      `${import.meta.env.VITE_BASE_URL}/Position/GetPositionDropDown`
    );
    const data: ApiResponse<Pos<string>[]> = {
      data: [...response],
      isError: false,
    };
    return data;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};
