# Personal actions

Personal actions are entries in the per-player action menu (default: F7). They are configured in **Server config → Personal actions** and wired to your own scripts via named hooks.

## Action types

Each action has a `type` that decides what it operates on:

| Type | Target | Example |
|---|---|---|
| `self` | The player themselves | "Surrender", "Hands up", "Take a selfie" |
| `target_player` | The closest other player | "Handcuff", "Revive", "Search" |
| `target_vehicle` | The vehicle the player is in / aiming at | "Repair", "Hotwire" |
| `client_event` | Fires a client event with no target | Plug a custom interaction |
| `server_event` | Fires a server event with no target | Same, server-side |

Job / grade restrictions can be set per action (e.g. handcuff is medic + LEO only).

## Wiring an action to code

Each action you create can declare a `hook = '<name>'`. The runtime then calls a global function:

```lua
-- modules/editable/client.lua

function OnFeature_handcuff(actionId, action, targetServerId)
    -- the action is `target_player`, so we get the target's server id
    TriggerServerEvent('my_handcuff:apply', targetServerId)
end

function OnFeature_repair(actionId, action, vehicleEntity)
    -- the action is `target_vehicle`, so we get the entity
    SetVehicleFixed(vehicleEntity)
end

function OnFeature_selfie(actionId, action)
    -- self / client_event / server_event have no third arg
    exports.my_camera:OpenSelfieMode()
end
```

The third argument depends on the action's `type`:

- `self` / `client_event` / `server_event` — none.
- `target_player` — the target's **server id**.
- `target_vehicle` — the target's **vehicle entity** (client-side).

Server-side hooks work the same way in `modules/editable/server.lua`, using `function OnFeature_<name>(src, ...)`.

See [Editable hooks](/reference/hooks) for the full list.

## Pre-built actions

The default `Config.Actions` ships with a few starters (revive, handcuff, drag, etc.) wired to common patterns. They are commented; enable the ones you need by ticking them in the panel.
