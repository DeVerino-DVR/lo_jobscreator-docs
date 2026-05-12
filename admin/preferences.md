# Preferences

Per-admin settings — they affect only the admin who set them, not the server.

## Language

The panel UI language. Doesn't change `Config.Lang` (the server-side default for what players see).

## UI providers

Pick which library handles each kind of UI element:

| Setting | Choices |
|---|---|
| Menu provider | `auto`, `ox_lib`, `vorp_menu`, `jo_libs`, `native` |
| Input provider | same |
| Progress-bar provider | same |

`auto` picks the first one available, in this order: `ox_lib`, `jo_libs`, `vorp_menu`, then `native`.

If you set it to `native` you must implement the corresponding hook in `modules/editable/client.lua`:

- `NativeShowMenu(opts)`
- `NativeShowInput(opts)`
- `NativeShowProgressBar(opts)`

## Interaction mode

`prompt` (floating text) vs `target` (`ox_target` zones). Set per admin; the server default is `Config.DefaultInteractionMode`.

## Placement mode

`raycast` vs `gizmo` (jo_libs). Defaults to `Config.PlacementMode`.

## Panel size & opacity

Cosmetic — the panel itself. Saved per admin.

## Notifications

Sound on / off when an action completes.

## Where it's stored

Per character. Tied to the character's user id, persisted server-side. Logging in on another character starts fresh.

## Players (non-admin)

If `Config.AllowInGamePreferences = true`, every player gets a slimmed-down preferences screen with the UI-provider, interaction-mode, language and sound toggles — but no access to the rest of the panel.
