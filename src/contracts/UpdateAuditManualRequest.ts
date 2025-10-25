import { AuditStatus } from "../enums/AuditStatus";
import { Device } from "../enums/Device";

export interface UpdateAuditManualRequest {
    uuid: string;
    criterionId: string;
    status: AuditStatus;
    device: Device;
}