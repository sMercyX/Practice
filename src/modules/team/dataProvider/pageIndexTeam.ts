import { computed, reactive, ref } from "vue";
import type { EmployeeIndexRequest } from "../../../types/employee";
import type { PaginationResponse, TableState } from "../../../types/types";
import type { TeamResponse } from "../../../types/teamPositions";
import useTeamApi from "../api/apiTeam";

export default function usePageIndexTeam() {
  const rawData = ref<PaginationResponse<TeamResponse<string>[]>>({
    pageIndex: 0,
    rowCount: 0,
    pageSize: 0,
    data: [],
  });

  const tableState: TableState<EmployeeIndexRequest, TeamResponse<string>[]> =
    reactive({
      pageIndex: 0,
      pageSize: 10,
      rowCount: computed(() => rawData.value.rowCount),
      data: computed(() => rawData.value.data),
      search: {
        text: "",
      },
    });

  function createDefaultSearch(): EmployeeIndexRequest {
    return {
      text: "",
    };
  }

  const resetFilters = () => {
    tableState.search = createDefaultSearch();
  };
  const teamApi = useTeamApi();
  const loadTeam = async () => {
    try {
      const response = await teamApi
        .fetchDataTeam({
          pageIndex: tableState.pageIndex,
          pageSize: tableState.pageSize,
          search: tableState.search,
        })
        .then((x) => x);
      rawData.value = response;
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const deleteItem = async (id: string) => {
    await teamApi.deleteTeam(id);
    await loadTeam();
  };

  return {
    loadTeam,
    deleteItem,
    resetFilters,
    tableState,
    rawData,
  };
}
