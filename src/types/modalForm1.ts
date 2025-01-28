import type { ComputedRef, InjectionKey } from "vue"

import type { TeamPositionRequest } from "../composables/api/teamApi"

export interface IFormMaster extends TeamPositionRequest {
  id: string
}
export interface IModalEditMaster {
  form: ComputedRef<IFormMaster>
  loadData: (id: string) => Promise<void>
  onSubmit: () => Promise<void>
}

export const editMasterDataProviderKey: InjectionKey<IModalEditMaster> =
  Symbol()
