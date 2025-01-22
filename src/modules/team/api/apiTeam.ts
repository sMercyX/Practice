import type {
  TeamIndexRequest,
  TeamPositionRequest,
  TeamResponse,
} from "../../../types/teamPositions";
import type {
  PaginationResponse,
  PaginationRequest,
  DropdownModel,
} from "../../../types/types";
import { getItems, postItem } from "../../../utils/fetch";


export default function useTeamApi() {
  const fetchDataTeam = async (
    pagiData: PaginationRequest<TeamIndexRequest>
  ): Promise<PaginationResponse<TeamResponse<string>[]>> => {
    const response = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Team/Index`,
      pagiData
    );
    return response;
  };

  const createTeam = async (TeamData: TeamPositionRequest): Promise<string> => {
    const response = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Team/Create`,
      TeamData
    );
    return response;
  };

  const updateTeam = async (
    TeamData: TeamResponse<string>
  ): Promise<string> => {
    const response = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Team/Update`,
      TeamData
    );
    return response;
  };

  const getDetailTeam = async ( TeamId: string ) : Promise<TeamResponse<string>> => {
    const params = new URLSearchParams();
    params.set("id", TeamId);

    const response = await getItems(
      `${import.meta.env.VITE_BASE_URL}/Team/GetDetail?${params}`
    );
    return response;
  };

  const deleteTeam = async (TeamId: string): Promise<string> => {
    const response = await postItem(
      `${import.meta.env.VITE_BASE_URL}/Team/Delete`,
      TeamId
    );
    return response;
  };

  const getTeamDropDown = async (): Promise<DropdownModel<string>[]> => {
    const response = await getItems(
      `${import.meta.env.VITE_BASE_URL}/Team/GetTeamDropDown`
    );

    return response;
  };

  return {
    fetchDataTeam,
    createTeam,
    updateTeam,
    getDetailTeam,
    deleteTeam,
    getTeamDropDown,
  };
}
