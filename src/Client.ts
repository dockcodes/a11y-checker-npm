import type { AuditRequest } from './contracts/request/AuditRequest';
import type { AuditsRequest } from './contracts/request/AuditsRequest';
import type { DeleteRequest } from './contracts/request/DeleteRequest';
import type { HistoryRequest } from './contracts/request/HistoryRequest';
import type { RescanRequest } from './contracts/request/RescanRequest';
import type { ScanRequest } from './contracts/request/ScanRequest';
import type { UpdateAuditManualRequest } from './contracts/request/UpdateAuditManualRequest';
import type { UserRequest } from './contracts/request/UserRequest';
import type { AuditResponse } from './contracts/response/AuditResponse';
import type { AuditsResponse } from './contracts/response/AuditsResponse';
import type { BaseResponse, ErrorResponse } from './contracts/response/BaseResponse';
import type { DeleteResponse } from './contracts/response/DeleteResponse';
import type { HistoryResponse } from './contracts/response/HistoryResponse';
import type { ScanResponse } from './contracts/response/ScanResponse';
import type { UpdateAuditManualResponse } from './contracts/response/UpdateAuditManualResponse';
import type { UserResponse } from './contracts/response/UserResponse';
import type { FetchOptions } from './contracts/types';

export class Client {
    private readonly apiKey?: string;
    private readonly baseUrl: string;
    private authToken?: string;

    constructor({
        apiKey,
        baseUrl = 'https://a11y-checker.wcag.dock.codes',
    }: {
        apiKey?: string;
        baseUrl?: string;
    } = {}) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl.replace(/\/$/, '');
    }

    set setAuthToken(authToken: string) {
        this.authToken = authToken;
    }

    async scan({ url, lang = 'en', device = 'all', sync = false, extraData = false, uniqueKey, recaptchaToken, key }: ScanRequest, options?: FetchOptions<ScanResponse>) {
        const data: Record<string, any> = {
            url,
            sync,
            lang,
            extra_data: extraData,
            unique_key: uniqueKey,
            recaptcha_token: recaptchaToken,
            key,
        };
        if (device !== 'all') data.device = device;
        return this.request<ScanResponse>('scan', data, {}, 'get', options);
    }

    async rescan({ uuid, lang = 'en', sync = false, extraData = false, recaptchaToken, key }: RescanRequest, options?: FetchOptions<ScanResponse>) {
        return this.request<ScanResponse>(
            'rescan',
            {
                uuid,
                sync,
                lang,
                extra_data: extraData,
                recaptcha_token: recaptchaToken,
                key,
            },
            {},
            'get',
            options
        );
    }

    async audit({ uuid, lang = 'en', extraData = false, key }: AuditRequest, options?: FetchOptions<AuditResponse>) {
        return this.request<AuditResponse>(
            'audit',
            {
                uuid,
                lang,
                extra_data: extraData,
                key,
            },
            {},
            'get',
            options
        );
    }

    async audits({ search, page = 1, perPage = 10, sort = 'last_audit_desc', uniqueKey = '', key }: AuditsRequest, options?: FetchOptions<AuditsResponse>) {
        return this.request<AuditsResponse>(
            'audits',
            {
                search,
                page,
                per_page: perPage,
                sort,
                unique_key: uniqueKey,
                key,
            },
            {},
            'get',
            options
        );
    }

    async history({ uuid, page = 1, perPage = 10, sort = 'created_at_asc', filters = {}, key }: HistoryRequest, options?: FetchOptions<HistoryResponse>) {
        const params: Record<string, any> = {
            uuid,
            page,
            per_page: perPage,
            sort,
            key,
        };
        for (const [key, value] of Object.entries(filters)) {
            if (value !== undefined && value !== null) {
                params[key] = value instanceof Date ? value.toISOString() : value;
            }
        }
        return this.request<HistoryResponse>('history', params, {}, 'get', options);
    }

    async deleteAudit({ uuid, key }: DeleteRequest, options?: FetchOptions<DeleteResponse>) {
        return this.request<DeleteResponse>('audit', { uuid, key }, {}, 'delete', options);
    }

    async deleteHistory({ uuid, key }: DeleteRequest, options?: FetchOptions<DeleteResponse>) {
        return this.request<DeleteResponse>('history', { uuid, key }, {}, 'delete', options);
    }

    async updateAuditManual({ uuid, criterionId, status, device, key }: UpdateAuditManualRequest, options?: FetchOptions<UpdateAuditManualResponse>) {
        return this.request<UpdateAuditManualResponse>('audit/manual', { uuid, status, device, criterion_id: criterionId, key }, {}, 'post', options);
    }

    async user({ key }: UserRequest, options?: FetchOptions<UserResponse>) {
        return this.request<UserResponse>('user', { key }, {}, 'get', options);
    }

    protected async request<T extends BaseResponse<unknown>>(
        endpoint: string,
        params: Record<string, any> = {},
        headers: Record<string, string> = {},
        method: 'get' | 'delete' | 'post' = 'get',
        fetchOptions?: FetchOptions<Exclude<T, ErrorResponse>>
    ): Promise<{ response: Exclude<T, ErrorResponse>; status: number }> {
        if (this.apiKey) params.key = this.apiKey;
        params.t = Math.floor(Date.now() / 10000);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 300000); // 5 min timeout

        try {
            let url = `${this.baseUrl}/api/${endpoint}`;
            const reqHeaders = new Headers({
                Accept: 'application/json',
                ...(this.authToken ? { Authorization: `Bearer ${this.authToken}` } : {}),
                ...headers,
            });
            let options: RequestInit = {
                method,
                headers: reqHeaders,
                signal: controller.signal,
                ...fetchOptions,
            };

            if (method === 'get' || method === 'delete') {
                const query = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== undefined))).toString();
                url += `?${query}`;
            } else if (method === 'post') {
                reqHeaders.set('Content-Type', 'application/json');
                options.headers = reqHeaders;
                options.body = JSON.stringify(params);
            }

            const res = await fetch(url, options);
            const body = await res.json();

            if ('detail' in body) {
                throw new Error(body.detail);
            }

            return { response: body, status: res.status };
        } catch (err: any) {
            throw new Error(`Request failed: ${err.message}`);
        } finally {
            clearTimeout(timeout);
        }
    }
}
