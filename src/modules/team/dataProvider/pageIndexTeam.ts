import { computed, reactive, ref, watch } from "vue";
import type { PaginationResponse, TableState } from "../../../types/types";
import { useTeamApi, type TeamResponse } from "../../../composables/api/teamApi";
import type { EmployeeIndexRequest } from "../../../composables/api/employeeApi";

export default function usePageIndexTeam() {
  const rawData = ref<PaginationResponse<TeamResponse[]>>({
    pageIndex: 0,
    rowCount: 0,
    pageSize: 0,
    data: [],
  });

  const tableState: TableState<EmployeeIndexRequest, TeamResponse[]> =
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
        .getIndex({
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
  const handleNewPageData = (
    data: PaginationResponse<TeamResponse[]>
  ) => {
    tableState.pageIndex = data.pageIndex;
    tableState.pageSize = data.pageSize;
  };
  watch(
    [
      () => tableState.pageIndex,
      () => tableState.pageSize,
      () => tableState.search.text,
    ],
    async () => {
      await loadTeam();
    }
  );

  return {
    loadTeam,
    deleteItem,
    resetFilters,
    tableState,
    rawData,
    handleNewPageData
  };
}
