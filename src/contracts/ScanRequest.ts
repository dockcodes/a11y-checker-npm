import { Device } from "../enums/Device";
import { Language } from "../enums/Language";

export interface ScanRequest {
    url: string;
    lang?: Language;
    device?: Device;
    sync?: boolean;
    extraData?: boolean;
    uniqueKey?: string;
}