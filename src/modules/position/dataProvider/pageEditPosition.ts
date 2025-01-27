import { computed, ref } from "vue";
import type { IModalEditMaster } from "../../../types/modalForm1";
import type { PositionResponse } from "../../../types/teamPositions";
import usePositionApi from "../api/apiPosition";

export default function useMangePosition(): IModalEditMaster {
  const form = ref<PositionResponse<string>>({
    positionId: "",
    name: "",
    description: "",
  });

  const positionApi = usePositionApi();

  const loadData = async (): Promise<void> => {
    const response = await positionApi.getDetailPosition(form.value.positionId);
    form.value = response;
  };

  const OnSubmit = async (): Promise<void> => {
    if (form.value.positionId) {
      await positionApi.updatePosition(form.value);
    }
    await positionApi.createPosition(form.value);
  };

  return {
    loadData,
    form: computed(() => form.value),
    OnSubmit,
  };
}
