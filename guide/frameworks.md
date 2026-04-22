# Frameworks

The script ships with a multi-framework bridge. It will auto-detect the
core based on the resources currently started — no configuration required
in 99% of cases.

## Supported frameworks

| Key | Core resource | Job CRUD export | Notes |
|---|---|---|---|
| `vorp` | `vorp_core` | — | Jobs/gangs are stored in our own `lo_jobs`/`lo_gangs` tables. VORP itself has no native gang concept. |
| `rsg` | `rsg-core` | `CreateJob` / `DeleteJob` | RSG keeps jobs in memory, so we mirror via the core's exports. |
| `rsg_v2` | `rsg-core` | `CreateJob` / `DeleteJob` | Same as `rsg` with the v2 core layout. |
| `qbr` | `qbr-core` | `CreateJob` / `DeleteJob` | |
| `qr` | `qr-core` | `CreateJob` / `DeleteJob` | |
| `rpx` | `rpx-core` | — | |
| `redem` | `redem` | — | |
| `redem_2023` | `redem_roleplay` | — | |
| `tpzcore` | `tpz_core` | `CreateJob` / `DeleteJob` | |
| `frp` | `frp_core` | `CreateJob` / `DeleteJob` | |
| `standalone` | none | — | Use this if you do not run any of the above. |

## Forcing a specific framework

```lua
-- config.lua
Config.Framework = {
    force = 'vorp', -- 'auto' (default) | 'vorp' | 'rsg' | 'rsg_v2' | …
}
```

Set `force` to anything other than `'auto'` to skip the detection step.

## Inventory provider

```lua
Config.Framework.inventory = nil
-- nil           = auto-detect (vorp_inventory → ox_inventory → core fallbacks)
-- 'vorp_inventory'
-- 'ox_inventory'
-- 'rpx-inventory'
-- 'qb-inventory'
-- 'rsg-inventory'
-- 'core'
```

## Notification provider

Each framework's native notification event is wired up by default:

```lua
Config.Framework.notify = {
    vorp       = 'vorp:TipBottom',
    rsg        = 'RSGCore:Notify',
    rsg_v2     = 'RSGCore:Notify',
    qbr        = 'QBCore:Notify',
    qr         = 'QBCore:Notify',
    rpx        = 'rpx:notify',
    redem      = 'redemrp_notification:start',
    redem_2023 = 'redemrp_notification:start',
    tpzcore    = 'ox_lib:notify',
    frp        = 'ox_lib:notify',
    standalone = 'ox_lib:notify',
}
```

If your server uses `ox_lib:notify` everywhere, point every line to it.

## Clothing integration

```lua
Config.Framework.clothing = {
    openStore    = 'jo_clothingstore:openStore',
    openWardrobe = 'jo_clothingstore:openWardrobe',
    storeArgs    = { useOutfitMenu = true, needInstance = false },
    wardrobeArg  = false,
    preferExport = true,
    exportResource = 'jo_clothingstore',
}
```

For full programmatic control, override `CustomOpenClothingStore` and
`CustomOpenWardrobe` in `modules/editable/server.lua` instead.
