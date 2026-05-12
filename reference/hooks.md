# Editable hooks

The `modules/editable/` folder is where you plug your own logic into `lo_jobscreator`. Every function below is a **hook**: define it as a top-level global function in the right file, and the engine will call it at the right moment. Errors in hooks are caught — a broken hook won't crash the script.

The folder ships unencrypted on purpose. Don't edit anything else.

```
modules/editable/
├── client.lua       -- client-side hooks
├── server.lua       -- server-side hooks
├── framework.lua    -- bridge to VORP (override if you wire another core)
├── shared.lua       -- shared constants
└── templates.lua    -- job/gang templates shown in the Templates tab
```

---

## `modules/editable/client.lua`

### Interaction lifecycle

`OnBefore...` hooks can return `false` to **cancel** the action. `OnAfter...` hooks fire after success.

```lua
function OnBeforeFarm(interactionData, entityType, entityName, intId)
    if LocalPlayer.state.wanted then return false end
end

function OnAfterSell(interactionData, entityType, entityName, intId)
    TriggerServerEvent('my_xp:add', 5)
end
```

| Hook | Signature |
|---|---|
| `OnBeforeFarm` / `OnAfterFarm` | `(interactionData, entityType, entityName, intId)` |
| `OnBeforeSell` / `OnAfterSell` | same |
| `OnBeforeProcess` / `OnAfterProcess` | same |
| `OnBeforeCraft` / `OnAfterCraft` | same |
| `OnBeforeShop` | same |
| `OnBeforeDelivery` / `OnAfterDelivery` | same |
| `OnBeforeStash` | same |
| `OnDutyChanged` | `(duty, jobName)` |
| `OnPhoneOpened` | `(phoneData)` |
| `OnBeforeInteraction` / `OnAfterInteraction` | `(intType, interactionData, entityType, entityName, intId)` — generic catch-all |

### Character data overrides

Only useful if you wire a non-VORP core that exposes job / gang differently:

```lua
function GetCustomJob()       return exports.myframework:GetJob()       end
function GetCustomGrade()     return exports.myframework:GetGrade()     end
function GetCustomGang()      return exports.myframework:GetGang()      end
function GetCustomGangGrade() return exports.myframework:GetGangGrade() end
```

Return `nil` to fall back to the default behaviour.

### Native UI hooks

Only used when an admin picks the `native` provider in **Preferences**:

```lua
function NativeShowMenu(opts) ... end
function NativeShowInput(opts) ... end
function NativeShowProgressBar(opts) ... end
```

### Personal-action hooks

When a personal action declares `hook = 'xxx'`, the engine calls `OnFeature_xxx`. The third argument depends on the action's target type:

```lua
function OnFeature_handcuff(actionId, action, targetServerId) end  -- target_player
function OnFeature_repair(actionId, action, vehicleEntity)    end  -- target_vehicle
function OnFeature_selfie(actionId, action)                    end  -- self / client_event / server_event
```

See [Personal actions](/guide/actions).

### Usable-item stat hooks

Wire item effects to your HUD. Auto-detects `vorp_metabolism` / `lo_hud`; override these to use yours:

```lua
function OnUsableHunger(delta, itemName)       end
function OnUsableThirst(delta, itemName)       end
function OnUsableStress(delta, itemName)       end
function OnUsablePlayerCore(coreType, delta, itemName) end       -- 'health' | 'stamina'
function OnUsableHorseCore(mount, coreType, delta, itemName, opts) end
function OnUsableConsumed(itemName, itemData) end                 -- after all stat hooks
function OnUsableItemTrigger(itemName, mainid, itemData) end      -- "Usable but not Consumable" items
```

### Dispatch hook

Replace the built-in alert banner with your own UI:

```lua
function OnDispatchAlertReceived(alertData, helpers, ctx)
    -- ctx = { locationName, locationIcon, dispatchType }  -- 'police' | 'ems' | 'fire'
    -- helpers.takeAlert(id), helpers.clearAlert(id), helpers.gpsTo(coords), helpers.formatTimeAgo(s)
    exports.my_dispatch:CreateAlert({ title = alertData.title, coords = alertData.coords })
    return true   -- 'I handled it' → skip the default banner
end
```

