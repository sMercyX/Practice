import { computed, reactive, ref, watch } from "vue";
import type {
  EmployeeWithDetail,
} from "../../../types/employee";
import type { PaginationResponse, TableState } from "../../../types/types";
import { type IEmployeeMasterData } from "./masterData";
import { useEmployeeApi, type EmployeeIndexRequest, type EmployeeIndexResponse } from "../../../composables/api/employeeApi";

export default function usePageIndex(masterData: IEmployeeMasterData) {
  const getTeamName = (teamId: string) => {
    const team = masterData.teams.value.find((t) => t.value === teamId);
    return team ? team.text : "Unknown Team";
  };

  const getPositionName = (positionId: string) => {
    const position = masterData.postions.value.find(
      (t) => t.value === positionId
    );
    return position ? position.text : "Unknown Position";
  };

  const rawData = ref<PaginationResponse<EmployeeIndexResponse[]>>({
    pageIndex: 0,
    rowCount: 0,
    pageSize: 0,
    data: [],
  });

  const tableState: TableState<EmployeeIndexRequest, EmployeeWithDetail[]> =
    reactive({
      pageIndex: 0,
      pageSize: 10,
      rowCount: computed(() => rawData.value.rowCount),
      data: computed(() =>
        rawData.value.data.map((emp) => ({
          ...emp,
          team_name: getTeamName(emp.teamId),
          position_name: getPositionName(emp.positionId),
        }))
      ),
      search: {
        text: "",
        teamId: "",
        positionId: "",
      },
    });
    
  function createDefaultSearch(): EmployeeIndexRequest {
    return {
      positionId: "",
      teamId: "",
      text: "",
    };
  }

  const resetFilters = () => {
    tableState.search = createDefaultSearch();
  };

  const employeeApi = useEmployeeApi();

  const loadEmployee = async () => {
    try {
      const response = await employeeApi
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
    await employeeApi.deleteEmployee(id);
    await loadEmployee();
  };

  const handleNewPageData = (
    data: PaginationResponse<EmployeeIndexResponse[]>
  ) => {
    tableState.pageIndex = data.pageIndex;
    tableState.pageSize = data.pageSize;
  };

  watch(
    [
      () => tableState.pageIndex,
      () => tableState.pageSize,
      () => tableState.search.positionId,
      () => tableState.search.teamId,
      () => tableState.search.text,
    ],
    async () => {
      await loadEmployee();
    }
  );
  
  return {
    loadEmployee,
    deleteItem,
    resetFilters,
    tableState,
    rawData,
    handleNewPageData
  };
}
