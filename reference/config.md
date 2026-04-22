# `config.lua`

The `config.lua` file is the **boot-time defaults**. Most of these values
are persisted to the `lo_settings` SQL table on first boot and edited
live from the **Configuration serveur** tab in the admin panel.

::: warning
Once a server has booted at least once, the in-game **Server Config** tab
is the source of truth — editing `config.lua` will only affect a fresh
install. To apply a change to an existing server, use the panel.
:::

## General

| Key | Default | Purpose |
|---|---|---|
| `Config.Debug` | `true` | Verbose logs in server console. |
| `Config.Command` | `'jobcreator'` | Command to open the admin menu. |
| `Config.ActionMenuKey` | `'F7'` | Key to open the personal action menu. |
| `Config.PromptDistance` | `1.0` | Display distance for prompts. |
| `Config.Lang` | `'en'` | Locale, must match a file in `locales/<lang>.json`. |
| `Config.PermissionGroup` | `{ 'admin' }` | Groups allowed to use the creator. |
| `Config.ButtonPermissions` | `{...}` | Per-button permission overrides (empty = inherit). |
| `Config.ImageUrl` | `nui://vorp_inventory/html/img/items/%s.png` | Item image template. |

## Framework

`Config.Framework`:

- `force` — `'auto' | 'vorp' | 'redem' | 'rsg' | 'qbr' | 'rpx' | 'tpzcore' | 'frp' | 'standalone'`. Detected automatically when `'auto'`.
- `entityExports` — per-framework table of `upsertJob` / `deleteJob` exports for jobs CRUD.
- `inventory` — force a specific inventory provider (`vorp_inventory`, `ox_inventory`, `qb-inventory`, `rsg-inventory`, `core`).
- `clothing` — events / exports for clothing store + wardrobe.
- `notify` — per-framework notification event used by `NotifyClient`.

See [Frameworks](/guide/frameworks) for the full breakdown.

## UI providers

| Key | Values | Notes |
|---|---|---|
| `Config.AllowInGamePreferences` | bool | If true, admins can change providers in-game. |
| `Config.DefaultMenuProvider` | `'auto' \| 'ox_lib' \| 'vorp' \| 'jo_libs' \| 'native'` | Menu provider. |
| `Config.DefaultInputProvider` | same | Input prompts. |
| `Config.DefaultProgressProvider` | same | Progress bars. |
| `Config.DefaultInteractionMode` | `'target' \| 'prompt'` | World interactions. |

## Features

`Config.Features` toggles entire sections of the UI / behaviour:

```lua
Config.Features = {
    jobs = true, gangs = false, publicActions = true,
    itemCreator = true, customBlips = true, customPeds = true,
    staffTools = true, preferences = true,
    personalmenu = true,
}
```

Disabling `gangs = false` skips creation of the gang SQL tables and hides
the gang UI.

## Logs

```lua
Config.Logs = { enabled = true, webhook = '', servername = 'MyServer', color = 3447003 }
```

Built-in Discord webhook — leave `webhook = ''` for console-only.

## Paycheck

```lua
Config.Paycheck = {
    enabled = true,
    interval = 1000 * 60 * 30,
    log = true,
    banking = { resource = 'lo_banking', fn = 'addBankMoney' },
    bossAccount = { resource = 'lo_bossmenu', getAccountFn = 'GetAccount', removeMoneyFn = 'RemoveMoney' },
    gangAccount = { resource = 'lo_gangmenu', getAccountFn = 'GetAccount', removeMoneyFn = 'RemoveMoney' },
    governmentTypes = { 'leo', 'medic', 'gouv' },
}
```

## Keys

`Config.Keys` — vorp_lib prompt letter + RedM control hash for cancel /
complete actions. Aligns the HUD prompt with the actual key.

## Performance

```lua
Config.Performance = {
    markerRenderDistance = 30.0,
    pedRenderDistance = 50.0,
    maxRenderedPeds = 25,
    propRenderDistance = 50.0,
    maxRenderedProps = 30,
    targetRefreshInterval = 1000,
    updateDebounce = 2000,
    pedFaceOnApproach = true,
    pedFaceDistance = 3.0,
}
```

Tune for 600+ players.

## Default grades

```lua
Config.DefaultGrades = {
    ['0'] = { name = 'Recrue',  payment = 0 },
    ['1'] = { name = 'Employe', payment = 0 },
    ['2'] = { name = 'Manager', payment = 0 },
    ['3'] = { name = 'Co-Patron', payment = 0 },
    ['4'] = { name = 'Patron',  payment = 0, isboss = true },
}
```

Applied when creating a new job/gang.

## Entity types

`Config.EntityTypes` — array of `{ value, label }` shown in the entity
type combobox. Built-in: `none`, `leo`, `medic`, `gouv`, `job`, `gang`,
`craft`, `farm`, `hunt`, `fish`, `trade`.

## Interaction types

`Config.InteractionTypes` — built-in interaction types and their public
flag. See [Interaction types](/reference/interaction-types).

## Personal actions

`Config.Actions` — built-in personal actions (`handcuff`, `search`,
`revive`, `heal`, `repair`, `fine`, `escort`, `putinvehicle`, `pullout`,
`bills`, `dispatch`, `duty`). See [Hooks](/reference/hooks).

## SQL

`Config.SQL` — the `CREATE TABLE` statements applied on first boot. See
[SQL schema](/reference/sql).

## Towns / Districts / Markers / Blips / Stash blacklist

Static data tables. Edit only if you know what you are doing — the panel
does not consume them as live config (they are read once at boot).
