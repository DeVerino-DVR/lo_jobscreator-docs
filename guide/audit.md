# Audit log

Every administrative write is logged. The data lives in the `lo_audit`
table and is shown in the **Journal admin** tab.

## What gets logged

- Entity create / update / delete (job, gang, public, item, blip, ped, …).
- Interaction create / update / delete.
- Settings overrides.
- Backup create / restore.
- Template apply / delete.

A row contains:

| Column | Meaning |
|---|---|
| `created_at` | Timestamp. |
| `actor_source` | RedM `source` of the admin. |
| `actor_name` | Character name at the time of the write. |
| `actor_group` | Group at the time of the write. |
| `action` | Verb (`entity.update`, `interaction.delete`, …). |
| `target` | Target id / name. |
| `before` | JSON snapshot of the affected row before the write. |
| `after` | JSON snapshot after the write. |

## Discord webhook

Set `Config.Logs.webhook` to a Discord webhook URL to mirror every log in a
Discord channel. The script chunks long messages and respects Discord's
rate-limit.

## Retention

The script does not auto-prune `lo_audit`. Set up an external scheduled
job (or your favourite SQL cleanup script) to delete rows older than your
retention policy.
