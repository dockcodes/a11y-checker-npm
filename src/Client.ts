import {Device} from "./enums/Device";
import {Language} from "./enums/Language";
import {Sort} from "./enums/Sort";
import {ScanRequest} from "./contracts/ScanRequest";
import {RescanRequest} from "./contracts/RescanRequest";
import {AuditRequest} from "./contracts/AuditRequest";
import {AuditsRequest} from "./contracts/AuditsRequest";
import {HistoryRequest} from "./contracts/HistoryRequest";
import {DeleteRequest} from "./contracts/DeleteRequest";
import {UpdateAuditManualRequest} from "./contracts/UpdateAuditManualRequest";

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

    private async request(
        endpoint: string,
        params: Record<string, any> = {},
        headers: Record<string, string> = {},
        method: "get" | "delete" | "post" = "get"
    ): Promise<{ response: any; status: number }> {
        if (this.apiKey) params.key = this.apiKey;
        params.t = Math.floor(Date.now() / 10000);

        const query = new URLSearchParams(
            Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== undefined))
        ).toString();

        const url = `${this.baseUrl}/api/${endpoint}?${query}`;

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 300000); // 5 min timeout

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    Accept: "application/json",
                    ...headers
                },
                signal: controller.signal
            });

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
