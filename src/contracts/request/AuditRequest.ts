import type { Language } from "../types";
import type { BaseRequest } from "./BaseRequest";

export interface AuditRequest extends BaseRequest {
    uuid: string;
    lang?: Language;
    extraData?: boolean;
}