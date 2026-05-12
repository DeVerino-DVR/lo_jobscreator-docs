# Audit log

Every administrative write goes here. Browses the `lo_audit_log` table.

## What it logs

| Action | Target |
|---|---|
| Create / update / delete | Job, gang, grade, interaction, item, custom blip / ped / prop / marker / vehicle / horse |
| Edit | Server config (per key) |
| Import / restore | Backups, snapshots |

## Columns

- **Timestamp** — UNIX ms.
- **Staff** — character id + name at the time of the action.
- **Action** — `create`, `update`, `delete`, `import`, …
- **Target type** — `job`, `gang`, `interaction`, …
- **Target name** — the entity's technical name.
- **Details** — JSON blob with the diff (before / after) or payload.

## Filters

In the tab UI you can filter by staff member, action, target type, date range. Click a row to expand the JSON details.

## Discord mirror

`Config.Logs.enabled = true` + `Config.Logs.webhook = '<url>'` posts each audit entry as a Discord embed in real time. Useful for ops channels.

## Retention

No automatic pruning. To trim manually:

```sql
DELETE FROM lo_audit_log WHERE ts < (UNIX_TIMESTAMP() - 30 * 86400) * 1000;
```
