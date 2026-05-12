# Requirements

## Required

- A recent **RedM** artifact build.
- **`oxmysql`** — the script uses it to create and read its own tables.
- **`vorp_core`** and **`vorp_inventory`** — official framework support.

Without VORP the script still starts in a minimal standalone mode (state-bag jobs, no inventory). It is mostly there to keep the panel running on a dev box; production servers should run VORP.

## Optional (auto-detected)

If installed, the script picks them up automatically — nothing to configure:

| Resource | What it gives you |
|---|---|
| `ox_lib` | Better menus, inputs, progress bars, notifications |
| `jo_libs` | Same, plus the 3D gizmo placement mode for peds / props / blips |
| `vorp_menu` | VORP's native menu / input UI |
| `ox_target` | Replace floating prompts with on-screen targeting |

If none of them are present, the script falls back to built-in equivalents (RedM-native prompts, simple notifications).

## Permissions

You need an admin group set in `Config.PermissionGroup` (default `admin`). On VORP, that's the value of the character's `group` column.

You can also gate each panel tab separately via `Config.ButtonPermissions` — see [Permissions](/guide/permissions).
