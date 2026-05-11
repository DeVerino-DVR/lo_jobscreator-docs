# lo_jobscreator — Documentation

📖 **Hosted docs (always up to date): https://deverino-dvr.github.io/lo_jobscreator-docs/**

> The hosted version has a search bar, a sidebar, copy buttons on every code block and is the recommended place to read this. The file you're reading is the offline mirror.

In-game job, gang & interaction creator for RedM. Build everything from an admin panel: jobs, grades, salaries, gangs, public points, custom items, blips, peds, props, markers, garages, stables, deliveries, phones, stashes, shops, crafts, etc. Works on **VORP, RSG, QBR, QR, RPX, RedEM, RedEM:RP, tpz_core, frp_core and standalone** — no framework lock-in.

---

## 1. Installation

1. Drop the `lo_jobscreator` folder in your `resources`.
2. Add to `server.cfg`:
   ```cfg
   ensure oxmysql
   ensure lo_jobscreator
   ```
3. Start the server once — the SQL tables are created automatically (`lo_jobs`, `lo_gangs`, `lo_job_interactions`, `lo_gang_interactions`, `lo_public_interactions`, `lo_items`, `lo_item_usables`, `lo_settings`, `lo_audit`).
4. Type `/jobcreator` in-game (command is configurable in `config.lua`) to open the admin panel. You need an admin group — see `Config.PermissionGroup` in `config.lua`.

### Optional resources (auto-detected, never required)
`ox_lib`, `vorp_lib`, `vorp_menu`, `vorp_inventory`, `ox_inventory`, `jo_libs`, `ox_target`, your framework core. The script picks what is installed and falls back to a built-in implementation otherwise.

### What you can edit
Only **two things** are meant to be edited by hand:
- **`config.lua`** — initial defaults (command name, language, permission groups, framework forcing, towns/districts, etc.). Most of it is also editable live in the panel.
- **`modules/editable/`** — `client.lua`, `server.lua`, `framework.lua`, `templates.lua`, `shared.lua`. This is where you plug your own scripts. These files ship uncrypted on purpose.

Everything else is the engine. Don't edit it.

---

## 2. How it works (overview)

- **Jobs / Gangs** live in SQL and are mirrored into your framework's job system at boot (and on every change). For frameworks that store jobs in memory (RSG/QBR/QR), the script calls their `CreateJob` / `DeleteJob` exports.
- **Interactions** are points in the world attached to a job, a gang, or "public" (everyone). Each interaction has a *type* (`stash`, `shop`, `farm`, `sell`, `process`, `craft`, `duty`, `bossaction`, `vehicle_garage`, `stable`, `delivery_point`, `phone`, `teleport`, `clothing_store`, `clothing_wardrobe`, …) plus optional visuals: a prompt, an `ox_target` zone, a blip, a ped, a prop, a marker.
- **Items** are created from the panel (name, label, weight, limit, usable/consumable, image). For `vorp_inventory` / `ox_inventory` they're registered automatically. Usable items get a configurable effect (hunger/thirst/stress/health, animation, screen FX, drunk gait, …).
- **Custom blips / peds / props / markers** can be placed anywhere on the map, independent of jobs.
- **Audit log** records every panel change with the admin who made it.

---

## 3. The admin panel

`/jobcreator` (default key/command, change with `Config.Command` and `Config.ActionMenuKey`).

| Tab | What it does |
|---|---|
| Dashboard | Counters, recent activity, online members per job |
| Jobs / Gangs | Create/edit jobs & gangs: label, type (`leo`, `medic`, `fire`, `gouv`, …), grades (name, salary, "is boss"), regions covered (for dispatch filtering), blip, allowed personal actions, interactions list |
| Public actions | World points everyone can use (mailboxes, payphones, etc.) |
| Item creator | Create items, set weight/limit/usable/consumable, configure usable effects, download the item image into your inventory's image folder |
| Custom blips / peds / props / markers | Place visuals anywhere |
| Audit | Full change history |
| Templates | Pre-made job/gang setups you can import in one click |
| Backup / Restore | Export/import the whole config as JSON |
| Server config | Paycheck interval, logs, default grades, feature toggles, permission groups per panel button, entity/interaction type labels, personal actions |
| Preferences | Per-admin: language, menu/input/progress-bar provider, panel size/opacity, placement mode (raycast vs 3D gizmo), notifications |

