import { AuditContent } from '../types';
import { BaseResponse } from './BaseResponse';

interface AuditBase {
    uuid: string;
    address_uuid: string;
    created_at: string;
    updated_at: string;
    requests_left: number;
}

interface AuditAsyncData {
    url: string;
    expires_at: string | null;
}
export interface AuditSuccess extends AuditBase {
    desktop?: AuditContent;
    mobile?: AuditContent;
    status: 'SUCCESS';
    title: string;
}

export interface AuditQueued extends AuditBase, AuditAsyncData {
    status: 'QUEUED';
    desktop?: { screenshot: string };
    mobile?: { screenshot: string };
    title: string;
}
export interface AuditInProgress extends AuditBase, AuditAsyncData {
    status: 'IN_PROGRESS';
    desktop?: Pick<AuditContent, 'screenshot'>;
    mobile?: Pick<AuditContent, 'screenshot'>;
    title: string;
}

export interface AuditFailed extends AuditBase, AuditAsyncData {
    status: 'FAILED';
    error_message: string;
}

export type AuditResponse = BaseResponse<AuditSuccess | AuditQueued | AuditInProgress | AuditFailed>;
