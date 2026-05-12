# Permissions

Access to the panel is controlled by VORP groups (the `group` value on the character).

## Coarse: `Config.PermissionGroup`

The minimum to open the panel.

```lua
Config.PermissionGroup = 'admin'
-- or
Config.PermissionGroup = { 'admin', 'superadmin', 'mod' }
```

Anyone with a group in this list can open `/jobcreator`. By default they see every tab.

## Fine-grained: `Config.ButtonPermissions`

You can require a *different* group for each tab. Empty / missing → falls back to `Config.PermissionGroup`.

```lua
Config.ButtonPermissions = {
    jobs           = { 'admin' },
    gangs          = { 'admin' },
    publicActions  = { 'admin' },
    itemCreator    = { 'superadmin' },  -- only superadmins can create items
    customBlips    = { 'admin' },
    customPeds     = { 'admin' },
    customVehicles = { 'superadmin' },
    customHorses   = { 'superadmin' },
    staffTools     = { 'superadmin' },
    preferences    = { },               -- empty → anyone with PermissionGroup
    personalmenu   = { },               -- the F7 menu is for every player
}
```

You can also edit this live in **Server config → Permissions**.

## Custom permission logic

If you want to gate the panel with your own rules (a database table, a discord role, etc.), implement the hook:

```lua
-- modules/editable/server.lua
function CustomPermissionCheck(src)
    -- return true → grant access
    -- return false → deny
    -- return nil → let the default check decide
    if exports.my_acl:HasRole(src, 'jobs_manager') then return true end
end
```

`CustomPermissionCheck` runs **in addition** to `Config.PermissionGroup` — returning `true` grants access even if the group check fails; returning `false` blocks regardless.

## Audit

Every panel write (create / edit / delete) is logged to `lo_audit_log` with the staff id, name, action, target and a timestamp. See [Audit log](/guide/audit).
