import type { Emitter } from "mitt"
import type { InjectionKey } from "vue"

export type PositionEventList = {
  deletePosition: void
}
export const positionEventBusKey: InjectionKey<Emitter<PositionEventList>> =
  Symbol("eventBus")
