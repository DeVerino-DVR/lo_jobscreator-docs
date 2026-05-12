# Server configuration

Every value you can also edit via `config.lua`, but live, without restarting. Changes are written to `lo_settings` and broadcast to all clients.

## Sections

### Paycheck

| Key | What |
|---|---|
| Enabled | Master on/off. |
| Interval | Time between payments (minutes). |
| Log each payment | Write each paycheck to the audit log. |
| Government job types | Types paid by the state automatically (no business account needed). |
| Boss account integration | Resource name + functions to read / debit a business account. |
| Gang account integration | Same, for gangs. |
| Banking integration | Route money into a banking resource instead of paying cash. |

### Permissions

Per-tab permission groups. Empty → inherits `Config.PermissionGroup`. See [Permissions](/guide/permissions).

### Features

Toggle whole tabs on/off:

- Jobs, Gangs, Public actions, Items, Custom blips / peds, Custom vehicles / horses, Staff tools, Preferences, Personal menu.

Turning a feature off hides the tab from everyone, regardless of permissions.

### Entity types

Edit the list of job types (`leo`, `medic`, `fire`, `gouv`, …). Used as a dropdown when creating jobs; drives dispatch routing.

### Interaction types

The catalogue of available interaction types. Built-ins are read-only; types registered via `RegisterInteractionType` (from another resource) show up here too.

### Personal actions

Manage entries of the per-player action menu. Each action declares a target type (self / other player / vehicle / event) and an optional `hook` name. See [Personal actions](/guide/actions).

### Logging

- Console verbosity (`LogLevel`).
- Discord webhook URL + name + embed color.

### Performance

The live-tunable subset of `Config.Performance`. See [Performance](/guide/performance).

### Localization & UI

- Default server language (`Config.Lang`).
- Whether players can change UI providers themselves.
- Default menu / input / progress / interaction providers.

## Live vs file

When you edit something here, the panel writes to `lo_settings`. On next boot, the script merges `config.lua` defaults with the SQL overlay — the overlay wins.

To wipe the overlay (go back to whatever's in `config.lua`):

```sql
DELETE FROM lo_settings;
```
