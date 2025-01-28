import type {
  DropdownModel,
  PaginationRequest,
  PaginationResponse,
} from "../../types/types";
import { useCrudApi } from "../../utils/fetch copy";
import type { TeamPositionRequest } from "./teamApi";

// positionInterface
export interface PositionIndexRequest {
  positionId?: string;
}

export interface PositionResponse extends TeamPositionRequest {
  positionId: string;
}

// positionApi
export function usePositionApi() {
  const httpClient = useCrudApi();

  async function getIndex(
    pagiData: PaginationRequest<PositionIndexRequest>
  ): Promise<PaginationResponse<PositionResponse[]>> {
    console.log('using new positionApi')
    return httpClient.postItem(`/Position/Index`, pagiData);
  }

  async function createPosition(params: TeamPositionRequest): Promise<string> {
    return httpClient.postItem(`/Position/Create`, params);
  }

  async function updarePosition(params: PositionResponse): Promise<string> {
    return httpClient.postItem(`/Position/Update`, params);
  }

  async function getDetail(param: string): Promise<PositionResponse> {
    const params = new URLSearchParams();
    params.set("id", param);
    return httpClient.getItems(`/Position/GetDetail?${params}`);
  }

  async function deletePosition(params: string): Promise<string> {
    return httpClient.postItem(`/Position/Delete`, params);
  }
  async function getPositionDropDown(): Promise<DropdownModel<string>[]> {
    return httpClient.getItems(`/Position/GetPositionDropDown`);
  }

  return {
    getIndex,
    createPosition,
    updarePosition,
    getDetail,
    deletePosition,
    getPositionDropDown,
  };
}
