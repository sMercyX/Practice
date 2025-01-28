import { computed, ref } from "vue"
import type { IFormMaster, IModalEditMaster } from "../../../types/modalForm1"
import { useTeamApi } from "../../../composables/api/teamApi"
import usePageIndexTeam from "./pageIndexTeam"

export default function useManageTeam(): IModalEditMaster {
  const form = ref<IFormMaster>(createDefaultForm())

  function createDefaultForm() {
    return {
      id: "",
      name: "",
      description: "",
    }
  }

  const teamApi = useTeamApi()

  const loadData = async (id: string): Promise<void> => {
    if (id) {
      const response = await teamApi.getDetail(id)
      form.value = { ...response, id: response.teamId }
    } else {
      form.value = createDefaultForm()
    }
  }
  const pageIndex = usePageIndexTeam()

  const OnSubmit = async (): Promise<void> => {
    if (form.value.id) {
      await teamApi.updateTeam({ ...form.value, teamId: form.value.id })
    } else {
      await teamApi.createTeam(form.value)
    }

    await pageIndex.loadTeam()
  }

  return {
    loadData,
    form: computed(() => form.value),
    onSubmit: OnSubmit,
  }
}
