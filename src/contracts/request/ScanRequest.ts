import { Device } from '../../enums/Device';
import { Language } from '../../enums/Language';
import type { BaseRequest } from './BaseRequest';

export interface ScanRequest extends BaseRequest {
  url: string;
  lang?: Language;
  device?: Device;
  sync?: boolean;
  extraData?: boolean;
  uniqueKey?: string;
}
