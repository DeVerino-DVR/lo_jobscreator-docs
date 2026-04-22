# Exports

The complete export surface of `lo_jobscreator`. All exports are on the
resource `lo_jobscreator`:

```lua
exports.lo_jobscreator:<ExportName>(...)
```

Exports are grouped below by domain.

## Extension API

::: tip
See the dedicated [Extensions API](/extensions/overview) section for the
full guide.
:::

### `RegisterExtension(id, config)` — server

Register or replace an extension. Idempotent. Auto-removed on
`onResourceStop`. Returns `true` on success, `false, error` on failure.

```lua
exports.lo_jobscreator:RegisterExtension('your_ext', { … })
```

### `UnregisterExtension(id)` — server

Manual removal. Restores `Config.Items`, `Config.Actions`,
`Config.InteractionTypes` to their pre-registration state and pushes an
`extensionsChanged` snapshot to admin clients.

```lua
exports.lo_jobscreator:UnregisterExtension('your_ext')
```

### `ListExtensions()` — server

Returns a snapshot of the server-side extension registry. Read-only.

```lua
local registry = exports.lo_jobscreator:ListExtensions()
```

### `RegisterClientExtension(id, config)` — client

Register **local** handler functions for an extension's actions. Functions
cannot cross the network — this is the client-side counterpart to
`RegisterExtension`.

```lua
exports.lo_jobscreator:RegisterClientExtension('your_ext', {
    clientHandlers = { OnFeature_<hook> = function(...) end }
})
```

### `GetClientExtensions()` — client

Returns the client-side handler registry. Read-only.

## Job & gang queries

Loaded by `shared/main.lua`, available on both sides except where noted.

### `GetCreatedJobs()` — server

Returns the entire `CreatedJobs` table.

```lua
local jobs = exports.lo_jobscreator:GetCreatedJobs()
for name, job in pairs(jobs) do print(name, job.label) end
```

### `GetCreatedGangs()` — server

Returns the entire `CreatedGangs` table.

### `GetJobLabel(name)` — shared

Returns the display label of a job (or `name` if unknown).

```lua
local label = exports.lo_jobscreator:GetJobLabel('doctor')  -- "Doctor"
```

### `GetGangLabel(name)` — shared

Same for gangs.

### `IsGradeBoss(entityType, name, grade)` — shared

`entityType` = `'job'` or `'gang'`. Returns `true` if the grade has
`isboss = true`.

```lua
local boss = exports.lo_jobscreator:IsGradeBoss('job', 'doctor', 4)
```

### `getJobIsBoss(jobName, grade)` — shared

Convenience shortcut to `IsGradeBoss('job', jobName, grade)`.

### `getGangIsBoss(gangName, grade)` — shared

Same for gangs.

### `GetGradeSalary(entityType, name, grade)` — shared

Returns the salary `payment` field for the given grade.

### `getJobSalary(jobName, grade)` — shared

Shortcut to `GetGradeSalary('job', jobName, grade)`.

### `getGangSalary(gangName, grade)` — shared

Shortcut to `GetGradeSalary('gang', gangName, grade)`.

## Interactions

### `GetJobInteractions(jobName)` — server

Returns all interactions belonging to the job.

```lua
local ints = exports.lo_jobscreator:GetJobInteractions('doctor')
for _, int in ipairs(ints or {}) do print(int.id, int.interaction_type) end
```

### `GetGangInteractions(gangName)` — server

Same for gangs.

### `GetPublicInteractions()` — server

Returns the entire `PublicInteractions` table.

## Job-type analytics

Live counters of connected players per job type. Updated when players
join/leave and refreshed every 15 s.

### `GetJobTypes()` — server

Returns a map `{ [jobType] = { jobName1, jobName2, … } }`.

```lua
local types = exports.lo_jobscreator:GetJobTypes()
-- { leo = {'sheriff', 'marshal'}, medic = {'doctor'}, … }
```

### `GetCountByType(jobType)` — server

Number of currently-connected players with a job of this type.

```lua
local cops = exports.lo_jobscreator:GetCountByType('leo')
```

