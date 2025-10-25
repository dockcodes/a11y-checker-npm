import { Sort } from "../enums/Sort";

export interface AuditsRequest {
    search: string;
    page?: number;
    perPage?: number;
    sort?: Sort;
    uniqueKey?: string;
}