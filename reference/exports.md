# Exports

The **stable, public** export surface of `lo_jobscreator`. Internal
exports may exist but are not part of the contract — see
[Public contract](/extensions/contract).

## Server

### `RegisterExtension(id, config)`

```lua
exports.lo_jobscreator:RegisterExtension('your_ext', { … })
```

Register or replace an extension. Idempotent. Returns `true` on success,
`false, error` on failure. Auto-removed on `onResourceStop`. See
[Server registration](/extensions/server).

### `UnregisterExtension(id)`

```lua
exports.lo_jobscreator:UnregisterExtension('your_ext')
```

Manual removal. Restores `Config.Items` / `Config.Actions` /
`Config.InteractionTypes` to their pre-registration state and pushes an
`extensionsChanged` snapshot to admin clients.

### `ListExtensions()`

```lua
local registry = exports.lo_jobscreator:ListExtensions()
```

Returns a snapshot of the server-side extension registry. Read-only.

## Client

### `RegisterClientExtension(id, config)`

```lua
exports.lo_jobscreator:RegisterClientExtension('your_ext', {
    clientHandlers = { OnFeature_<hook> = function(...) end }
})
```

Register local handler functions for an extension's actions. See
[Client registration](/extensions/client).

### `GetClientExtensions()`

```lua
local registry = exports.lo_jobscreator:GetClientExtensions()
```

Returns a snapshot of the client-side handler registry. Read-only.
