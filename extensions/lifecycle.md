# Lifecycle & hot-reload

How your extension behaves across resource starts and stops.

## Lifecycle table

| Event | Behaviour |
|---|---|
| `start your_ext` | `RegisterExtension` adds entries; admin clients receive an `extensionsChanged` snapshot in the next NUI message; the panel updates instantly. |
| `restart your_ext` | Equivalent to `stop` then `start`. Admins briefly see the "Extension not loaded" banner. |
| `stop your_ext` | `onResourceStop` triggers `UnregisterExtension`; items / actions / interaction types are restored to their pre-registration state; section tabs hidden. `entity.data[sectionId]` is **preserved** in MySQL. |
| `restart lo_jobscreator` | All extensions must re-register. Either gate your `Wait` loop on `GetResourceState('lo_jobscreator') == 'started'` (recommended) **or** listen to `onResourceStart`. |

## Surviving a core restart

```lua
local function register()
    exports.lo_jobscreator:RegisterExtension('your_ext', { … })
end

CreateThread(function()
    while GetResourceState('lo_jobscreator') ~= 'started' do Wait(200) end
    register()
end)

AddEventHandler('onResourceStart', function(name)
    if name == 'lo_jobscreator' then
        Wait(500)
        register()
    end
end)
```

The same pattern works for `RegisterClientExtension` on the client.

## Snapshot broadcast

Every successful `RegisterExtension` / `UnregisterExtension` triggers a
`SendNUIMessage({ type = 'extensionsChanged', extensions = ... })` to
every admin currently watching the panel. The Vue store applies the
payload, refreshes the i18n overrides and re-renders the affected tabs.

## Hot reload your config

Just call `RegisterExtension` again with the same id — the core replaces
the previous registration atomically. There is no need to call
`UnregisterExtension` first.

```lua
RegisterCommand('reload_my_ext', function()
    register()  -- updated config
end, true)
```
