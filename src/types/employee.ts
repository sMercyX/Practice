import mitt, { type Emitter } from "mitt"
import type { EmployeeIndexResponse } from "../composables/api/employeeApi"
import { teamEventBusKey, type TeamEventList } from "./teamEvent"
import { positionEventBusKey, type PositionEventList } from "./positionEvent"
import { provide } from "vue"

export interface EmployeeWithDetail extends EmployeeIndexResponse {
  team_name: string
  position_name: string
}

function loadData() {}
const teamEventBus = mitt<TeamEventList>()
provide(teamEventBusKey, teamEventBus)
teamEventBus.on("deleteTeam", loadData)

const positionEventBus = mitt<PositionEventList>()
provide(positionEventBusKey, positionEventBus)
positionEventBus.on("deletePosition", loadData)

type UnionEventBus = PositionEventList & TeamEventList
const unionEventBus = mitt<UnionEventBus>()

unionEventBus.on("*", (event) => {
  if (event == "deletePosition") {
  } else if (event == "deleteTeam") {
  }
})
