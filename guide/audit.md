# Audit log

Every administrative write is recorded in `lo_audit_log`. The **Audit** tab in the panel browses this table.

## What's logged

- Job / gang created, edited, deleted.
- Grade added, edited, removed.
- Interaction created, edited, deleted (any scope).
- Custom blip / ped / prop / marker / vehicle / horse created, edited, deleted.
- Item created, edited, deleted.
- Server config changed (per key).
- Import / restore / backup operations.

## What's recorded for each entry

| Column | Meaning |
|---|---|
| `ts` | UNIX timestamp (ms) |
| `staff_id` | The character's user id |
| `staff_name` | The character's name at time of the action |
| `action` | `create`, `update`, `delete`, `import`, … |
| `target_type` | `job`, `gang`, `interaction`, `item`, `blip`, … |
| `target_name` | The target's technical name |
| `details` | JSON blob with the before/after diff (or the payload) |

## Reading it

In the **Audit** tab you can filter by staff, action, target type and date range. Click an entry to see the JSON `details`.

## Retention

There's no automatic pruning — the log keeps growing. For most servers it stays small enough to ignore, but if you want to trim it:

```sql
DELETE FROM lo_audit_log WHERE ts < (UNIX_TIMESTAMP() - 30 * 86400) * 1000;
-- keeps the last 30 days
```

## Discord webhook

`Config.Logs.enabled = true` + `Config.Logs.webhook = '<url>'` mirrors the audit log to Discord embeds.
