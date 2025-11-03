import { Sort } from "../../enums/Sort";
import type { BaseRequest } from "./BaseRequest";

export interface AuditsRequest extends BaseRequest {
    search: string;
    page?: number;
    perPage?: number;
    sort?: Sort;
    uniqueKey?: string;
}