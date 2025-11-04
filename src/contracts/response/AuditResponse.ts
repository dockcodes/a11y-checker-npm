import { AuditContent } from "../types";
import { BaseResponse } from "./BaseResponse";

interface AuditBase {
  address_uuid: string;
  created_at: string;
  expires_at: string | null;
  requests_left: number;
  updated_at: string;
  url: string;
  uuid: string;
}
export interface AuditSuccess extends AuditBase {
  desktop?: AuditContent;
  mobile?: AuditContent;
  title: string;
  status: 'SUCCESS' | 'QUEUED';
}

export interface AuditFailed extends AuditBase {
  status: 'FAILED';
}

export type AuditResponse = BaseResponse<AuditSuccess | AuditFailed>;