# Admin panel overview

Open with `/jobcreator` (or whatever you set in `Config.Command`). You need a group listed in `Config.PermissionGroup`.

## Layout

| Tab | What it's for |
|---|---|
| [Dashboard](/admin/dashboard) | Counters, recent audit events, who's online per job |
| [Jobs](/admin/jobs) | Create, edit, delete jobs |
| [Gangs](/admin/gangs) | Same, for gangs |
| [Public actions](/admin/public) | World points anyone can use |
| [Items](/admin/items) | Create items into `vorp_inventory` (with usable effects) |
| [Custom blips](/admin/blips) | Map markers |
| [Custom peds](/admin/peds) | NPCs as scenery |
| [Catalogs](/admin/catalogs) | Vehicles, horses, props, 3D markers |
| [Templates](/admin/templates) | One-click job/gang setups |
| [Backups & restore](/admin/backups) | Export / import everything as JSON |
| [Audit log](/admin/audit) | Every admin write |
| [Server config](/admin/server-config) | Paychecks, permissions, features, providers… |
| [Preferences](/admin/preferences) | Per-admin UI settings |

## Tab visibility

You only see tabs your group is allowed to. If you can see the panel but a tab is missing, check `Config.ButtonPermissions` for that tab.

You can also disable a tab entirely for everyone via `Config.Features.<key> = false`.

## Save & broadcast

Every edit is saved to SQL on submit. Changes are pushed to online clients with a small debounce (~2s by default) — no full resource restart needed.
