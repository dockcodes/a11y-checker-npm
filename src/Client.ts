import { Device } from "./enums/Device";
import { Language } from "./enums/Language";
import { Sort } from "./enums/Sort";

export class Client {
    private readonly baseUrl: string;

    constructor(
        private readonly apiKey?: string,
        baseUrl: string = "https://a11y-checker.wcag.dock.codes"
    ) {
        this.baseUrl = baseUrl.replace(/\/$/, "");
    }

    async scan(
        url: string,
        lang: Language = Language.EN,
        device: Device = Device.DESKTOP,
        sync = false,
        extraData = false,
        uniqueKey?: string
    ) {
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

    async rescan(
        uuid: string,
        lang: Language = Language.EN,
        sync = false,
        extraData = false
    ) {
        return this.request("rescan", {
            uuid,
            sync,
            lang,
            extra_data: extraData
        });
    }

    async audit(
        uuid: string,
        lang: Language = Language.EN,
        extraData = false
    ) {
        return this.request("audit", {
            uuid,
            lang,
            extra_data: extraData
        });
    }

    async audits(
        search: string,
        page = 1,
        perPage = 10,
        sort: Sort = Sort.LAST_AUDIT_DESC,
        uniqueKey?: string
    ) {
        return this.request("audits", {
            search,
            page,
            per_page: perPage,
            sort,
            unique_key: uniqueKey ?? ""
        });
    }

    async history(
        uuid: string,
        page = 1,
        perPage = 10,
        sort: Sort = Sort.CREATED_AT_ASC
    ) {
        return this.request("history", {
            uuid,
            page,
            per_page: perPage,
            sort
        });
    }

    async deleteAudit(uuid: string) {
        return this.request("audit", { uuid }, {}, "delete");
    }

    async deleteHistory(uuid: string) {
        return this.request("history", { uuid }, {}, "delete");
    }

    private async request(
        endpoint: string,
        params: Record<string, any> = {},
        headers: Record<string, string> = {},
        method: "get" | "delete" = "get"
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

            return { response: body, status: res.status };
        } catch (err: any) {
            throw new Error(`Request failed: ${err.message}`);
        } finally {
            clearTimeout(timeout);
        }
    }
}
