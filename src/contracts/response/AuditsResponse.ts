import type { Listing } from '../types';
import type { BaseResponse } from './BaseResponse';

interface AuditSmall {
  uuid: string;
  address_uuid: string;
  url: string;
  status: 'SUCCESS';
  monitoring: boolean;
  mobile_score: number | null;
  desktop_score: number | null;
  last_audit: string;
}

export interface AuditsSuccess extends Listing {
  data: AuditSmall[];
}

export type AuditsResponse = BaseResponse<AuditsSuccess>;
