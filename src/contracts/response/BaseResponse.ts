export interface ErrorResponse {
  detail: string;
}

export type BaseResponse<T> = T | ErrorResponse;
