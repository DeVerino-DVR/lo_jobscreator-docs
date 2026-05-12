# Changelog

## 2.0

A full rewrite. Highlights:

- **VORP-only official support.** `vorp_core` + `vorp_inventory`. Third-party frameworks are wired via the open `modules/editable/framework.lua` bridge (unsupported).
- **Admin panel rewrite** (Vue NUI). Jobs, gangs, public actions, item creator, custom blips / peds / props / markers, vehicles / horses catalogues, templates, backups, audit log, server config.
- **Placement modes** — raycast (mouse) and 3D gizmo (drag / rotate, requires `jo_libs`).
- **Interaction types**: `stash`, `farm`, `sell`, `process`, `craft`, `shop`, `vehicle_garage`, `stable`, `duty`, `bossaction`, `teleport`, `clothing_store`, `clothing_wardrobe`, `phone`, `delivery_point`, `witness`.
- **Dispatch / witness** with optional `ox_lib` UI integration; replace the default banner with your own dispatch resource via the `OnDispatchAlertReceived` hook.
- **Built-in Discord log module** (no `lo_logs` dependency).
- **Built-in usable-items system** (eat / drink / shot / injection / horse stimulant, screen FX, drunk gait, cam shake).
- **Leveled logger** — `Logger.trace/debug/info/warn/error`, `Config.LogLevel`, runtime command `/jc_loglevel <level>`.
- **Localization** — drop `locales/<code>.json` with a `language` key, a button appears in the panel.
- **Exports for other resources** — see [Reference → Exports](/reference/exports).
- **Custom interaction types** — third-party resources can register their own types via `RegisterInteractionType` and they appear in the panel like a built-in.
- **RedM-safe runtime** — native control hashes, no `os` on client, `lo_keysMapper` key system, broken-ped detection, long model timeouts for horses / wagons.

## 1.x

Initial release line. See git history.
