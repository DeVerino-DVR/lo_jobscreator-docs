# Server registration

The server-side entry point for an extension.

## Signature

```lua
exports.lo_jobscreator:RegisterExtension(id: string, config: table) : boolean, string?
```

- `id` — extension id, must equal your resource name.
- `config` — a table describing what to contribute.

Returns `true` on success, `false, error` on failure.

## Minimal call

```lua
CreateThread(function()
    while GetResourceState('lo_jobscreator') ~= 'started' do Wait(200) end
    exports.lo_jobscreator:RegisterExtension('your_ext', {
        label   = 'Human-readable name',
        typeKey = 'medic',
        -- items, actions, interactionTypes, interactionSchemas,
        -- uiSections, locales, serverHandlers
    })
end)
```

## Config keys

| Key | Type | Notes |
|---|---|---|
| `label` | string | Display name used in the panel. |
| `typeKey` | string | Default entity-type filter. Per-section/per-action filters can override it. |
| `items` | table[] | See [items schema](/extensions/schema/items). |
| `actions` | table\<key, action\> | See [actions schema](/extensions/schema/actions). |
| `interactionTypes` | table\<key, type\> | See [interactions schema](/extensions/schema/interactions). |
| `interactionSchemas` | table\<key, schema\> | Render schema for each interaction type. |
| `uiSections` | table[] | See [uiSections schema](/extensions/schema/ui-sections). |
| `locales` | table\<lang, dict\> | See [locales](/extensions/schema/locales). |
| `serverHandlers` | table | `OnAction_<hook>` functions for net-event-routed actions. |

## Sanitisation

The core takes a sanitised copy of `config` (functions and userdata are
stripped) before broadcasting it to admin clients. Mutating the table you
passed in **after** registration will not propagate. Always re-call
`RegisterExtension` to update.

## Other server exports

| Export | Purpose |
|---|---|
| `exports.lo_jobscreator:UnregisterExtension(id)` | Manually remove. Auto-called on resource stop. |
| `exports.lo_jobscreator:ListExtensions()` | Returns the registry table (read-only). |

## Auto-cleanup

When your resource is stopped, `onResourceStop` triggers an internal
`UnregisterExtension(id)` call. The core:

- Removes your items / actions / interactionTypes from the live `Config.*`.
- Pushes an `extensionsChanged` snapshot to every admin currently watching.
- Restores the original `Config.*` values that existed before your
  registration.

You can also call `UnregisterExtension` manually if you want to reload your
extension config without restarting the resource.
