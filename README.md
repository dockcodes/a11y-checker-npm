# @dockcodes/a11y-checker

TypeScript client for Dock A11y Checker API.

## Installation

```bash
npm install @dockcodes/a11y-checker
```

## Usage
```ts
import { Client, Language, Device } from "@dockcodes/a11y-checker";

const client = new Client("YOUR_API_KEY");

async function run() {
    const result = await client.scan("https://example.com", Language.PL, Device.DESKTOP, true);
    console.log(result);
}

run();
```

## API Methods

| Method                                                   | Description                   |
|----------------------------------------------------------|-------------------------------|
| scan(url, lang?, device?, sync?, extraData?, uniqueKey?) | Run a new accessibility scan  |
| rescan(uuid, lang?, sync?, extraData?)                   | Rescan an existing audit      |
| audit(uuid, lang?, extraData?)                           | Get audit details             |
| audits(search, page?, perPage?, sort?, uniqueKey?)       | Get multiple audits           |
| history(uuid, page?, perPage?, sort?)                    | Get audit history             |
| deleteAudit(uuid)                                        | Delete an audit               |
| deleteHistory(uuid)                                      | Delete an audit's history     |
| updateAuditManual(uuid, criterionId, status, device)     | Update status of manual audit |
