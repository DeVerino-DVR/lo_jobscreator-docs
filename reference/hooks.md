# Hooks

Personal-action hooks. Each entry in `Config.Actions` declares a `hook`
key — that key routes to one of:

1. `OnFeature_<hook>` defined in `modules/editable/client.lua` (server-owner override)
2. `DefaultAction_<hook>` defined in `modules/actions/client.lua` (built-in)
3. Extension `clientHandlers.OnFeature_<hook>`
4. Extension `serverHandlers.OnAction_<hook>` (auto-routed)
5. Legacy raw `event` field

See the [Resolution order](/extensions/client#resolution-order).

## Built-in hooks

| Hook | Type | Default jobs | Notes |
|---|---|---|---|
| `handcuff` | `target_player` | `leo` | Cuff the targeted player. |
| `search` | `target_player` | `leo` | Open inventory of the target. |
| `revive` | `target_player` | `medic` | Restore HP from 0. |
| `heal` | `target_player` | `medic` | Top-up HP. |
| `repair` | `target_vehicle` | `craft` | Repair the targeted vehicle. |
| `fine` | `target_player` | `leo` | Issue a fine. |
| `escort` | `target_player` | `leo` | Drag the player. |
| `putinvehicle` | `target_player` | `leo` | Force into the nearest vehicle. |
| `pullout` | `target_player` | `leo` | Pull out of a vehicle. |
| `bills` | `client_event` | `job, craft, trade` | Open billing menu. |
| `dispatch` | `client_event` | `leo, medic` | Open the dispatch menu (`event`-routed). |
| `duty` | `self` | `*` | Toggle duty (`event`-routed). |

## Action types

| Type | Target argument | Notes |
|---|---|---|
| `target_player` | server id | Closest player within `distance`. |
| `target_entity` | entity handle | Closest non-player entity within `distance`. |
| `target_vehicle` | vehicle handle | Closest vehicle within `distance`. |
| `self` | `nil` | No target. |
| `area` | `vector3` | The player's current position. |
| `client_event` | – | Triggers the `event` field directly client-side; ignores hook chain. |

## Implementing a hook (server owner)

Override in `modules/editable/client.lua`:

```lua
function OnFeature_handcuff(actionId, action, targetServerId)
    -- your implementation
end
```

Override is loaded once at resource start. Restart `lo_jobscreator` to
apply changes.

## Implementing a hook (extension)

Use the [Client registration](/extensions/client) export — your handler
takes precedence over the built-in default but is overridden by the
server owner's `modules/editable/client.lua`.
