import { Language } from "../../enums/Language";
import type { BaseRequest } from "./BaseRequest";

export interface RescanRequest extends BaseRequest {
    uuid: string;
    lang?: Language;
    sync?: boolean;
    extraData?: boolean;
}