import type { ApiResponse } from "../../../types/apiType";
import type {
  Employ1,
  PaginationResponse,
  PaginationRequest,
  Team,
  TP,
} from "../../../types/types";
import { getItems, postItem } from "../../../utils/fetch";

type getTeamResponse = PaginationResponse<TP[]>;

export default function useTeamApi() {
  const fetchDataTeam = async (pagiData: PaginationRequest) => {
    try {
      const response = await postItem(
        `${import.meta.env.VITE_BASE_URL}/Team/Index`,
        pagiData
      );
      const data: ApiResponse<getTeamResponse> = {
        data: {
          ...response,
        },
        isError: false,
      };
      return data;
    } catch (error) {
      console.error("Error loading data:", error);
      return { data: {} as getTeamResponse, isError: true };
    }
  };

  const createTeam = async (TeamData: Employ1) => {
    try {
      const response = await postItem(
        `${import.meta.env.VITE_BASE_URL}/Team/Create`,
        TeamData
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

  const updateTeam = async (TeamData: Employ1) => {
    try {
      const response = await postItem(
        `${import.meta.env.VITE_BASE_URL}/Team/Update`,
        TeamData
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

  const getDetailTeam = async (TeamId: string) => {
    try {
      const params = new URLSearchParams();
      params.set("id", TeamId);

      const response = await getItems(
        `${import.meta.env.VITE_BASE_URL}/Team/GetDetail?${params}`
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

  const deleteTeam = async (TeamId: string) => {
    try {
      await postItem(`${import.meta.env.VITE_BASE_URL}/Team/Delete`, TeamId);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const getTeamDropDown = async () : Promise<Team<string>[]> => {
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
