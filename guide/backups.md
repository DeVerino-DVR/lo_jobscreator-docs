# Backups & restore

The panel can export the whole configuration to a single JSON file, and import it back.

## What's included

The export contains:

- Every job and gang (with grades, salaries, regions, blip, allowed actions).
- Every interaction attached to those jobs / gangs.
- Every public interaction.
- Every custom blip, ped, prop, marker.
- Every vehicle and horse in the catalogues.
- Every item created from the panel (with its usable config).
- `lo_settings` (the panel-edited part of `config.lua`).

**Not** included:

- The audit log.
- `vorp_inventory` data outside the items created here.
- Anything from other resources.

## Exporting

**Backups** tab → **Export**. The panel saves a `.json` file via the browser download dialog.

## Importing

**Backups** tab → **Import** → pick the file. The panel runs a diff first (what would be created / replaced / deleted) and shows you the summary before applying.

Imports always create an automatic safety snapshot first — if something goes wrong you can revert.

## Schedule

Make this a habit. Once a week is the absolute minimum on a production server. Daily before risky changes.

## Restore from raw SQL

If everything in the panel is broken, you can also restore from a `mysqldump` of the `lo_*` tables. The panel re-reads the DB on resource start.