### `GetAllJobTypeCounts()` — server

Returns the full counter table `{ [jobType] = count }`.

### `GetPlayersByType(jobType)` — server

Returns an array of server ids of all connected players with the given
job type.

```lua
local medicSrcs = exports.lo_jobscreator:GetPlayersByType('medic')
for _, src in ipairs(medicSrcs) do
    TriggerClientEvent('your:alert', src, 'Medical emergency')
end
```

## Duty system

A duty entry is keyed by `(playerSrc, jobName)` — a player can be on duty
for several jobs at once (e.g. multi-job setup).

### `GetDuty(src, job)` — server

Returns boolean (`true` = on duty for the given job).

### `SetDuty(src, duty, job)` — server

Set the duty status. Triggers the `lo_jobscreator:client:UpdateDutyStatus`
client event so the player's HUD updates.

```lua
exports.lo_jobscreator:SetDuty(source, true, 'doctor')
```

### `ToggleDuty(src, job)` — server

Toggle and return the new state.

### `IsDutyActive(src, job)` — server

Alias for `GetDuty`.

### `RemoveDuty(src)` — server

Wipe all duty entries for a player (called automatically on
`playerDropped`).

### `GetDutyList()` — server

Returns the entire `{ [src] = { [job] = bool } }` table.

## Personal action menu

### `OpenPersonalMenu()` — client

Force-open the personal action menu (default keybind: `F7`).

```lua
exports.lo_jobscreator:OpenPersonalMenu()
```

Useful if you bind your own key in another resource.

## Witness / dispatch system

### `dispatchAlert(coords, type)` — client

Send a witness alert to the appropriate dispatch (LEO/medic/etc.).

```lua
exports.lo_jobscreator:dispatchAlert(GetEntityCoords(PlayerPedId()), 'robbery')
```

### `GetAlertHistory()` — client

Returns the **local** alert history (last alerts the player received as a
dispatcher).

### `GetActiveAlerts()` — client

Returns alerts currently active (not yet handled) on this client.

## Quick reference table

| Export | Side | Purpose |
|---|---|---|
| `RegisterExtension` | server | Extension API |
| `UnregisterExtension` | server | Extension API |
| `ListExtensions` | server | Extension API |
| `RegisterClientExtension` | client | Extension API |
| `GetClientExtensions` | client | Extension API |
| `GetCreatedJobs` | server | All jobs |
| `GetCreatedGangs` | server | All gangs |
| `GetJobLabel` | shared | Lookup label |
| `GetGangLabel` | shared | Lookup label |
| `IsGradeBoss` | shared | Grade-flag check |
| `getJobIsBoss` | shared | Shortcut |
| `getGangIsBoss` | shared | Shortcut |
| `GetGradeSalary` | shared | Grade payment |
| `getJobSalary` | shared | Shortcut |
| `getGangSalary` | shared | Shortcut |
| `GetJobInteractions` | server | Per job |
| `GetGangInteractions` | server | Per gang |
| `GetPublicInteractions` | server | Public list |
| `GetJobTypes` | server | type → jobs[] |
| `GetCountByType` | server | Connected count |
| `GetAllJobTypeCounts` | server | Full counter |
| `GetPlayersByType` | server | src[] |
| `GetDuty` | server | Per (src, job) |
| `SetDuty` | server | |
| `ToggleDuty` | server | |
| `IsDutyActive` | server | Alias |
| `RemoveDuty` | server | Wipe a player |
| `GetDutyList` | server | Full table |
| `OpenPersonalMenu` | client | Force open |
| `dispatchAlert` | client | Send alert |
| `GetAlertHistory` | client | Local history |
| `GetActiveAlerts` | client | Live alerts |

## Stability

Only the **Extension API** exports (`RegisterExtension`,
`UnregisterExtension`, `ListExtensions`, `RegisterClientExtension`,
`GetClientExtensions`) are part of the formal [public contract](/extensions/contract).

The other exports are documented and stable in practice but may change in
a future major version. Use them freely; just check the changelog when
upgrading.
