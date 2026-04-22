# Client registration

**Functions cannot cross the network.** The client side has its own
registration export so handler functions stay where they belong.

## Signature

```lua
exports.lo_jobscreator:RegisterClientExtension(id: string, config: table) : boolean
```

## Minimal call

```lua
CreateThread(function()
    while GetResourceState('lo_jobscreator') ~= 'started' do Wait(200) end
    exports.lo_jobscreator:RegisterClientExtension('your_ext', {
        clientHandlers = {
            OnFeature_<hook> = function(actionId, action, target) ... end,
        },
    })
end)
```

## Resolution order

When a player triggers an action with `hook = '<hook>'` from the personal
menu, the core resolves the implementation in this order:

1. `OnFeature_<hook>` defined in `modules/editable/client.lua` (server
   owner override).
2. `DefaultAction_<hook>` defined in `modules/actions/client.lua`
   (built-in default).
3. **`clientHandlers.OnFeature_<hook>` from your extension** ← this section.
4. **`serverHandlers.OnAction_<hook>` from your extension** — the core
   auto-triggers a net event.
5. Legacy raw `event` field on the action.

If you only need server-side logic, omit the client handler and rely on
`serverHandlers.OnAction_<hook>` only:

```lua
-- server.lua
exports.lo_jobscreator:RegisterExtension('your_ext', {
    actions = {
        bandage_use = { label = 'Bandage', hook = 'bandage', type = 'target_player' },
    },
    serverHandlers = {
        OnAction_bandage = function(src, action, target)
            -- target = server id of the targeted player (or nil for self/area)
            print(('[your_ext] %s used bandage on %s'):format(src, tostring(target)))
        end,
    },
})
```

## Reading the live registry

```lua
local extensions = exports.lo_jobscreator:GetClientExtensions()
for id, ext in pairs(extensions) do
    print(id, ext.label, #(ext.items or {}))
end
```

The returned table is the live registry — do not mutate it.
