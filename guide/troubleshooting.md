# Troubleshooting

## The panel won't open

- Your group is not in `Config.PermissionGroup`. Check the character's `group` column.
- The chat command was renamed in `Config.Command`. Try the new name.
- A JS error broke the NUI — open the F8 / browser console.

## An interaction has no prompt and no target

- Your **Preferences → Interaction mode** is set to `target` but `ox_target` is not running.
- The interaction's position is wrong / inside the floor. Edit and re-place it.
- The interaction has a job restriction your character doesn't match.

## I created items but they don't show in the inventory

- Restart `vorp_inventory`. It caches its `items` table at boot.
- Check that the **Restart vorp_inventory** banner in the Items tab cleared.

## Item image upload says "no such file"

On RedM, writing across resource folders that include `[brackets]` can fail. Set the absolute path:

```lua
Config.ItemImagePath = 'C:/your/path/resources/[inventory]/vorp_inventory/html/img/items/'
```

The path must end with a trailing slash.

## Paychecks don't drop

- The player isn't on duty. Use a `duty` interaction.
- The job's grade has `payment = 0`.
- The job is not a `governmentTypes` job and the boss account is empty.
- `Config.Paycheck.enabled = false`.

## A vehicle / horse won't spawn ("model load failed")

The model name is wrong for your client build. Check `data/vehlist.lua` for valid ones.

## A custom ped vanishes after a few seconds

Some RDR2 models don't survive RedM's local ped pool. The panel marks known-broken ones as "broken"; pick another model.

## I see two copies of my custom ped

You spawned another instance of the same model at the same coords from another resource with `IsNetworked = true`. This script already handles peds locally on every client — don't double-spawn.

## Dispatch alerts don't reach the right job

- The job's **regions** don't cover the alert's coordinates.
- The receivers aren't on duty.
- The alert's `jobsToAlert` list doesn't include them.

## A hook (`OnXxx`) doesn't fire

- The function name is misspelled. They are **case-sensitive**.
- It's defined in the wrong file (client hook in `server.lua` or the other way around).
- It's defined inside a `RegisterNetEvent` block instead of at top level.

Hooks are read from the global scope of `modules/editable/client.lua` and `modules/editable/server.lua`. They must be plain `function OnXxx(...)`.

## Logs

Set `Config.LogLevel = 'debug'` to get verbose console output, then reproduce the bug. Server console shows server-side logs; F8 shows client-side. Most failures print a short reason.

## When all else fails

Open an issue on the GitHub repo with:

- Your RedM artifact build.
- The server console output around the failure.
- F8 output if it's a client issue.
- Whether you reproduce it with no other resource running.
