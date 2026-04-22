# First boot checklist

A quick checklist before opening your panel for the first time.

## 1. Set your admin group

```lua
-- config.lua
Config.PermissionGroup = { 'admin' }
```

If you forget this step you will not be able to open `/jobcreator`.

## 2. Pick the gang feature

Gangs are off by default. Decide now:

- **Keep them off** → `Config.Features.gangs = false`. Skips the SQL tables,
  hides the Gangs tab. Recommended if you do not need them.
- **Turn them on** → `Config.Features.gangs = true`. Read the [`GANG_SETUP.md`](https://github.com/)
  shipped with the resource for the optional VORP core patch.

## 3. Choose your default UI providers

```lua
Config.DefaultMenuProvider = 'auto'      -- ox_lib → jo_libs → vorp → native
Config.DefaultInputProvider = 'auto'
Config.DefaultProgressProvider = 'auto'
Config.DefaultInteractionMode = 'target' -- 'target' (ox_target) or 'prompt'
```

If you let players change this, leave `Config.AllowInGamePreferences = true`.
Otherwise the values above are forced for everybody.

## 4. Configure your paycheck banking

The script can pay employees automatically every `Config.Paycheck.interval`
ms. Wire it to your banking and boss-account exports:

```lua
Config.Paycheck = {
    enabled = true,
    interval = 1000 * 60 * 30,   -- every 30 minutes
    banking = { resource = 'lo_banking', fn = 'addBankMoney' },
    bossAccount = { resource = 'lo_bossmenu', getAccountFn = 'GetAccount', removeMoneyFn = 'RemoveMoney' },
    gangAccount = { resource = 'lo_gangmenu', getAccountFn = 'GetAccount', removeMoneyFn = 'RemoveMoney' },
    governmentTypes = { 'leo', 'medic', 'gouv' },
}
```

If you do not have a banking resource yet, set `enabled = false` for now.

## 5. Pick a personal-menu key

```lua
Config.ActionMenuKey = 'F7'
```

## 6. Webhook for audit logs (optional)

```lua
Config.Logs = {
    enabled = true,
    webhook = 'https://discord.com/api/webhooks/…',
    servername = 'MyServer',
}
```

Leave `webhook = ''` to only print logs in the server console.

## 7. Start the resource and open `/jobcreator`

You should see the dashboard. If not, see [Troubleshooting](/guide/troubleshooting).