Return `false` (or nothing) to also show the default banner.

### Keybinding overrides

```lua
function RegisterPersonalMenuKey(openFn)
    Config.ActionMenuKey = 'INSERT'
    return false  -- false → default wiring picks up the new key; true → you took over
end

function RegisterDispatchMenuKey(openFn)
    -- same idea
end
```

---

## `modules/editable/server.lua`

### Interaction lifecycle

```lua
function OnBeforeUseInteraction(src, entityType, entityName, intId, intType)
    return true  -- return false to deny
end
function OnAfterUseInteraction(src, entityType, entityName, intId, intType) end
```

### Job / gang / interaction lifecycle

```lua
function OnJobCreated(jobName, jobLabel, jobData) end
function OnJobDeleted(jobName) end
function OnGangCreated(gangName, gangLabel, gangData) end
function OnGangDeleted(gangName) end
function OnInteractionCreated(entityType, entityName, intType, intId, data) end
function OnInteractionDeleted(entityType, entityName, intId) end
```

### Player lifecycle

```lua
function OnPlayerReady(src, job, gang) end    -- character selected, data loaded
function OnPlayerDropped(src) end
```

### Salary

```lua
function OnSalaryPaid(src, entityType, entityName, grade, amount)
    -- amount may be returned to override (return a number)
end
```

### Permission override

```lua
function CustomPermissionCheck(src)
    if exports.my_acl:HasRole(src, 'jobs_manager') then return true end
    return nil   -- nil → fall through to the default group check
end
```

### Clothing

Called for `clothing_store` / `clothing_wardrobe` interactions. Return `true` to indicate you handled it:

```lua
function CustomOpenClothingStore(src) end
function CustomOpenWardrobe(src) end
```

### Personal-action hooks (server)

```lua
function OnFeature_revive(src, ...) end
function OnFeature_my_action(src, ...) end
```

### Usable items (server)

```lua
function OnUsableItemConsume(src, itemName, mainid)        end  -- before consumption
function OnUsableItemMetadata(src, mainid, metadata)        end  -- adjust per-stack metadata
function OnUsableItemTriggerServer(src, itemName, mainid)   end  -- non-consumable trigger
```

---

## `modules/editable/framework.lua`

The VORP bridge. Every `Framework_*` function has an implementation for VORP and a fallback for standalone mode. Each function is short and documented inline — read the file.

You only touch this if you're wiring a non-VORP core (not officially supported).

Key entry points:

| Function | Purpose |
|---|---|
| `Framework_GetJob(src)` / `Framework_GetGang(src)` | Read the character's job / gang |
| `Framework_SetJob(src, job)` / `Framework_SetGang(src, gang)` | Write them |
| `Framework_AddCurrency(src, type, amount)` | 0 = dollars, 1 = gold |
| `Framework_AddInventoryItem(src, itemName, amount)` | Add to inventory |
| `Framework_RegisterUsableItem(itemName, cb)` | Register an item as usable |
| `Framework_UpsertEntity(entityType, name, label, data)` | Push a job / gang into the framework's own tables (for compatibility resources) |
| `Framework_NotifyClient(src, type, msg)` | Send a notification |

Full list in the file itself.

---

## `modules/editable/templates.lua`

Static table of pre-built job / gang setups shown in the **Templates** tab. Add your own:

```lua
JobTemplates['my_template'] = {
    name = 'my_template',
    labelKey = 'template.my_template.name',
    type = 'leo',
    grades = {
        { id = 0, nameKey = 'template.my_template.grade.0', payment = 50 },
        { id = 1, nameKey = 'template.my_template.grade.1', payment = 80 },
        { id = 2, nameKey = 'template.my_template.grade.2', payment = 120, isboss = true },
    },
    interactions = { ... },  -- optional pre-built interactions
}
```

Don't forget the matching keys in your locale files.

---

## `modules/editable/shared.lua`

Small shared constants both client and server read. Not a hook file — just open it if you want to see the framework detection result (`FrameworkBridge.name`, `.resource`, …).