### Placement modes
When you place a ped/prop/blip/marker the panel asks where to put it:
- **Raycast** (default): point with the mouse, scroll to rotate, left-click to confirm.
- **Gizmo**: the entity spawns in front of you and a 3D gizmo lets you drag/rotate it precisely (`[W]` translate, `[R]` rotate, `[BACKSPACE]` confirm). Requires `jo_libs`.

Set the default in `config.lua` → `Config.PlacementMode = 'raycast'` or `'gizmo'`. Players with the *preferences* permission can override it in the panel.

---

## 4. Interaction types

Each type has a config form in the panel and a runtime behaviour:

| Type | Behaviour |
|---|---|
| `stash` | Opens a personal/shared stash (vorp_inventory / ox_inventory) |
| `shop` | Buy items (price in $ and/or gold), optional job/grade restriction |
| `farm` | Play an animation for X seconds → receive a random amount of an item (multiple yields possible, with a selection menu) |
| `sell` | Sell items for $/gold, per-item price, optional max per cycle |
| `process` | Convert input items into output items (with progress bar) |
| `craft` | Pick a recipe → consume ingredients → get the result |
| `duty` | Toggle on/off duty for the player's job |
| `bossaction` | Boss-only menu (manage employees, etc.) — only shows if the player's grade has "is boss" |
| `vehicle_garage` | Spawn/store one of the configured vehicles at the point |
| `stable` | Spawn/store one of the configured horses at the point |
| `delivery_point` | Start a delivery mission (drive to destination(s), get paid) |
| `phone` | A phone with contacts: call another number; the recipient's phone rings and they can pick up or reject |
| `teleport` | Teleport the player to a destination |
| `clothing_store` / `clothing_wardrobe` | Fire your clothing resource's open events (configurable in `config.lua` → `Config.Framework.clothing`, or override `CustomOpenClothingStore` / `CustomOpenWardrobe` in `modules/editable/server.lua`) |
| `witness` (dispatch alert) | Sends an alert to LEO/medic/fire jobs (region-filtered) — see §6 |

You can also register your **own interaction types** at runtime — see §5.4.

---

## 5. Exports

> **Reminder for non-devs:** an *export* is a function another resource (or your own scripts) can call. In Lua you call it like this:
> ```lua
> local result = exports.lo_jobscreator:NameOfTheExport(arguments)
> ```
> Use it inside your own resource's Lua files (server scripts call server exports, client scripts call client exports).

### 5.1 Job / Gang info (shared — works client AND server)

#### `getJobIsBoss(jobName, grade)` → `boolean`
Is this grade of this job a "boss" grade (the one with "is boss" ticked in the panel)?
```lua
-- Server example: only let the boss open a management menu
local job   = exports.vorp_core:getUser(source).getUsedCharacter.job        -- (your framework's way of reading the job)
local grade = exports.vorp_core:getUser(source).getUsedCharacter.jobGrade
if exports.lo_jobscreator:getJobIsBoss(job, grade) then
    -- open the boss menu
else
    TriggerClientEvent('chat:addMessage', source, { args = { 'You are not the boss.' } })
end
```

#### `getGangIsBoss(gangName, grade)` → `boolean`
Same thing for gangs.

#### `getJobSalary(jobName, grade)` → `number`
The salary configured for that grade.
```lua
local pay = exports.lo_jobscreator:getJobSalary('police', 2)
print('A police grade 2 earns $' .. pay .. ' per paycheck')
```

#### `getGangSalary(gangName, grade)` → `number`
Same for gangs.

#### `GetGradeSalary(kind, name, grade)` → `number`
Generic version. `kind` is `'job'` or `'gang'`.
```lua
local pay = exports.lo_jobscreator:GetGradeSalary('gang', 'lemoyne_raiders', 0)
```

#### `IsGradeBoss(kind, name, grade)` → `boolean`
Generic version of `getJobIsBoss` / `getGangIsBoss`.

#### `GetJobLabel(jobName)` → `string`  /  `GetGangLabel(gangName)` → `string`
The display label (falls back to the technical name if unknown).
```lua
print(exports.lo_jobscreator:GetJobLabel('police'))  --> "Forces de l'ordre"
```

#### `GetCreatedJobs()` → `table`  /  `GetCreatedGangs()` → `table`
The full jobs/gangs table (server side; available client side only after the data is synced). Each entry is `{ name, label, data = { type, grades = {...}, blip, actions, regions, ... } }`.

#### `GetJobInteractions(jobName)` / `GetGangInteractions(gangName)` / `GetPublicInteractions()` → `table`
The list of interactions for that entity.

