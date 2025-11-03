import { Device } from './enums/Device';
import { Language } from './enums/Language';
import { Sort } from './enums/Sort';
import { ScanRequest } from './contracts/ScanRequest';
import { RescanRequest } from './contracts/RescanRequest';
import { AuditRequest } from './contracts/AuditRequest';
import { AuditsRequest } from './contracts/AuditsRequest';
import { HistoryRequest } from './contracts/HistoryRequest';
import { DeleteRequest } from './contracts/DeleteRequest';
import { UpdateAuditManualRequest } from './contracts/UpdateAuditManualRequest';
import { UserRequest } from './contracts/UserRequest';
import { UpdateHistoryRequest } from './contracts/UpdateHistoryRequest';

export class Client {
    private readonly apiKey?: string;
    private readonly baseUrl: string;

    constructor({apiKey, baseUrl = "https://a11y-checker.wcag.dock.codes"}: {
        apiKey?: string;
        baseUrl?: string;
    } = {}) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl.replace(/\/$/, "");
    }

    async scan({url, lang = Language.EN, device = Device.DESKTOP, sync = false, extraData = false, uniqueKey}: ScanRequest) {
        const data: Record<string, any> = {
            url,
            sync,
            lang,
            extra_data: extraData,
            unique_key: uniqueKey
        };
        if (device !== Device.ALL) data.device = device;
        return this.request("scan", data);
    }

    async rescan({uuid, lang = Language.EN, sync = false, extraData = false}: RescanRequest) {
        return this.request("rescan", {
            uuid,
            sync,
            lang,
            extra_data: extraData
        });
    }

    async audit({uuid, lang = Language.EN, extraData = false}: AuditRequest) {
        return this.request("audit", {
            uuid,
            lang,
            extra_data: extraData
        });
    }

    async audits({search, page = 1, perPage = 10, sort = Sort.LAST_AUDIT_DESC, uniqueKey = ""}: AuditsRequest) {
        return this.request("audits", {
            search,
            page,
            per_page: perPage,
            sort,
            unique_key: uniqueKey
        });
    }

    async history({uuid, page = 1, perPage = 10, sort = Sort.CREATED_AT_ASC, filters = {}}: HistoryRequest) {
        const params: Record<string, any> = {
            uuid,
            page,
            per_page: perPage,
            sort
        }
        for (const [key, value] of Object.entries(filters)) {
            if (value !== undefined && value !== null) {
                params[key] = value instanceof Date ? value.toISOString() : value;
            }
        }
        return this.request("history", params);
    }

    async deleteAudit({uuid}: DeleteRequest) {
        return this.request("audit", {uuid}, {}, "delete");
    }

    async deleteHistory({uuid}: DeleteRequest) {
        return this.request("history", {uuid}, {}, "delete");
    }

    async updateAuditManual({uuid, criterionId, status, device}: UpdateAuditManualRequest) {
        return this.request("audit/manual", {uuid, status, device, criterion_id: criterionId}, {}, "post");
    }

    async historyUpdate({uuid, monitoring = null, notifications = null}: UpdateHistoryRequest) {
        let params: any = {uuid}
        if (monitoring !== null) params['monitoring'] = monitoring
        if (notifications !== null) params['notifications'] = notifications
        return this.request("history/update", params, {}, "post");
    }

    async user({}: UserRequest) {
        return this.request("user", {}, {}, "get");
    }

    private async request(
        endpoint: string,
        params: Record<string, any> = {},
        headers: Record<string, string> = {},
        method: "get" | "delete" | "post" = "get"
    ): Promise<{ response: any; status: number }> {
        if (this.apiKey) params.key = this.apiKey;
        params.t = Math.floor(Date.now() / 10000);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 300000); // 5 min timeout

        try {
            let url = `${this.baseUrl}/api/${endpoint}`;
            const reqHeaders = new Headers({
                Accept: "application/json",
                ...headers,
            });
            let options: RequestInit = {
                method,
                headers: reqHeaders,
                signal: controller.signal,
            };

            if (method === "get" || method === "delete") {
                const query = new URLSearchParams(
                  Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== undefined))
                ).toString();
                url += `?${query}`;
            } else if (method === "post") {
                reqHeaders.set("Content-Type", "application/json");
                options.headers = reqHeaders;
                options.body = JSON.stringify(params);
            }

            const res = await fetch(url, options);

            let body: any = {};
            try {
                body = await res.json();
            } catch {
                body = {};
            }

            return {response: body, status: res.status};
        } catch (err: any) {
            throw new Error(`Request failed: ${err.message}`);
        } finally {
            clearTimeout(timeout);
        }
    }
}
