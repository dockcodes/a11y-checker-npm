import type { Language } from "../types";
import type { BaseRequest } from "./BaseRequest";

export interface RescanRequest<Sync extends boolean> extends BaseRequest {
    recaptchaToken?: string;
    uuid: string;
    lang?: Language;
    sync?: Sync;
    extraData?: boolean;
}