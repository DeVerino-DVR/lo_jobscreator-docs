# Preferences

Per-player UI preferences. Stored server-side via FXServer KVP, so they
survive reconnects.

Available only when `Config.AllowInGamePreferences = true`.

## Settings

| Setting | Values | Default |
|---|---|---|
| Menu provider | `auto`, `ox_lib`, `vorp`, `jo_libs`, `native` | `Config.DefaultMenuProvider` |
| Input provider | `auto`, `ox_lib`, `vorp`, `jo_libs`, `native` | `Config.DefaultInputProvider` |
| Progress provider | `auto`, `ox_lib`, `vorp`, `native` | `Config.DefaultProgressProvider` |
| Interaction mode | `target` (ox_target), `prompt` (vorp_lib) | `Config.DefaultInteractionMode` |
| Language | One of the locales in `locales/` | `Config.Lang` |

## Forcing a value for everyone

Set `Config.AllowInGamePreferences = false`. The Préférences button is
hidden and the values from `config.lua` are forced for everyone.
