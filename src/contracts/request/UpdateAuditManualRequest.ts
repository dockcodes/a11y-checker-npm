import type { AuditStatus, Device } from "../types";
import type { BaseRequest } from "./BaseRequest";

export interface UpdateAuditManualRequest extends BaseRequest {
    uuid: string;
    criterionId: string;
    status: AuditStatus;
    device: Device;
}