import type { PositionIndexRequest, PositionResponse, TeamPositionRequest } from "../../../types/teamPositions";
import type {
  PaginationResponse,
  // ImpData,
  PaginationRequest,
  DropdownModel,
} from "../../../types/types";
import { getItems, postItem } from "../../../utils/fetch";


export default function usePositionApi() {

  const fetchDataPosition = async (
    pagiData: PaginationRequest<PositionIndexRequest>
  ): Promise<PaginationResponse<PositionResponse<string>[]>> => {
    const response = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Position/Index`,
      pagiData
    );
    return response;
  };

  const createPosition = async (PositionData: TeamPositionRequest): Promise<string> => {
    const response = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Position/Create`,
      PositionData
    );
    return response;
  };

  const updatePosition = async (PositionData: PositionResponse<string>): Promise<string> => {
    const response = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Position/Update`,
      PositionData
    );
    return response;
  };

  const getDetailPosition = async (
    PositionId: string
  ): Promise<TeamPositionResponse> => {
    const response = await getItems(
      `${import.meta.env.VITE_BASE_URL}/Position/GetDetail?id=${PositionId}`
    );
    return response;
  };

  const deletePosition = async (PositionId: string) => {
    const response = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Position/Delete`,
      PositionId
    );
    return response;
  };

  const getPositionDropDown = async (): Promise<
    DropdownModel<string>[]
  > => {
    const response = await getItems(
      `${import.meta.env.VITE_BASE_URL}/Position/GetPositionDropDown`
    );
    return response;
  };

  return {
    fetchDataPosition,
    createPosition,
    updatePosition,
    getDetailPosition,
    deletePosition,
    getPositionDropDown,
  };
}
