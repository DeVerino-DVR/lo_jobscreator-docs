# Custom interaction types

Register your own interaction type from another resource. Once registered:

- It shows up in the panel's interaction-type dropdown.
- Admins can create points using it like any built-in type.
- When a player triggers one, your event fires with the full configuration.

## Registering

From a **server** script, on resource start:

```lua
AddEventHandler('onResourceStart', function(resource)
    if resource ~= GetCurrentResourceName() then return end
    if GetResourceState('lo_jobscreator') ~= 'started' then return end

    exports.lo_jobscreator:RegisterInteractionType({
        type        = 'my_minigame',           -- unique id, [a-z0-9_]
        label       = 'My minigame',           -- shown in panel dropdown
        icon        = 'fa-solid fa-dice',      -- optional, FontAwesome (ox_lib)
        isPublic    = true,                    -- can be used in public actions
        clientEvent = 'my_resource:start',     -- fires on the player who triggered
        serverEvent = 'my_resource:server',    -- fires server-side
        actions = {                            -- optional sub-actions (panel checkboxes)
            { id = 'easy',   label = 'Easy mode',   icon = 'fa-solid fa-circle'  },
            { id = 'hard',   label = 'Hard mode',   icon = 'fa-solid fa-skull'   },
        },
    })
end)
```

## Spec fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `type` | string | yes | Unique id. Two resources can't register the same type. |
| `label` | string | yes | Shown in the panel UI. |
| `icon` | string | no | FontAwesome class (rendered by `ox_lib`). |
| `isPublic` | boolean | no | Default `true`. If `false`, the type only appears for job / gang interactions. |
| `clientEvent` | string | no | Event triggered on the player when they use the interaction. |
| `serverEvent` | string | no | Event triggered server-side. |
| `actions` | table | no | Array of sub-options (`{ id, label?, icon? }`). The admin ticks the ones they want enabled; the chosen state is delivered in the payload. |

## What you receive

When a player triggers the interaction, the events you registered fire with this payload:

```lua
{
    entityType    = 'job' | 'gang' | 'public',
    entityName    = string | nil,    -- nil for public
    interactionId = number,           -- the row id in lo_*_interactions
    type          = 'my_minigame',
    coords        = vec3,
    data          = { ... },          -- whatever the admin entered in the type-specific form
    options       = { easy = true, hard = false },  -- enabled sub-actions
}
```

Server event:
```lua
RegisterNetEvent('my_resource:server', function(payload)
    local src = source
    -- ...
end)
```

Client event:
```lua
RegisterNetEvent('my_resource:start', function(payload)
    -- ...
end)
```

## Sub-actions (the `actions` array)

If you declared `actions = { ... }`, the admin gets a checklist when configuring the point. The `options` table in the payload reflects their choices (`{ [actionId] = true | false }`).

This is how you offer "easy / hard" without registering two types, or how a single "minigame" type can branch into "blackjack / poker / dice" based on what's enabled.

## Unregistering

```lua
exports.lo_jobscreator:UnregisterInteractionType('my_minigame')
```

Existing interactions of that type stay in the database but become inert until you re-register.

## Listing what's registered

```lua
local types = exports.lo_jobscreator:GetExternalInteractionTypes()
-- types[i] = { type, label, icon, isPublic, clientEvent, serverEvent, actions, _resource }
```

`_resource` is the resource that registered the type — handy for debugging.

## Tips

- **Register on resource start, not on player join.** The list is broadcast to clients when it changes; doing it once per connect floods the network.
- **Don't rely on `type` order.** It's not stable. Use it as a string identifier only.
- **Be conservative with `isPublic = true`.** Anything attached to "public" can be placed anywhere and used by everyone — fine for shops, dangerous for things that hand out money.
