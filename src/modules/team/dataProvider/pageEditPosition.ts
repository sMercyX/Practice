import { computed, ref } from "vue";
import type { IModalEditMaster } from "../../../types/modalForm1";
import type { TeamResponse } from "../../../types/teamPositions";
import useTeamApi from "../api/apiTeam";

export default function useMangePosition(): IModalEditMaster {
  const form = ref<TeamResponse<string>>({
    teamId: "",
    name: "",
    description: "",
  });

  const teamApi = useTeamApi();

  const loadData = async (): Promise<void> => {
    const response = await teamApi.getDetailTeam(form.value.teamId);
    form.value = response;
  };

  const OnSubmit = async (): Promise<void> => {
    if (form.value.teamId) {
      await teamApi.updateTeam(form.value);
    }
    await teamApi.createTeam(form.value);
  };

  return {
    loadData,
    form: computed(() => form.value),
    OnSubmit,
  };
}
