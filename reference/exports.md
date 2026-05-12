# Exports

Functions exposed by `lo_jobscreator` to other resources. Call them like this:

```lua
local result = exports.lo_jobscreator:NameOfTheExport(arguments)
```

Server-side exports are called from server scripts, client-side from client scripts. Shared exports work on both sides — but `GetCreatedJobs` / `GetCreatedGangs` / `GetJobInteractions` / `GetGangInteractions` / `GetPublicInteractions` only return data **server-side** (the client gets a synced subset by other means).

---

## Jobs & gangs (shared)

### `getJobIsBoss(jobName, grade)` → `boolean`
Is this grade the boss grade of this job?

```lua
local job   = exports.vorp_core:getUser(source).getUsedCharacter.job
local grade = exports.vorp_core:getUser(source).getUsedCharacter.jobGrade
if exports.lo_jobscreator:getJobIsBoss(job, grade) then
    -- open the boss menu
end
```

### `getGangIsBoss(gangName, grade)` → `boolean`
Same, for gangs.

### `getJobSalary(jobName, grade)` → `number`
Salary configured for that grade.

### `getGangSalary(gangName, grade)` → `number`
Same, for gangs.

### `IsGradeBoss(kind, name, grade)` → `boolean`
Generic version. `kind` is `'job'` or `'gang'`.

### `GetGradeSalary(kind, name, grade)` → `number`
Generic version of `getJobSalary` / `getGangSalary`.

### `GetJobLabel(jobName)` → `string`
Display label (falls back to the technical name if unknown).

### `GetGangLabel(gangName)` → `string`
Same, for gangs.

### `GetCreatedJobs()` → `table` *(server-side)*
All jobs as `{ [name] = { name, label, data = { type, grades, blip, actions, regions, ... } } }`.

### `GetCreatedGangs()` → `table` *(server-side)*
Same, for gangs.

### `GetJobInteractions(jobName)` → `table` *(server-side)*
Interactions attached to that job.

### `GetGangInteractions(gangName)` → `table` *(server-side)*
Interactions attached to that gang.

### `GetPublicInteractions()` → `table` *(server-side)*
All public interactions.

---

## Job-type counters (client + server)

A *job type* is the category set on each job (`leo`, `medic`, `fire`, `gouv`, …). These count **online players** currently in any job of that type.

### `GetCountByType(jobType)` → `number`
```lua
local cops = exports.lo_jobscreator:GetCountByType('leo')
if cops < 2 then
    -- not enough cops, cancel the robbery
end
```

### `GetAllJobTypeCounts()` → `table<string, number>`
```lua
local counts = exports.lo_jobscreator:GetAllJobTypeCounts()
-- counts.leo, counts.medic, ...
```

### `GetPlayersByType(jobType)` → `number[]` (server ids)
```lua
-- server: send a message to every online medic
for _, src in ipairs(exports.lo_jobscreator:GetPlayersByType('medic')) do
    TriggerClientEvent('chat:addMessage', src, { args = { 'EMS', 'Patient down.' } })
end
```

### `GetJobTypes()` → `string[]` *(server-side)*
Every job type currently in use.

---

## Duty (server)

### `IsDutyActive(src, jobName)` → `boolean`
Is this player on duty for that job?

### `GetDuty(src, jobName)` → `boolean`
Alias for `IsDutyActive`.

### `SetDuty(src, onDuty, jobName)`
Force on/off duty. Note: `onDuty` is the **second** argument.

### `ToggleDuty(src, jobName)` → `boolean` (new state)
Flip on / off.

### `GetDutyList()` → `table<src, table<job, bool>>`
Every connected player's duty state.

### `RemoveDuty(src, jobName)`
Clear the player's duty for a job (also done automatically on disconnect).

```lua
-- a job command that only works while on duty
RegisterCommand('police_action', function(source)
    if not exports.lo_jobscreator:IsDutyActive(source, 'police') then
        return
    end
    -- ...
end)
```

---

## Custom interaction types (server)

See [Custom interaction types](/reference/custom-types) for the full guide.

### `RegisterInteractionType(spec)`
Register a new interaction type that shows up in the panel and fires your events.

### `UnregisterInteractionType(typeId)`
Remove it.

### `GetExternalInteractionTypes()` → `table`
Everything currently registered from external resources.

---

## Dispatch (client)

### `dispatchAlert(coords, type, extra?)`
Fire a dispatch alert. Routed to jobs based on type + region. See [Dispatch](/guide/dispatch).

```lua
-- new form
exports.lo_jobscreator:dispatchAlert(GetEntityCoords(PlayerPedId()), 'robbery', {
    title = 'Bank robbery',
    message = 'Suspect armed, fleeing north.',
    jobsToAlert = { 'police', 'sheriff' },
})

-- legacy form
exports.lo_jobscreator:dispatchAlert({
    coords = vector3(...),
    type = 'theft',
    title = '...',
    message = '...',
    jobs = { 'police' },
})
```

### `OpenDispatchMenu()`
Open the built-in dispatch menu (list of active alerts).

### `GetActiveAlerts()` → `table`
Alerts currently active.

### `GetAlertHistory()` → `table`
Past alerts (capped, in-memory).

---

## Personal action menu (client)

### `OpenPersonalMenu()`
Open the per-player action menu programmatically.

---

## Usable-item effects (client)

Used internally when a player consumes an item, but you can call them directly too (e.g. a custom drug script):

| Export | What |
|---|---|
| `UsableToggleEffect(effectId, duration, progressive)` | Play / extend a screen FX (or a preset) |
| `UsableApplyPreset(presetName, duration)` | Apply a preset from `Config.UsablePresets` |
| `UsableSetEffectStrength(effectName, strength)` | 0.0 – 1.0 |
| `UsableStopAllEffects()` | Clear everything |
| `UsableAddDrunkEffect(level)` | 0 = sober, higher = drunker |
| `UsableApplyDrunkGait(durationMs, strength)` | Wobbly walk |
| `UsableStartCamShake(intensity)` | Camera shake |
| `UsableStopCamShake()` | Stop it |
