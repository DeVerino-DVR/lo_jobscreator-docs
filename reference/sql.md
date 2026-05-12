# SQL schema

All tables are created automatically on first start by the script.

## Tables

| Table | Holds |
|---|---|
| `lo_jobs` | Jobs (`id`, `name`, `label`, `data` JSON, timestamps) |
| `lo_gangs` | Gangs (same shape) |
| `lo_job_interactions` | Interactions attached to a job |
| `lo_gang_interactions` | Interactions attached to a gang |
| `lo_public_interactions` | Public interactions |
| `lo_daily_uses` | Daily counter per `use_key` (per player + interaction) |
| `lo_total_uses` | Lifetime counter per `use_key` |
| `lo_settings` | Live-edited overrides of `config.lua` |
| `lo_audit_log` | Every admin write |
| `lo_custom_blips` | Custom blips |
| `lo_custom_peds` | Custom peds |
| `lo_custom_props` | Custom props |
| `lo_custom_markers` | Custom 3D markers |
| `lo_custom_vehicles` | Vehicles catalogue |
| `lo_custom_horses` | Horses catalogue |
| `lo_item_usables` | Usable-item effect config for each item |

## Common shape

Most tables follow this pattern:

```sql
CREATE TABLE lo_xxx (
    id          INT          AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(64)  UNIQUE,
    label       VARCHAR(128),
    data        LONGTEXT,        -- JSON payload
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

The `data` JSON column is where most of the structure lives — grades, regions, blip config, prop / ped config, etc. The script handles parsing.

## Use-key counters

`lo_daily_uses` and `lo_total_uses` share the same shape:

```sql
CREATE TABLE lo_daily_uses (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    use_key   VARCHAR(128) UNIQUE,
    use_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

`use_key` encodes the player identifier + the interaction id, so there's one row per (player, interaction) pair.

## Audit

```sql
CREATE TABLE lo_audit_log (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    ts          BIGINT NOT NULL,         -- UNIX ms
    staff_id    VARCHAR(64),
    staff_name  VARCHAR(64),
    action      VARCHAR(32),             -- create | update | delete | import | …
    target_type VARCHAR(32),             -- job | gang | interaction | item | …
    target_name VARCHAR(128),
    details     LONGTEXT                 -- JSON
);
```

## Backup / restore at the SQL level

To migrate to another server:

```sh
mysqldump -u user -p mydb lo_jobs lo_gangs lo_job_interactions lo_gang_interactions \
    lo_public_interactions lo_settings lo_custom_blips lo_custom_peds lo_custom_props \
    lo_custom_markers lo_custom_vehicles lo_custom_horses lo_item_usables > backup.sql
```

Import into the new DB before starting `lo_jobscreator` and you keep everything.

The panel's own JSON backup / restore is easier for day-to-day; the SQL path is for full disaster recovery.

## Reset

To completely wipe and start fresh (⚠️ destructive):

```sql
DROP TABLE
    lo_jobs, lo_gangs,
    lo_job_interactions, lo_gang_interactions, lo_public_interactions,
    lo_daily_uses, lo_total_uses,
    lo_settings, lo_audit_log,
    lo_custom_blips, lo_custom_peds, lo_custom_props, lo_custom_markers,
    lo_custom_vehicles, lo_custom_horses,
    lo_item_usables;
```

The tables are recreated on next start.
