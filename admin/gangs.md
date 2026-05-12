# Gangs

Same shape as [Jobs](/admin/jobs) — separate tab because gangs are stored in their own table and applied to a separate field on the character (`character.gang`, `character.gangGrade`).

A player can be in **a job and a gang at the same time** — the two are independent.

## Differences with jobs

- Gangs typically don't get a paycheck from the state. Wire `Config.Paycheck.gangAccount` if you want gang members paid from a gang account.
- Gangs don't usually have a `duty` interaction (they're "always on") — but nothing prevents you from adding one.
- `bossaction` works the same: the gang's boss grade unlocks it.

## When to use a gang instead of a job

- The faction is criminal and you want it tracked separately from law-enforcement / civilian jobs.
- Players need to be in a civilian job *and* a criminal faction at the same time.
- You want a different paycheck pipeline (from a gang stash / account).

## Otherwise

Identical interface, same fields, same interactions. See [Jobs](/admin/jobs).
