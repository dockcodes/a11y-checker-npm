import type { BaseResponse } from './BaseResponse';

interface UpdateHistorySuccess {
  success: true;
}

export type UpdateHistoryResponse = BaseResponse<UpdateHistorySuccess>;
