# Gangs module

Identical to the [Jobs module](/admin/jobs) but stored in `lo_gangs` and
tied to `character.gang` / `character.ganggrade`.

## Enabling

Off by default. Set:

```lua
Config.Features.gangs = true
```

If your framework is VORP and you want native `character.gang` support,
follow the optional core patch in `GANG_SETUP.md` (4 files in `vorp_core`,
all changes documented and reversible).

## Disabling cleanly

Setting `gangs = false` after you have created gangs:

- Hides the Gangs tab.
- Stops loading `lo_gangs` and `lo_gang_interactions` on boot.
- Keeps the SQL data intact (just unread).

To wipe the data, drop the `lo_gangs` and `lo_gang_interactions` tables
manually.