### 5.2 Job-type counters (online players)

A *job type* is the category (`leo`, `medic`, `fire`, `gouv`, …) set on a job. These count **online players** currently in any job of that type.

#### `GetCountByType(jobType)` → `number`  *(client + server)*
```lua
-- "How many cops are online?" — useful for robbery scripts
local cops = exports.lo_jobscreator:GetCountByType('leo')
if cops < 2 then
    -- not enough cops, cancel the bank robbery
end
```

#### `GetAllJobTypeCounts()` → `table<string, number>`  *(client + server)*
```lua
local counts = exports.lo_jobscreator:GetAllJobTypeCounts()
-- counts.leo, counts.medic, ...
```

#### `GetPlayersByType(jobType)` → `number[]` (server ids)  *(client + server)*
```lua
-- Server: send a message to every online medic
for _, src in ipairs(exports.lo_jobscreator:GetPlayersByType('medic')) do
    TriggerClientEvent('chat:addMessage', src, { args = { 'EMS', 'Patient down at the hospital.' } })
end
```

#### `GetJobTypes()` → `string[]`  *(server)*
Every job type currently in use.

### 5.3 Duty (server)

A player is "on duty" or not for their current job. The state is `LocalPlayer.state['is<JobName>Duty']` on the client and tracked server-side.

| Export | Returns | What |
|---|---|---|
| `IsDutyActive(src, jobName)` | `boolean` | Is this player on duty for that job? |
| `GetDuty(src, jobName)` | `boolean` | Same as above |
| `SetDuty(src, onDuty, jobName)` | — | Force on/off duty (note: `onDuty` is the 2nd arg) |
| `ToggleDuty(src, jobName)` | `boolean` (new state) | Toggle |
| `GetDutyList()` | `table<src, table<job, bool>>` | Every player's duty state |
| `RemoveDuty(src)` | — | Clear the player's duty (done automatically on disconnect) |

```lua
-- Server: a job script that only works on duty
RegisterCommand('police_action', function(source)
    if not exports.lo_jobscreator:IsDutyActive(source, 'police') then
        return -- not on duty, ignore
    end
    -- do the action
end)
```

### 5.4 Custom interaction types (server)

Add your own interaction type so it shows up in the panel and runs your code.

#### `RegisterInteractionType(name, definition)`
```lua
-- in your own server script
exports.lo_jobscreator:RegisterInteractionType('my_minigame', {
    label = 'My Minigame',         -- shown in the panel dropdown
    icon = 'fa-solid fa-dice',     -- ox_lib menu icon (optional)
    -- the panel will let admins place a point with this type;
    -- when a player uses it, your handler fires:
    serverHandler = function(src, entityType, entityName, intId, data)
        TriggerClientEvent('my_resource:startMinigame', src, data)
    end,
})
```
#### `UnregisterInteractionType(name)` — remove it.
#### `GetExternalInteractionTypes()` → `table` — list everything you registered.

### 5.5 Dispatch / alerts (client)

#### `dispatchAlert(coords, type [, extra])`  — or the legacy table form
Fires a dispatch alert. The server routes it to every online player whose job is in `jobsToAlert` (or, with no list, to `leo`/`medic` jobs by default), and whose job covers the alert's region (region coverage is set per-job in the panel).
```lua
-- New form
exports.lo_jobscreator:dispatchAlert(GetEntityCoords(PlayerPedId()), 'robbery', {
    title = 'Bank robbery',
    message = 'Suspect armed, fleeing north.',
    jobsToAlert = { 'police', 'sheriff' },   -- optional; omit for default leo/medic
})

-- Legacy form (kept for old scripts)
exports.lo_jobscreator:dispatchAlert({
    coords = vector3(...),
    type = 'theft',
    title = 'Store theft',
    message = '...',
    jobs = { 'police' },
})
```

#### `OpenDispatchMenu()` — open the built-in dispatch menu (active alerts list).
#### `GetActiveAlerts()` / `GetAlertHistory()` → `table` — read the alerts.

### 5.6 Personal actions menu (client)

#### `OpenPersonalMenu()` — opens the per-player action menu (F7 by default).

### 5.7 Usable-item effects (client)

