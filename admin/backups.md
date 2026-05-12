# Backups & restore

The full panel state, exported to a single JSON file.

## What's in a backup

- Every job and gang (with grades, salaries, regions, blips, allowed actions).
- Every interaction (job, gang, public).
- Every custom blip, ped, prop, marker.
- Every vehicle and horse in the catalogues.
- Every item created from the Items tab (with usable effects).
- The `lo_settings` overlay (the part of `config.lua` that's been edited in the panel).

## What's NOT in a backup

- The audit log (it's history, not state).
- `vorp_inventory` data outside the items the panel created.
- Anything from other resources.

## Exporting

**Backups** tab → **Export**. Downloads a `.json` file via the browser save dialog.

## Importing

**Backups** tab → **Import** → pick the file. The panel diffs against current state:

- **Create** — items that exist in the backup but not on the server.
- **Replace** — items that exist on both but differ.
- **Delete** — items on the server but not in the backup.

Confirm to apply. An automatic safety snapshot is taken right before applying — if the import goes wrong you can roll back.

## Snapshots

Every destructive operation (delete job, bulk delete, import) creates a snapshot. The **Snapshots** sub-tab lists them; you can preview and restore.

## SQL-level restore

If the panel itself is broken, restore from a `mysqldump` of the `lo_*` tables. The script reads them on next start.

## Cadence

- Daily before risky changes.
- Weekly minimum on a live server.
- Always before importing or restoring.
