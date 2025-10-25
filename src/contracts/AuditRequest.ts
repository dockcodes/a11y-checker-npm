import { Language } from "../enums/Language";

export interface AuditRequest {
    uuid: string;
    lang?: Language;
    extraData?: boolean;
}