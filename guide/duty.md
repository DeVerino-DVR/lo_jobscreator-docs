# Duty & paychecks

## Duty

A player is "on duty" or not for their current job. The state is **per job, per player** — leaving a job clears duty for that job, joining another one starts at off.

### Toggling duty

In-game, players use a `duty` interaction (a point in the world configured in the panel). It just flips the state.

From scripts (server side):

```lua
exports.lo_jobscreator:ToggleDuty(src, 'police')
exports.lo_jobscreator:SetDuty(src, true, 'police')    -- force ON
exports.lo_jobscreator:IsDutyActive(src, 'police')     -- → boolean
```

See [Exports → Duty](/reference/exports#duty-server) for the full list.

### Why duty matters

- **Paychecks only drop while on duty.** Off-duty players get nothing.
- **Dispatch alerts only reach on-duty players.**
- It's a clean handle for your own job scripts (`if not IsDutyActive(src, 'police') then return end`).

## Paychecks

Configured in **Server config → Paycheck** (or `Config.Paycheck` in `config.lua`).

### How it runs

A server timer fires every `Config.Paycheck.interval` ms (default 30 minutes). For every online player on duty, it looks up their job, their grade, the grade's salary, and pays them.

### Where the money comes from

Two routes:

- **From thin air** (default) — the money is added directly. Government jobs use this by default (see `Config.Paycheck.governmentTypes`).
- **From a business account** — for non-government jobs, you can wire the script to deduct from a boss / gang account before paying. Configure `Config.Paycheck.bossAccount` and `Config.Paycheck.gangAccount` with the resource name and the functions to read / debit accounts. When the account doesn't have enough money, the player is told and nothing is paid.

You can also route payments into your own banking resource via `Config.Paycheck.banking.{resource, fn}`.

### Hooks

```lua
-- modules/editable/server.lua
function OnSalaryPaid(src, entityType, entityName, grade, amount)
    -- e.g. log to a discord webhook, or top-up a tax fund
end
```

## "I want X jobs to never pay"

Set their `payment` to 0 on each grade.

## "I want a player to be paid only sometimes"

Use `OnSalaryPaid` to log, or use the [`OnBeforeUseInteraction`](/reference/hooks) hook on duty to add conditions before letting the player clock in.
