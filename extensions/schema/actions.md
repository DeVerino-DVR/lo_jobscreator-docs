# Schema — `actions`

Adds entries to the **Actions** tab of every entity that matches the type
filter. Triggers a `hook` when used in-game.

## Shape

```lua
actions = {
    bandage_use = {
        label           = 'Apply bandage',
        icon            = 'fa-solid fa-bandage',
        type            = 'target_player',
        hook            = 'bandage',
        distance        = 3.0,
        requireOnDuty   = true,
        defaultJobTypes = { 'medic' },
        featureKey      = 'actionBandage',
    },
}
```

## Field reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `label` | string | ✓ | Display label in the F-key menu. |
| `icon` | string |  | FontAwesome class (only ox_lib uses it). |
| `type` | string | ✓ | `target_player`, `target_entity`, `self`, `area`. |
| `hook` | string | ✓ | Routes to `OnFeature_<hook>` and `OnAction_<hook>`. |
| `distance` | float |  | Maximum distance to the target. Default 3.0. |
| `requireOnDuty` | boolean |  | Only enabled while on duty. |
| `defaultJobTypes` | string[] |  | Job types pre-enabled for this action. `'*'` for all. |
| `featureKey` | string |  | Optional gating against `Config.Features`. |

## Action types

| Type | Target arg | Notes |
|---|---|---|
| `target_player` | server id of player | Closest player within `distance`. |
| `target_entity` | entity handle | Closest non-player entity (NPC, vehicle, animal, prop) within `distance`. |
| `self` | `nil` | No target. |
| `area` | `vector3` | The player's current position. |

## Hook conventions

Pick globally-unique hook names. **Prefix with your extension domain** to
avoid collisions:

```lua
hook = 'medic_bandage',     -- good
hook = 'bandage',           -- risky (might already exist)
```

## Per-entity activation

Once registered, the action appears in every entity's **Actions** tab
matching `defaultJobTypes`. Admins toggle the checkbox to enable for that
specific job/gang.

## Server-only handler

Skip the client handler entirely:

```lua
exports.lo_jobscreator:RegisterExtension('your_ext', {
    actions = {
        revive_player = { label = 'Revive', hook = 'medic_revive', type = 'target_player' },
    },
    serverHandlers = {
        OnAction_medic_revive = function(src, action, targetServerId)
            -- restore health on targetServerId
        end,
    },
})
```

The core auto-routes via `lo_jobscreator:server:ExtensionAction`.

## Client-only handler

Some actions are pure visual / sound:

```lua
exports.lo_jobscreator:RegisterClientExtension('your_ext', {
    clientHandlers = {
        OnFeature_medic_announce = function(actionId, action, target)
            ESX.ShowNotification('You called for backup')
        end,
    },
})
```
