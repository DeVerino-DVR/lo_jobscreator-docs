# Reading data at runtime

Once an admin has saved values in your `uiSections`, you need to read them
from your own runtime.

## Server side

Read directly from the core's caches. `CreatedJobs` and `CreatedGangs` are
shared globals loaded by `lo_jobscreator` on `MySQL.ready`:

```lua
local job = CreatedJobs and CreatedJobs['doctor']
if job and job.medic_settings then
    local cfg = job.medic_settings
    if cfg.autoGreet then
        TriggerClientEvent('your_ext:greet', source)
    end
end
```

::: warning Storage layout
The core stores `data` flat on the job object: every section id you
declared becomes a sibling key under `CreatedJobs[name]`. There is no
`entity.data` nesting at runtime.
:::

## Listening for changes

If the admin updates the section while a player is online, you may want to
react immediately. Listen to:

```lua
RegisterNetEvent('lo_jobscreator:server:EntityUpdated', function(entityType, name, newData)
    -- entityType: 'job' | 'gang' | 'public'
    -- name: entity name
    -- newData: the updated data table
    if newData.medic_settings and newData.medic_settings.autoGreet then
        ...
    end
end)
```

(This event is part of the public contract — see [Public contract](/extensions/contract).)

## Client side

The core does not expose a helper to fetch arbitrary entity data on the
client — keeping per-extension data flow explicit makes profiling easier
and avoids leaking unrelated fields.

Recommended pattern:

```lua
-- your_ext server.lua
RegisterNetEvent('your_ext:requestMedicConfig', function()
    local src = source
    local job = CreatedJobs[GetCharacter(src).job]
    TriggerClientEvent('your_ext:medicConfig', src, job and job.medic_settings or {})
end)
```

```lua
-- your_ext client.lua
RegisterNetEvent('your_ext:medicConfig', function(cfg)
    autoGreet = cfg.autoGreet
end)
TriggerServerEvent('your_ext:requestMedicConfig')
```

## Default values

Always handle the case where the section has not been filled yet:

```lua
local cfg = (job and job.medic_settings) or {}
local maxBandages = cfg.maxBandages or 5
```

The `default` field in your `uiSections` schema is **only used by the
panel** — it is not applied automatically when the value is missing in the
DB. Read defensively.
