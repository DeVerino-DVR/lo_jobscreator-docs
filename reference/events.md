# Net events

Public, stable net events that extensions and other resources may
listen to or trigger.

## `lo_jobscreator:server:UseInteraction`

**Direction**: client → server (TriggerServerEvent)

**Payload**: `(interactionId, interactionType, data)`

Central dispatch event for **custom interaction types**. Every time a
player completes an interaction whose type is not one of the built-ins,
this event is fired. Listen on the server to implement your runtime:

```lua
AddEventHandler('lo_jobscreator:server:UseInteraction', function(interactionId, interactionType, data)
    local src = source
    if interactionType ~= 'heal_point' then return end
    -- apply heal logic using data.healAmount, etc.
end)
```

Built-in interaction types (`stash`, `shop`, `farm`, …) are handled
internally by the modules and do **not** fire this event.

## `lo_jobscreator:server:ExtensionAction`

**Direction**: client → server (auto-triggered by the core)

**Payload**: `(extId, hook, target)`

Fired automatically when a player triggers an extension action that has no
client-side `OnFeature_<hook>` handler but has a server-side
`OnAction_<hook>` handler. The core resolves the chain in [Resolution
order](/extensions/client#resolution-order).

You usually do not trigger this event yourself — define
`serverHandlers.OnAction_<hook>` in your extension config and the core
will route it.

## `lo_jobscreator:server:GetPlayerData`

**Direction**: client → server (callback)

Used internally by the client to hydrate its local state after
`LocalPlayer.state.IsInSession` becomes true. Returns the player's
character + the relevant subset of `CreatedJobs` / `CreatedGangs`.

## `lo_jobscreator:server:EntityUpdated`

**Direction**: server → server (regular event, no `Trigger…Event`)

**Payload**: `(entityType, name, newData)`

Fired on the server after every successful entity write
(`updateEntity` NUI callback). Use it to react to admin edits in
real-time:

```lua
AddEventHandler('lo_jobscreator:server:EntityUpdated', function(entityType, name, newData)
    if entityType == 'job' and newData.your_section then
        -- refresh your runtime state
    end
end)
```

## Other events

The script triggers a number of internal events (`...:server:*`,
`...:client:*`) that are **not** part of the public contract. They may
change without notice. Listen at your own risk.
