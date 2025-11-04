import type { BaseResponse } from './BaseResponse';

export interface UpdateHistorySuccess {
  success: true;
}

export type UpdateHistoryResponse = BaseResponse<UpdateHistorySuccess>;
