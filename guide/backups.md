# Backups

Manual snapshots and automatic safety nets.

## Manual snapshots

**Sauvegardes** tab → **+ Nouvelle sauvegarde** captures the current state
of all admin data (jobs, gangs, public, items, blips, peds, settings) into
a single row of `lo_backups`.

You can restore any snapshot from the same tab. Restore is **destructive**
on the affected scope — confirmed by a modal that lists exactly what will
be replaced.

## Auto-backup before destructive operations

Any "Restore from backup" or "Restore from template" automatically creates
a snapshot of the current state first. So you can always undo an undo.

## Where the data lives

```sql
CREATE TABLE `lo_backups` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `name`       VARCHAR(190),
  `created_at` DATETIME,
  `created_by` VARCHAR(64),
  `note`       TEXT,
  `payload`    LONGTEXT      -- JSON dump
);
```

You can rotate this table externally (e.g. delete rows older than 30 days)
without breaking anything — the panel re-reads on every open.