Used by the item system, but you can call them too (e.g. a custom drug script):
| Export | What |
|---|---|
| `UsableToggleEffect(effectId, duration, progressive)` | Play/extend a screen FX (or a preset) |
| `UsableApplyPreset(presetName, duration)` | Apply a `Config.UsablePresets` preset |
| `UsableSetEffectStrength(effectName, strength)` | 0.0–1.0 |
| `UsableStopAllEffects()` | Clear everything |
| `UsableAddDrunkEffect(level)` | 0 = sober, higher = drunker |
| `UsableApplyDrunkGait(durationMs, strength)` | Wobbly walk |
| `UsableStartCamShake(intensity)` / `UsableStopCamShake()` | Camera shake |

---

## 6. Adding your own scripts (the `modules/editable/` files)

This is the only place you write code. Every function below is a **hook** — it already exists with an empty body; you fill it in (or delete it to keep the default). Errors in hooks are caught, so a broken hook never crashes the script.

### 6.1 `modules/editable/client.lua` — client hooks

**Interaction hooks** — fire around every interaction. Return `false` from a `OnBefore...` to cancel it.
```lua
function OnBeforeFarm(interactionData, entityType, entityName, intId)
    -- example: block farming if the player is wanted
    if LocalPlayer.state.wanted then return false end
    return true
end

function OnAfterSell(interactionData, entityType, entityName, intId)
    -- example: give XP after selling
    TriggerServerEvent('my_xp:add', 5)
end
```
Available: `OnBeforeFarm`/`OnAfterFarm`, `OnBeforeSell`/`OnAfterSell`, `OnBeforeProcess`/`OnAfterProcess`, `OnBeforeCraft`/`OnAfterCraft`, `OnBeforeShop`, `OnBeforeDelivery`/`OnAfterDelivery`, `OnBeforeStash`, `OnDutyChanged(duty, jobName)`, `OnPhoneOpened(phoneData)`, `OnBeforeInteraction(intType, ...)`/`OnAfterInteraction(intType, ...)`.

**Character data overrides** — only if your framework stores the job/gang differently than the auto-detected way:
```lua
function GetCustomJob()       return exports.myframework:GetJob()       end
function GetCustomGrade()     return exports.myframework:GetGrade()     end
function GetCustomGang()      return exports.myframework:GetGang()      end
function GetCustomGangGrade() return exports.myframework:GetGangGrade() end
```

**Native UI hooks** — only used when a player picks the `native` provider in preferences. Plug your own menu / input / progress bar: `NativeShowMenu(opts)`, `NativeShowInput(opts)`, `NativeShowProgressBar(opts)`.

**Personal-action hooks** — each personal action you create in the panel with a `hook = 'xxx'` calls `OnFeature_xxx` here:
```lua
function OnFeature_handcuff(actionId, action, targetServerId) ... end
function OnFeature_revive(actionId, action, targetServerId) ... end
function OnFeature_repair(actionId, action, vehicleEntity) ... end
-- target_player actions get (actionId, action, targetServerId)
-- target_vehicle actions get (actionId, action, vehicleEntity)
-- self / client_event / server_event actions get (actionId, action)
```

**Usable-item stat hooks** — wire item effects to your HUD (auto-detects rsg-hud / qbr-hud / vorp_metabolism / lo_hud, override if yours is different):
```lua
function OnUsableHunger(delta, itemName)  exports.my_hud:AddHunger(delta) end
function OnUsableThirst(delta, itemName)  exports.my_hud:AddThirst(delta) end
function OnUsableStress(delta, itemName)  exports.my_hud:AddStress(delta) end
function OnUsablePlayerCore(coreType, delta, itemName) ... end   -- 'health' | 'stamina'
function OnUsableHorseCore(mount, coreType, delta, itemName, opts) ... end
function OnUsableConsumed(itemName, itemData) ... end            -- after all stat hooks
function OnUsableItemTrigger(itemName, mainid, itemData) ... end -- for "Usable but not Consumable" items (notepads, radios, lockpicks, …)
```

**Dispatch hook** — replace the default alert notification (e.g. to use your own dispatch resource):
```lua
function OnDispatchAlertReceived(alertData, helpers, ctx)
    -- ctx = { locationName, locationIcon, dispatchType }  (dispatchType is 'police'/'ems'/'fire')
    -- helpers.takeAlert(id), helpers.clearAlert(id), helpers.gpsTo(coords), helpers.formatTimeAgo(s), ...
    exports.my_dispatch:CreateAlert({ title = alertData.title, coords = alertData.coords })
    return true   -- return false (or nothing) to keep the default banner
end
```

