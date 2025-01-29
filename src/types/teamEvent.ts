import type { Emitter } from "mitt";
import type { InjectionKey } from "vue";

export type TeamEventList = {
    'deleteTeam':void
}
export const teamEventBusKey : InjectionKey<Emitter<TeamEventList>>= Symbol('eventBus')
