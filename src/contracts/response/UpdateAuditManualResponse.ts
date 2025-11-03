import type { BaseResponse } from './BaseResponse';

interface UpdateAuditManualSuccess {
  success: true;
}

export type UpdateAuditManualResponse = BaseResponse<UpdateAuditManualSuccess>;
