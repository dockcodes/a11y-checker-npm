import type { BaseRequest } from "./BaseRequest";

export interface DeleteRequest extends BaseRequest {
    uuid: string;
}