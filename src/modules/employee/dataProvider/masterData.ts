import { usePositionApi } from "../../../composables/api/positionApi";
import { useTeamApi } from "../../../composables/api/teamApi";
import type { DropdownModel } from "../../../types/types";
import { computed, reactive, type ComputedRef } from "vue";

export interface IEmployeeMasterData {
  loadMasterData: () => Promise<void>;

  teams: ComputedRef<
    {
      text: string;
      value: string;
    }[]
  >;

  postions: ComputedRef<
    {
      text: string;
      value: string;
    }[]
  >;
}

export default function useMasterData(): IEmployeeMasterData {
  const teamApi = useTeamApi();
  const positionApi = usePositionApi();

  const state = reactive<{
    teams: DropdownModel<string>[];
    postions: DropdownModel<string>[];
  }>({
    teams: [],
    postions: [],
  });

  const loadTeam = async (): Promise<void> => {
    const response = await teamApi.getTeamDropDown().then((x) => x);
    state.teams = response;
  };

  const loadPosition = async () => {
    const response = await positionApi.getPositionDropDown().then((x) => x);
    state.postions = response;
  };

  async function loadMasterData() {
    await Promise.all([loadTeam(), loadPosition()]);
  }
  return {
    loadMasterData,
    teams: computed(() => state.teams),
    postions: computed(() => state.postions),
  };
}
