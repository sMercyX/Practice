export interface DropdownModel<T> {
  text: string
  value: T
}

export interface PaginationRequest<T> {
  pageIndex: number
  pageSize: number
  search: T
}

export interface PagiData {
  rowCount: number
  pageIndex: number
  pageSize: number
}

export interface PaginationResponse<T> extends PagiData {
  data: T
}

export interface TableState<TQuery, TResponse>
  extends PaginationRequest<TQuery>,
    PaginationResponse<TResponse> {}
