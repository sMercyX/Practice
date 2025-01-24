import { computed, reactive, ref } from "vue";
import type { EmployeeIndexRequest } from "../../../types/employee";
import type { PaginationResponse, TableState } from "../../../types/types";
import type { PositionResponse } from "../../../types/teamPositions";
import usePositionApi from "../api/apiPosition";

export default function usePageIndexPosition() {
  const rawData = ref<PaginationResponse<PositionResponse<string>[]>>({
    pageIndex: 0,
    rowCount: 0,
    pageSize: 0,
    data: [],
  });

  const tableState: TableState<EmployeeIndexRequest, PositionResponse<string>[]> =
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
  const positionApi = usePositionApi();
  const loadPosition = async () => {
    try {
      const response = await positionApi
        .fetchDataPosition({
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
    await positionApi.deletePosition(id);
    await loadPosition();
  };

  return {
    loadPosition,
    deleteItem,
    resetFilters,
    tableState,
    rawData,
  };
}
