import type { Device, Language } from '../types';
import type { BaseRequest } from './BaseRequest';

export interface ScanRequest extends BaseRequest {
  url: string;
  lang?: Language;
  device?: Device;
  sync?: boolean;
  extraData?: boolean;
  uniqueKey?: string;
}
