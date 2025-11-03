import type { BaseRequest } from "./BaseRequest";

export interface UpdateHistoryRequest extends BaseRequest {
    uuid: string;
    monitoring?: boolean | null;
    notifications?: boolean | null;
}