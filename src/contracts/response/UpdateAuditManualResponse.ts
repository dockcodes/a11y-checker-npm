import type { BaseResponse } from './BaseResponse';

export interface UpdateAuditManualSuccess {
  success: true;
}

export type UpdateAuditManualResponse = BaseResponse<UpdateAuditManualSuccess>;
