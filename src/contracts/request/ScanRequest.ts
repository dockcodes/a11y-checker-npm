import type { Device, Language } from '../types';
import type { BaseRequest } from './BaseRequest';

export interface ScanRequest<Sync extends boolean> extends BaseRequest {
    recaptchaToken?: string;
    url: string;
    lang?: Language;
    device?: Device;
    sync?: Sync;
    extraData?: boolean;
    uniqueKey?: string;
}
