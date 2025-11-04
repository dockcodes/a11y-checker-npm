import type { BaseResponse } from './BaseResponse';

export interface ScanSuccess {
  address_uuid: string;
  created_at: string;
  desktop?: { screenshot: string };
  mobile?: { screenshot: string };
  requests_left: number;
  status: 'QUEUED';
  title: string;
  updated_at: string;
  uuid: string;
}

export type ScanResponse = BaseResponse<ScanSuccess>;
