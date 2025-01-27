// export interface TeamPositionRequestResponse {
//     teamId?: string;
//     positionId?: string;

//     name: string;
//     description: string;
//   }
export interface TeamIndexRequest {
  teamId?: string;
}
export interface PositionIndexRequest {
  positionId?: string;
}

export interface TeamPositionRequest {
  name: string;
  description: string;
}

export interface TeamResponse<T> extends TeamPositionRequest {
  teamId: T;
}
export interface PositionResponse<T> extends TeamPositionRequest {
  positionId: T;
}
