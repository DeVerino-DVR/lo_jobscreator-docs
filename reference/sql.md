# SQL schema

All tables are created automatically on first boot from `Config.SQL`. The
table names are prefixed with `lo_` to avoid collisions with framework
tables.

## `lo_jobs`

| Column | Type | Notes |
|---|---|---|
| `id` | int auto-increment | PK |
| `name` | varchar(50) | unique key, snake_case |
| `label` | varchar(100) | display label |
| `data` | longtext | JSON blob: grades, type, payment, sections, …|
| `created_at` | timestamp | default `CURRENT_TIMESTAMP` |
| `updated_at` | timestamp | on update `CURRENT_TIMESTAMP` |

## `lo_gangs`

Same shape as `lo_jobs`. Skipped if `Config.Features.gangs = false`.

## `lo_job_interactions` / `lo_gang_interactions`

| Column | Type | Notes |
|---|---|---|
| `id` | int auto-increment | PK |
| `job_name` (or `gang_name`) | varchar(50) | FK to parent table, ON DELETE CASCADE |
| `interaction_type` | varchar(50) | e.g. `stash`, `shop`, `farm` |
| `coords` | longtext | JSON `{x, y, z, h}` |
| `data` | longtext | JSON blob, depends on type |
| `created_at` / `updated_at` | timestamps | |

## `lo_public_interactions`

Same as above but no FK — public interactions belong to no entity.

## `lo_settings`

Key/value store for everything edited in the **Configuration serveur** tab.

| Column | Type | Notes |
|---|---|---|
| `key` | varchar(64) | PK |
| `value` | longtext | JSON-encoded |
| `updated_at` | timestamp | |

Common keys: `Paycheck`, `Logs`, `Features`, `Performance`, `DefaultGrades`,
`PermissionGroup`, `ButtonPermissions`, `EntityTypes`, `InteractionTypes`,
`Actions`.

## `lo_audit_log`

| Column | Type | Notes |
|---|---|---|
| `id` | int auto-increment | PK |
| `ts` | bigint | unix ms |
| `staff_id` | int | character id |
| `staff_name` | varchar(100) | display name |
| `action` | varchar(32) | `create`, `update`, `delete`, … |
| `target_type` | varchar(32) | `job`, `gang`, `interaction`, … |
| `target_name` | varchar(255) | |
| `details` | longtext | JSON diff |

## `lo_daily_uses` / `lo_total_uses`

Per-key counters used by `dailyLimit` / `totalLimit` farm/process/sell
mechanics.

| Column | Type | Notes |
|---|---|---|
| `id` | int auto-increment | PK |
| `use_key` | varchar(255) | unique, e.g. `<player>_<interactionId>_<itemName>` |
| `use_count` | int | |
| `created_at` / `updated_at` | timestamps | |

`lo_daily_uses` rows are pruned daily at midnight (`DATE(created_at) < CURDATE()`).

## `lo_custom_blips` / `lo_custom_peds` / `lo_custom_props` / `lo_custom_markers`

| Column | Type | Notes |
|---|---|---|
| `id` | int auto-increment | PK |
| `name` | varchar(100) | display name |
| `data` | longtext | JSON blob |
| `created_at` / `updated_at` | timestamps | |

Used by the **Custom Blips** / **Peds** modules of the panel.

## Backups

The **Backups** tab stores snapshot ZIPs (or JSON exports) on the server
filesystem (`resources/lo_jobscreator/backups/`) — there is no SQL table
for them.
