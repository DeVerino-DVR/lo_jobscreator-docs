# Public contract

The following surface is considered **stable**. It will not break across
minor versions of `lo_jobscreator`. Major versions may break it but will
provide a migration path documented in the changelog.

## Server exports

| Export | Signature | Purpose |
|---|---|---|
| `RegisterExtension` | `(id, config) → boolean, string?` | Register or replace. Idempotent. |
| `UnregisterExtension` | `(id) → boolean` | Manual remove. |
| `ListExtensions` | `() → table` | Read-only registry snapshot. |

## Client exports

| Export | Signature | Purpose |
|---|---|---|
| `RegisterClientExtension` | `(id, config) → boolean` | Register local handler functions. |
| `GetClientExtensions` | `() → table` | Read-only client registry snapshot. |

## Net events

| Event | Direction | Payload |
|---|---|---|
| `lo_jobscreator:server:ExtensionAction` | client → server | `(extId, hook, target)` — auto-routed when no client handler exists. |
| `lo_jobscreator:server:EntityUpdated` | server → server | `(entityType, name, newData)` — broadcast after every entity write. |
| `lo_jobscreator:server:UseInteraction` | client → server | `(interactionId, interactionType, data)` — central dispatch for custom interaction types. |

## Handler conventions

| Convention | Purpose |
|---|---|
| `serverHandlers.OnAction_<hook>(src, action, target)` | Server-side action handler. |
| `clientHandlers.OnFeature_<hook>(actionId, action, target)` | Client-side action handler. |

## Storage paths

| Path | Meaning |
|---|---|
| `entity.data[sectionId]` | Section values for `uiSections.id = sectionId`. |
| `entity.data._extProviders[sectionId]` | Tracks which extension owns each section. |

## Anything else

Internal Lua functions, the NUI Pinia store shape, the `lo_settings` row
format, the `modules/extensions/` files… are **not** part of the public
contract. They may change without notice.

If you need a stable surface that is not listed here, open an issue.
