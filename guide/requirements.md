# Requirements

## Mandatory

- A **RedM** server (`lua54` enforced).
- **MySQL** via [`oxmysql`](https://github.com/overextended/oxmysql).
- One of the supported framework cores (see [Frameworks](/guide/frameworks)):
  VORP, RSG, QBR, QR, RPX, REDEM, TPZ, FRP, or `standalone`.

## Recommended

- [`ox_lib`](https://github.com/overextended/ox_lib) — best UI provider,
  fastest menus, cleanest progress bars.
- [`ox_target`](https://github.com/overextended/ox_target) — preferred
  interaction mode (`Config.DefaultInteractionMode = 'target'`). Falls back
  to VORP prompts if absent.

## Optional

- [`vorp_inventory`](https://github.com/VORPCORE/vorp-inventory-redm) — used
  by default if your core is VORP.
- `jo_libs` — alternative menu/input provider.
- A clothing resource (`jo_clothingstore`, `vorp_clothing`, …) if you use the
  `clothing_store` / `clothing_wardrobe` interactions.

## Permissions

The admin command (`/jobcreator` by default) is restricted to the groups
listed in `Config.PermissionGroup`. Set this to your staff group(s) before
booting the resource.

```lua
-- config.lua
Config.PermissionGroup = { 'admin' }    -- or { 'admin', 'moderator' }
```
