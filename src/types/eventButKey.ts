import type { Emitter } from "mitt";
import type { InjectionKey } from "vue";

export type EventList = {
    'countUppp' : number
    'deleteTeamPosition':void
}
export const eventBusKey : InjectionKey<Emitter<EventList>>= Symbol('eventBus')
