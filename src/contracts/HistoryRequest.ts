import { Sort } from "../enums/Sort";
import { HistoryFilters } from "./HistoryFilters";

export interface HistoryRequest {
    uuid: string;
    page?: number;
    perPage?: number;
    sort?: Sort;
    filters?: HistoryFilters;
}