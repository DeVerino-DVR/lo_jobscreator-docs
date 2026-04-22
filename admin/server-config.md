# Server configuration

Live editor for what used to be hardcoded in `config.lua`. Changes are
written to `lo_settings` and override the `Config.*` values at next read.

## Sections

| Section | Key | Notes |
|---|---|---|
| **Paycheck** | `Paycheck` | Banking + boss/gang account exports, interval, government job types. |
| **Logs** | `Logs` | Discord webhook, server name, embed colour. |
| **Default grades** | `DefaultGrades` | Applied when creating a new job/gang. |
| **Features** | `Features` | Master toggles for each panel section. |
| **Performance** | `Performance` | Streaming caps and render distances. |
| **Permission groups** | `PermissionGroup` + `ButtonPermissions` | Who can open what. |
| **Entity types** | `EntityTypes` | Available `type` values for jobs/gangs. |
| **Interaction types** | `InteractionTypes` | Built-in interaction list. |
| **Actions** | `Actions` | Built-in personal actions. |

## Reverting to defaults

Each section has a **Réinitialiser** button that drops the override and
falls back to `config.lua`.

## What is not editable here

The boot-time settings: `Config.Lang`, `Config.Command`, `Config.Framework`,
`Config.Debug`, `Config.ImageUrl`. Edit `config.lua` and restart for those.
