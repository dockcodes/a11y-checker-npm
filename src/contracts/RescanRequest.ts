import { Language } from "../enums/Language";

export interface RescanRequest {
    uuid: string;
    lang?: Language;
    sync?: boolean;
    extraData?: boolean;
}