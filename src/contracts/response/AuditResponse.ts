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
interface AuditSuccess extends AuditBase {
  desktop?: AuditContent;
  mobile?: AuditContent;
  title: string;
  status: 'SUCCESS' | 'QUEUED';
}

interface AuditFailed extends AuditBase {
  status: 'FAILED';
}

export type AuditResponse = BaseResponse<AuditSuccess | AuditFailed>;