export interface UpdateHistoryRequest {
    uuid: string;
    monitoring?: boolean | null;
    notifications?: boolean | null;
}