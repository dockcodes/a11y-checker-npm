# @dockcodes/a11y-checker

TypeScript client for Dock A11y Checker API.

## Installation

```bash
npm install @dockcodes/a11y-checker
```

## Usage
```ts
import { Client, Language, Device } from "@dockcodes/a11y-checker";

const guest = new Client(); // without key
// const client = new Client({apiKey: "YOUR_API_KEY"});

async function run() {
    const result = await guest.scan({
        url: "https://example.com",
        lang: Language.PL,
        device: Device.DESKTOP,
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

| Method                                                 | Description                   |
|--------------------------------------------------------|-------------------------------|
| `scan(options: ScanRequest)`                           | Run a new accessibility scan  |
| `rescan(options: RescanRequest)`                       | Rescan an existing audit      |
| `audit(options: AuditRequest)`                         | Get audit details             |
| `audits(options: AuditsRequest)`                       | Get multiple audits           |
| `history(options: HistoryRequest)`                     | Get audit history             |
| `deleteAudit(options: DeleteRequest)`                  | Delete an audit               |
| `deleteHistory(options: DeleteRequest)`                | Delete an audit's history     |
| `updateAuditManual(options: UpdateAuditManualRequest)` | Update status of manual audit |
| `historyUpdate(options: UpdateHistoryRequest)`         | Update history                |
| `user(options: UserRequest)`                           | Get current user info         |

## Contact

If you need an API key or would like to learn more about this solution, please visit [wcag.dock.codes](https://wcag.dock.codes).
