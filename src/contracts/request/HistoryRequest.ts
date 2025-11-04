import type { Sort } from "../types";
import type { BaseRequest } from "./BaseRequest";
import type { HistoryFilters } from "./HistoryFilters";

export interface HistoryRequest extends BaseRequest {
    uuid: string;
    page?: number;
    perPage?: number;
    sort?: Sort;
    filters?: HistoryFilters;
}