**Key-binding overrides** — change the personal-menu key without touching the engine:
```lua
function RegisterPersonalMenuKey(openFn)
    Config.ActionMenuKey = 'INSERT'
    return false  -- false = let the default wiring pick up the new key; true = you took over
end
```

### 6.2 `modules/editable/server.lua` — server hooks

```lua
function OnBeforeUseInteraction(src, entityType, entityName, intId, intType) return true end
function OnAfterUseInteraction(src, entityType, entityName, intId, intType) end
function OnJobCreated(jobName, jobLabel, jobData) end
function OnJobDeleted(jobName) end
function OnGangCreated(gangName, gangLabel, gangData) end
function OnGangDeleted(gangName) end
function OnInteractionCreated(entityType, entityName, intType, intId, data) end
function OnInteractionDeleted(entityType, entityName, intId) end
function OnSalaryPaid(src, entityType, entityName, grade, amount) end   -- e.g. log paychecks
function OnPlayerReady(src, job, gang) end
function OnPlayerDropped(src) end
function CustomOpenClothingStore(src) end   -- called for clothing_store interactions
function CustomOpenWardrobe(src) end        -- called for clothing_wardrobe interactions
function OnUsableItemConsume(src, itemName, mainid) end
function OnUsableItemMetadata(src, mainid, metadata) end   -- adjust per-stack metadata (e.g. currentUses)
function OnUsableItemTriggerServer(src, itemName, mainid) end
```

### 6.3 `modules/editable/framework.lua` — multi-framework bridge

Already filled in for VORP, RSG, QBR, QR, RPX, RedEM, RedEM:RP, tpz_core, frp_core. Only touch it if you use a custom core or want different behaviour. Every function is `Framework_*`: `Framework_GetJob(src)`, `Framework_AddCurrency(src, 'money'|'gold', amount)`, `Framework_AddInventoryItem(src, item, amount)`, `Framework_RegisterUsableItem(item, cb)`, `Framework_UpsertEntity(...)`, `Framework_NotifyClient(src, type, msg)`, etc. — read the file, each one says what it does.

Force a specific core in `config.lua`:
```lua
Config.Framework = { force = 'vorp' }   -- 'auto' | 'vorp' | 'rsg' | 'qbr' | 'qr' | 'rpx' | 'redem' | 'redem_2023' | 'tpzcore' | 'frp' | 'standalone'
```

### 6.4 `modules/editable/templates.lua` / `shared.lua`
- `templates.lua` — the one-click job/gang setups shown in the Templates tab. Add your own.
- `shared.lua` — small shared constants both client and server read.

### 6.5 Config-driven feature hooks
When you add a key in the panel's *Server config → Features*, the key becomes an extension point: define a global `OnFeature_<key>` in `modules/editable/client.lua` and it fires when the matching action runs.

---

## 7. Framework compatibility

Auto-detected at boot from started resources. Jobs/gangs are stored in this script's SQL and pushed into your core. Frameworks that keep jobs in memory (RSG/QBR/QR/tpz/frp) get their `CreateJob`/`DeleteJob` exports called. Inventory provider is auto-picked: `vorp_inventory` → `ox_inventory` → core fallback (override with `Config.Framework.inventory`).

---

## 8. FAQ

**The panel won't open.** Your account isn't in `Config.PermissionGroup`. Add your admin group there (or use the per-button permissions in *Server config*).

**An interaction has no prompt / no target.** Check the player's *Preferences → interaction mode* (`prompt` vs `target`). `target` mode needs `ox_target` started.

**Item image upload says "no such file".** On RedM, writing across resources can fail when the path contains `[brackets]`. Set the absolute path in `config.lua` → `Config.ItemImagePath = 'C:/.../resources/[inventory]/vorp_inventory/html/img/items/'` (must end with `/`).

**Paychecks don't drop.** Players must be **on duty** (use a `duty` interaction). Interval is in *Server config → Paycheck*.

**A horse/vehicle won't spawn ("model load failed").** The model name is wrong for your build. Check it against `data/vehlist.lua`.

**Custom ped vanishes.** Some RDR2 models are incompatible with RedM's local ped pool — the panel flags them as "broken" automatically. Pick another model.

**Two of my custom peds appeared.** Don't spawn peds yourself in another resource at the same coords with `IsNetworked = true`; this script already handles them locally on each client.

---

## 9. Support

Bug reports / questions: open an issue on the GitHub repo. Include your framework, RedM artifact build, and the F8 / server console output.
