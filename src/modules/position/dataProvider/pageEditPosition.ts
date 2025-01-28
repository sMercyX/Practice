import { computed, ref } from "vue"
import type { IFormMaster, IModalEditMaster } from "../../../types/modalForm1"
import { usePositionApi } from "../../../composables/api/positionApi"

export default function useMangePosition(): IModalEditMaster {
  const form = ref<IFormMaster>(createDefaultForm())

  function createDefaultForm() {
    return {
      id: "",
      name: "",
      description: "",
    }
  }

  const positionApi = usePositionApi()

  const loadData = async (id?: string): Promise<void> => {
    if (id) {
      const response = await positionApi.getDetail(id)
      form.value = { ...response, id: response.positionId }
    } else {
      form.value = createDefaultForm()
    }
  }

  const OnSubmit = async (): Promise<void> => {
    if (form.value.id) {
      await positionApi.updarePosition({
        ...form.value,
        positionId: form.value.id,
      })
    } else {
      await positionApi.createPosition(form.value)
    }
  }

  return {
    loadData,
    form: computed(() => form.value),
    onSubmit: OnSubmit,
  }
}
