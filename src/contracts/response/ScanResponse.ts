import { AuditFailed, AuditInProgress, AuditQueued, AuditSuccess } from './AuditResponse';
import type { BaseResponse } from './BaseResponse';

export type ScanResponse<T extends boolean> = BaseResponse<Omit<T extends true ? AuditSuccess | AuditQueued | AuditInProgress | AuditFailed : AuditQueued, 'expires_at' | 'url'>>;
