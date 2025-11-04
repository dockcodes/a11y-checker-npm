# @dockcodes/a11y-checker

TypeScript client for Dock A11y Checker API.

## Installation

```bash
npm install @dockcodes/a11y-checker
```

## Usage
```ts
import { Client } from "@dockcodes/a11y-checker";

const guest = new Client(); // without key
// const client = new Client({apiKey: "YOUR_API_KEY"});

async function run() {
    const result = await guest.scan({
        url: "https://example.com",
        lang: "en",
        device: "desktop",
        sync: false
    });
    console.log(result);
    
    guest.audit({uuid: result.response.uuid}).then(result => {
        console.log(result)
    })
}

run();
```

## API Methods
| Method                                                                                                     | Description                   |
|------------------------------------------------------------------------------------------------------------|-------------------------------|
| `login(params: LoginRequest, options: FetchOptions) => LoginResponse`                                     | Run a new accessibility scan  |
| `scan(params: ScanRequest, options: FetchOptions) => ScanResponse`                                        | Run a new accessibility scan  |
| `rescan(params: RescanRequest, options: FetchOptions) => RescanResponse`                                  | Rescan an existing audit      |
| `audit(params: AuditRequest, options: FetchOptions) => AuditResponse`                                     | Get audit details             |
| `audits(params: AuditsRequest, options: FetchOptions) => AuditsResponse`                                  | Get multiple audits           |
| `history(params: HistoryRequest, options: FetchOptions) => HistoryResponse`                               | Get audit history             |
| `deleteAudit(params: DeleteRequest, options: FetchOptions) => DeleteResponse`                             | Delete an audit               |
| `deleteHistory(params: DeleteRequest, options: FetchOptions) => DeleteResponse`                           | Delete an audit's history     |
| `updateAuditManual(params: UpdateAuditManualRequest, options: FetchOptions) => UpdateAuditManualResponse` | Update status of manual audit |
| `user(params: UserRequest, options: FetchOptions) => UserResponse`                                        | Get current user info         |

## Types

[FetchOptions]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/types.ts
[FetchOptions]

[LoginRequest]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/request/LoginRequest.ts
[LoginRequest]

[LoginResponse]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/response/LoginResponse.ts
[LoginResponse]

[ScanRequest]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/request/ScanRequest.ts
[ScanRequest]

[ScanResponse]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/response/ScanResponse.ts
[ScanResponse]

[RescanRequest]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/request/RescanRequest.ts
[RescanRequest]

[RescanResponse]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/response/RescanResponse.ts
[RescanResponse]

[AuditRequest]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/request/AuditRequest.ts
[AuditRequest]

[AuditResponse]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/response/AuditResponse.ts
[AuditResponse]

[AuditsRequest]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/request/AuditsRequest.ts
[AuditsRequest]

[AuditsResponse]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/response/AuditsResponse.ts
[AuditsResponse]

[HistoryRequest]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/request/HistoryRequest.ts
[HistoryRequest]

[HistoryResponse]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/response/HistoryResponse.ts
[HistoryResponse]

[DeleteRequest]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/request/DeleteRequest.ts
[DeleteRequest]

[DeleteResponse]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/response/DeleteResponse.ts
[DeleteResponse]

[DeleteRequest]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/request/DeleteRequest.ts
[DeleteRequest]

[DeleteResponse]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/response/DeleteResponse.ts
[DeleteResponse]

[UpdateAuditManualRequest]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/request/UpdateAuditManualRequest.ts
[UpdateAuditManualRequest]

[UpdateAuditManualResponse]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/response/UpdateAuditManualResponse.ts
[UpdateAuditManualResponse]

[UserRequest]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/request/UserRequest.ts
[UserRequest]

[UserResponse]: https://github.com/dockcodes/a11y-checker-npm/blob/main/src/contracts/response/UserResponse.ts
[UserResponse]


## Contact

If you need an API key or would like to learn more about this solution, please visit [wcag.dock.codes](https://wcag.dock.codes).
