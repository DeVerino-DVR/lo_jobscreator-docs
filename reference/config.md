# `config.lua`

Initial defaults. Most of these are also editable live in the panel (under **Server config**); whatever the panel saves wins on next boot, via the `lo_settings` overlay.

This page lists what's in the file. Comments in the file itself describe each key in more detail.

## General

| Key | What |
|---|---|
| `Config.Debug` | Verbose console logging. |
| `Config.LogLevel` | `'trace'` \| `'debug'` \| `'info'` \| `'warn'` \| `'error'` \| `'off'`. |
| `Config.VersionCheck` | `{ enabled, repo, branch, updateUrl }` — checks GitHub for newer versions on boot. |
| `Config.Command` | Chat command to open the panel. Default `'jobcreator'`. |
| `Config.ActionMenuKey` | Key for the personal-action menu (the one referenced in your KeyMapping). |
| `Config.Lang` | Default server language (`'en'`, `'fr'`, …). |
| `Config.PermissionGroup` | Group(s) allowed to open the panel. String or table. |
| `Config.ButtonPermissions` | Per-tab permissions (empty = inherit `PermissionGroup`). See [Permissions](/guide/permissions). |
| `Config.ImageUrl` | Template URL for item images. |

## Placement

| Key | What |
|---|---|
| `Config.PlacementMode` | `'raycast'` (default) or `'gizmo'` (requires `jo_libs`). |

## Framework

| Key | What |
|---|---|
| `Config.Framework.force` | `'auto'` \| `'vorp'` \| `'standalone'`. Override the runtime detection. |
| `Config.Framework.entityExports` | Optional: route job / gang upsert / delete to a third-party resource. |
| `Config.Framework.clothing` | Events fired by `clothing_store` / `clothing_wardrobe` interactions. |
| `Config.Framework.notify` | Optional notification event override. |

## UI providers

| Key | What |
|---|---|
| `Config.AllowInGamePreferences` | Let non-admin players change their own providers / language. |
| `Config.DefaultMenuProvider` | `'auto'` \| `'ox_lib'` \| `'vorp'` \| `'jo_libs'` \| `'native'`. |
| `Config.DefaultInputProvider` | Same set. |
| `Config.DefaultProgressProvider` | Same set. |
| `Config.DefaultInteractionMode` | `'target'` (ox_target) or `'prompt'` (floating prompts). |

## Features (tab toggles)

`Config.Features` — set any of these to `false` to hide the tab entirely:

`jobs`, `gangs`, `publicActions`, `itemCreator`, `customBlips`, `customPeds`, `customVehicles`, `customHorses`, `staffTools`, `preferences`, `personalmenu`.

## Logging (Discord)

| Key | What |
|---|---|
| `Config.Logs.enabled` | Mirror audit log to Discord. |
| `Config.Logs.webhook` | Webhook URL. |
| `Config.Logs.servername` | Embed `author.name`. |
| `Config.Logs.color` | Embed color. |

## Paycheck

| Key | What |
|---|---|
| `Config.Paycheck.enabled` | Master on/off. |
| `Config.Paycheck.interval` | ms between payments. |
| `Config.Paycheck.log` | Log every paycheck to audit + Discord. |
| `Config.Paycheck.banking` | `{ enabled, resource, fn }` to route money into a banking resource. |
| `Config.Paycheck.bossAccount` | `{ resource, getAccountFn, removeMoneyFn }` — read / debit a job's business account. |
| `Config.Paycheck.gangAccount` | Same, for gangs. |
| `Config.Paycheck.governmentTypes` | Job types paid by the state (no account check). |

## Performance

`Config.Performance`:

- `markerRenderDistance` — meters
- `pedRenderDistance`, `maxRenderedPeds`
- `propRenderDistance`, `maxRenderedProps`
- `targetRefreshInterval` — ms, `ox_target` rescan
- `connectedPlayerRefreshInterval` — ms, fallback job re-read
- `updateDebounce` — ms, panel → clients sync debounce
- `pedFaceOnApproach`, `pedFaceDistance`

See [Performance](/guide/performance) for recommended values.

## Defaults

| Key | What |
|---|---|
| `Config.DefaultGrades` | Auto-created grades for a new job (`{ '0' = {...}, '1' = {...}, … }`). |
| `Config.EntityTypes` | Available job categories (`leo`, `medic`, `fire`, `gouv`, …). |
| `Config.InteractionTypes` | The built-in interaction types' metadata (`label`, `icon`, `isPublic`). |
| `Config.Actions` | Default personal-action templates. |

## Towns & regions

- `Config.Towns` — list of towns (`name`, `city`, `region`, `icon`).
- `Config.Districts` — list of districts (same shape).
- `Config.JobRegions` — defaults: which regions a known job covers (loaded into new jobs on creation).

## Catalogues

- `Config.AvailableMarkers` — the 3D markers admins can pick from.
- `Config.PopularBlips` — curated blip list for the blip picker.
- `Config.BlackListedStorageItems` — items that can't be put in a stash.

## Item images

| Key | What |
|---|---|
| `Config.ItemImagePath` | Absolute path to `vorp_inventory/html/img/items/`. Required if your VORP install is under a `[brackets]` folder and image uploads fail. |

## Keys

`Config.Keys` and `Config.UsableKeys` map prompt labels and game controls used by various interactions. The exact prompt labels are localized; the controls are RedM control hashes.
