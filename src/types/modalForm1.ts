import type { ComputedRef, InjectionKey } from "vue"
import type { PositionResponse, TeamResponse } from "./teamPositions"

export interface IModalEditMaster {
    form: ComputedRef<PositionResponse<string> | TeamResponse<string>>
    loadData: () => Promise<void>
    OnSubmit: () => Promise<void>
}

const editMasterDataProviderKey: InjectionKey<IModalEditMaster> = Symbol()
