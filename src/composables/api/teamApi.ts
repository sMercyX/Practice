import type {
  DropdownModel,
  PaginationRequest,
  PaginationResponse,
} from "../../types/types";
import { useCrudApi } from "../../utils/fetch copy";

// teamInterface
export interface TeamResponse extends TeamPositionRequest {
  teamId: string;
}

export interface TeamIndexRequest {
  teamId?: string;
}

export interface TeamPositionRequest {
  name: string;
  description: string;
}

// tempApi
export function useTeamApi() {
  const httpClient = useCrudApi();

  async function getIndex(
    pagiData: PaginationRequest<TeamIndexRequest>
  ): Promise<PaginationResponse<TeamResponse[]>> {
    console.log('using new teamAPi')
    return httpClient.postItem(`/Team/Index`, pagiData);
  }

  async function createTeam(params: TeamPositionRequest): Promise<string> {
    return httpClient.postItem(`/Team/Create`, params);
  }

  async function updateTeam(params: TeamResponse): Promise<string> {
    return httpClient.postItem(`/Team/Update`, params);
  }

  async function getDetail(TeamId: string): Promise<TeamResponse> {
    const params = new URLSearchParams();
    params.set("id", TeamId);
    return httpClient.getItems(`/Team/GetDetail?${params}`);
  }

  async function deleteTeam(params: string): Promise<string> {
    return httpClient.postItem(`/Team/Delete`, params);
  }
  async function getTeamDropDown(): Promise<DropdownModel<string>[]> {
    return httpClient.getItems(`/Team/GetTeamDropDown`);
  }

  return {
    getIndex,
    createTeam,
    updateTeam,
    getDetail,
    deleteTeam,
    getTeamDropDown,
  };
}
