# Server events

The script does not expose a public net-event API. For lifecycle integration (player ready, duty changed, salary paid, job created…) **use [Editable hooks](/reference/hooks)** in `modules/editable/server.lua` instead. They run in the same process as the engine, catch errors, and are guaranteed to be called.

For cross-resource integration, use **[Exports](/reference/exports)**.

## What net events exist

A handful of internal events keep clients in sync with the server. They are **not** part of the public contract — names and payloads can change without notice. Listen to them only if a hook can't do what you need.

### `lo_jobscreator:server:DispatchAlert` *(server-side `TriggerEvent`)*

Internally fired when a witness / alert flow triggers a dispatch. The exports `dispatchAlert` is the public entry point — prefer that.

### `lo_jobscreator:server:DataReady` *(server-side `TriggerEvent`)*

Fired once when the script has finished loading all jobs / gangs / interactions from SQL into memory at boot. Useful if your resource depends on `GetCreatedJobs()` returning a non-empty table.

```lua
AddEventHandler('lo_jobscreator:server:DataReady', function()
    -- exports.lo_jobscreator:GetCreatedJobs() is now populated
end)
```

If your resource starts after `lo_jobscreator`, you may have missed the event. Either re-emit by reading the export directly, or guard with a retry.

### Client-side sync events

The server pushes a stream of client events like `lo_jobscreator:client:DataChanged`, `:EntityPatched`, `:InteractionDelta`, `:UpdateDutyStatus`, `:Initialize`, plus per-asset events (`:NewCustomBlip`, `:UpdateCustomPed`, …). They exist to refresh the in-game state — **don't subscribe to them in another resource**. They are internal and will change.

## Custom interaction types

When you register a type via [`RegisterInteractionType`](/reference/custom-types), the events you declared in the spec (`clientEvent`, `serverEvent`) are how you receive triggers. There is no wrapper event on top.

## TL;DR

| Goal | Use |
|---|---|
| React when a player joins / changes job / clocks in | A hook in `modules/editable/server.lua` |
| Read who is on duty / what jobs exist | An [export](/reference/exports) |
| Receive a trigger when a player uses a custom interaction | The event you declared in `RegisterInteractionType` |
| Wait for boot data | `lo_jobscreator:server:DataReady` |
