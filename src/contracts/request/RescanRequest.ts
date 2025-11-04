import type { Language } from "../types";
import type { BaseRequest } from "./BaseRequest";

export interface RescanRequest extends BaseRequest {
    uuid: string;
    lang?: Language;
    sync?: boolean;
    extraData?: boolean;
}