import { AuditStatus } from "../../enums/AuditStatus";
import { Device } from "../../enums/Device";
import type { BaseRequest } from "./BaseRequest";

export interface UpdateAuditManualRequest extends BaseRequest {
    uuid: string;
    criterionId: string;
    status: AuditStatus;
    device: Device;
}