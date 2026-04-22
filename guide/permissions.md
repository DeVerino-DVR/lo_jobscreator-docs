# Permissions

The script has two layers of access control.

## 1. Resource-wide group(s)

```lua
Config.PermissionGroup = { 'admin' }
```

Anybody whose `character.group` is in this list can:

- Run `/jobcreator`.
- Receive admin-only NUI broadcasts (e.g. extension snapshots).
- See "Take ownership" / "Set me as employee" buttons.

`PermissionGroup` accepts either a single string (`'admin'`) or a table.

## 2. Per-button gating

Each top-level admin section has its own permission list in
`Config.ButtonPermissions`. Leave a list empty to inherit
`Config.PermissionGroup`.

```lua
Config.ButtonPermissions = {
    dashboard       = {},
    jobs            = {},
    gangs           = {},
    publicActions   = {},
    itemCreator     = {},
    customBlips     = {},
    customPeds      = {},
    audit           = {},
    templates       = {},
    backup          = {},
    serverConfig    = {},
    preferences     = {},
}
```

For example, to give your "job_manager" group access to jobs only:

```lua
Config.ButtonPermissions = {
    jobs = { 'admin', 'job_manager' },
    -- everything else inherits PermissionGroup = { 'admin' }
}
```

## 3. Per-grade permissions inside an entity

Inside the entity editor → **Grades**, each grade can be flagged `isboss`
which unlocks the `bossaction` interaction type and the boss menu.

Granular permissions per grade (e.g. "this grade can open this stash") are
configured at the **interaction** level, not the grade level: every
job/gang interaction has a `minimumGrade` field.

## 4. Audit

Every write in the panel is recorded in `lo_audit` (player id, character
name, action, before/after JSON). Browse it from the **Journal admin** tab
or hit the [`getAuditLog`](/reference/exports) export.
